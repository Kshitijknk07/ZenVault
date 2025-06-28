import { Pool, PoolConfig } from "pg";
import { createClient, RedisClientOptions } from "redis";
import logger from "./logger";

// PostgreSQL Configuration
const postgresConfig: PoolConfig = {
  host: process.env["DB_HOST"] || "localhost",
  port: parseInt(process.env["DB_PORT"] || "5432"),
  database: process.env["DB_NAME"] || "zenvault",
  user: process.env["DB_USER"] || "zenvault_user",
  password: process.env["DB_PASSWORD"] || "zenvault_password",
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  ssl:
    process.env["NODE_ENV"] === "production"
      ? { rejectUnauthorized: false }
      : false,
};

// Create PostgreSQL connection pool
export const postgresPool = new Pool(postgresConfig);

// Redis Configuration
const redisConfig: RedisClientOptions = {
  socket: {
    host: process.env["REDIS_HOST"] || "localhost",
    port: parseInt(process.env["REDIS_PORT"] || "6379"),
  },
  password: process.env["REDIS_PASSWORD"] || "",
};

// Create Redis client (let TypeScript infer the type)
export const redisClient = createClient(redisConfig);

// Database connection management
export class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async connect(): Promise<void> {
    try {
      // Test PostgreSQL connection
      const client = await postgresPool.connect();
      await client.query("SELECT NOW()");
      client.release();
      logger.info("PostgreSQL connected successfully");

      // Test Redis connection
      await redisClient.connect();
      await redisClient.ping();
      logger.info("Redis connected successfully");

      this.isConnected = true;
    } catch (error) {
      logger.error("Database connection failed:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await postgresPool.end();
      await redisClient.quit();
      this.isConnected = false;
      logger.info("Database connections closed");
    } catch (error) {
      logger.error("Error closing database connections:", error);
      throw error;
    }
  }

  public isDatabaseConnected(): boolean {
    return this.isConnected;
  }
}

// Graceful shutdown handling
process.on("SIGINT", async () => {
  logger.info("Received SIGINT, closing database connections...");
  await DatabaseManager.getInstance().disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Received SIGTERM, closing database connections...");
  await DatabaseManager.getInstance().disconnect();
  process.exit(0);
});

export default DatabaseManager.getInstance();
