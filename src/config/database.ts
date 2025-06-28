import { Pool, PoolConfig } from "pg";
import { createClient, RedisClientOptions } from "redis";
import logger from "./logger";

const postgresConfig: PoolConfig = {
  host: process.env["DB_HOST"] || "localhost",
  port: parseInt(process.env["DB_PORT"] || "5432"),
  database: process.env["DB_NAME"] || "zenvault",
  user: process.env["DB_USER"] || "zenvault_user",
  password: process.env["DB_PASSWORD"] || "zenvault_password",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl:
    process.env["NODE_ENV"] === "production"
      ? { rejectUnauthorized: false }
      : false,
};

export const postgresPool = new Pool(postgresConfig);

const redisConfig: RedisClientOptions = {
  socket: {
    host: process.env["REDIS_HOST"] || "localhost",
    port: parseInt(process.env["REDIS_PORT"] || "6379"),
  },
  password: process.env["REDIS_PASSWORD"] || "",
};

export const redisClient = createClient(redisConfig);

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
      const client = await postgresPool.connect();
      await client.query("SELECT NOW()");
      client.release();
      logger.info("PostgreSQL connected successfully");

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
