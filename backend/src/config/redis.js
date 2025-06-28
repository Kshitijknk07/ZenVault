const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }

    return Math.min(options.attempt * 100, 3000);
  },
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("✅ Connected to Redis");
  } catch (error) {
    console.error("❌ Redis connection failed:", error.message);

    if (process.env.NODE_ENV === "production") {
      throw error;
    }
  }
};

const testRedisConnection = async () => {
  try {
    await redisClient.ping();
    console.log("✅ Redis connection test successful");
    return true;
  } catch (error) {
    console.error("❌ Redis connection test failed:", error.message);
    return false;
  }
};

const setCache = async (key, value, expireTime = 3600) => {
  try {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    await redisClient.setEx(key, expireTime, stringValue);
    return true;
  } catch (error) {
    console.error("Error setting cache:", error);
    return false;
  }
};

const getCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
};

const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error("Error deleting cache:", error);
    return false;
  }
};

const clearCache = async () => {
  try {
    await redisClient.flushAll();
    return true;
  } catch (error) {
    console.error("Error clearing cache:", error);
    return false;
  }
};

const incrementRateLimit = async (key, windowMs) => {
  try {
    const current = await redisClient.incr(key);
    if (current === 1) {
      await redisClient.expire(key, Math.floor(windowMs / 1000));
    }
    return current;
  } catch (error) {
    console.error("Error incrementing rate limit:", error);
    return 0;
  }
};

const getRateLimit = async (key) => {
  try {
    const current = await redisClient.get(key);
    return current ? parseInt(current) : 0;
  } catch (error) {
    console.error("Error getting rate limit:", error);
    return 0;
  }
};

const setSession = async (sessionId, sessionData, expireTime = 86400) => {
  try {
    const stringValue = JSON.stringify(sessionData);
    await redisClient.setEx(`session:${sessionId}`, expireTime, stringValue);
    return true;
  } catch (error) {
    console.error("Error setting session:", error);
    return false;
  }
};

const getSession = async (sessionId) => {
  try {
    const value = await redisClient.get(`session:${sessionId}`);
    if (!value) return null;
    return JSON.parse(value);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

const deleteSession = async (sessionId) => {
  try {
    await redisClient.del(`session:${sessionId}`);
    return true;
  } catch (error) {
    console.error("Error deleting session:", error);
    return false;
  }
};

const blacklistToken = async (token, expireTime = 86400) => {
  try {
    await redisClient.setEx(`blacklist:${token}`, expireTime, "1");
    return true;
  } catch (error) {
    console.error("Error blacklisting token:", error);
    return false;
  }
};

const isTokenBlacklisted = async (token) => {
  try {
    const value = await redisClient.get(`blacklist:${token}`);
    return value !== null;
  } catch (error) {
    console.error("Error checking blacklisted token:", error);
    return false;
  }
};

const closeRedis = async () => {
  try {
    await redisClient.quit();
    console.log("✅ Redis connection closed");
  } catch (error) {
    console.error("Error closing Redis connection:", error);
  }
};

process.on("SIGINT", closeRedis);
process.on("SIGTERM", closeRedis);

module.exports = {
  redisClient,
  connectRedis,
  testRedisConnection,
  setCache,
  getCache,
  deleteCache,
  clearCache,
  incrementRateLimit,
  getRateLimit,
  setSession,
  getSession,
  deleteSession,
  blacklistToken,
  isTokenBlacklisted,
  closeRedis,
};
