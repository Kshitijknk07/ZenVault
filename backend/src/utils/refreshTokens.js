const redisClient = require("./redisClient");

async function addRefreshToken(token, expirySeconds) {
  await redisClient.set(`rt_${token}`, "1", { EX: expirySeconds });
}

async function removeRefreshToken(token) {
  await redisClient.del(`rt_${token}`);
}

async function hasRefreshToken(token) {
  const result = await redisClient.get(`rt_${token}`);
  return result === "1";
}

module.exports = { addRefreshToken, removeRefreshToken, hasRefreshToken };
