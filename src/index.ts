import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import configurations and services
import DatabaseManager from "@/config/database";
import logger from "@/config/logger";

// Import routes
import authRoutes from "@/routes/auth";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 3000;
const API_VERSION = process.env["API_VERSION"] || "v1";

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin:
      process.env["NODE_ENV"] === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env["RATE_LIMIT_WINDOW_MS"] || "900000"),
  max: parseInt(process.env["RATE_LIMIT_MAX_REQUESTS"] || "100"),
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
    error: "Rate limit exceeded",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
if (process.env["NODE_ENV"] === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    })
  );
}

// Health check endpoint
app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "ZenVault API is running",
    timestamp: new Date().toISOString(),
    environment: process.env["NODE_ENV"] || "development",
    version: process.env["npm_package_version"] || "1.0.0",
  });
});

// API routes
app.use(`/api/${API_VERSION}/auth`, authRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((error: any, res: express.Response) => {
  logger.error("Unhandled error:", error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message:
      process.env["NODE_ENV"] === "production"
        ? "Internal server error"
        : message,
    error:
      process.env["NODE_ENV"] === "production"
        ? "Something went wrong"
        : error.stack,
  });
});

// Graceful shutdown handling
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await DatabaseManager.connect();
    logger.info("Database connected successfully");

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 ZenVault API server running on port ${PORT}`);
      logger.info(
        `📊 Environment: ${process.env["NODE_ENV"] || "development"}`
      );
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
      logger.info(
        `📚 API Documentation: http://localhost:${PORT}/api/${API_VERSION}/docs`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}, starting graceful shutdown...`);

  try {
    await DatabaseManager.disconnect();
    logger.info("Database connections closed");
    process.exit(0);
  } catch (error) {
    logger.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();

export default app;
