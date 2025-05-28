const redisClient = require("./redisClient");

async function blacklistToken(token, expirySeconds) {
  await redisClient.set(`bl_${token}`, "1", { EX: expirySeconds });
}

async function isTokenBlacklisted(token) {
  const result = await redisClient.get(`bl_${token}`);
  return result === "1";
}

module.exports = { blacklistToken, isTokenBlacklisted };
