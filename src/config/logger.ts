import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const level = () => {
  const env = process.env["NODE_ENV"] || "development";
  return env === "development" ? "debug" : "warn";
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info["timestamp"]} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),

  new DailyRotateFile({
    filename: path.join(
      process.env["LOG_FILE_PATH"] || "./logs",
      "error-%DATE%.log"
    ),
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxSize: "20m",
    maxFiles: "14d",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),

  new DailyRotateFile({
    filename: path.join(
      process.env["LOG_FILE_PATH"] || "./logs",
      "combined-%DATE%.log"
    ),
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
