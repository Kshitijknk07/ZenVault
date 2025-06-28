const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    userAgent: {
      type: String,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ expiresAt: 1 });
refreshTokenSchema.index({ isRevoked: 1 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

const storeRefreshToken = async ({
  userId,
  token,
  expiresAt,
  userAgent = null,
  ipAddress = null,
}) => {
  const refreshToken = new RefreshToken({
    userId,
    token,
    expiresAt,
    userAgent,
    ipAddress,
  });

  await refreshToken.save();
  return refreshToken;
};

const findRefreshToken = async (token) => {
  return await RefreshToken.findOne({
    token,
    isRevoked: false,
    expiresAt: { $gt: new Date() },
  }).populate("userId", "username email");
};

const revokeRefreshToken = async (token) => {
  const result = await RefreshToken.findOneAndUpdate(
    { token },
    { isRevoked: true },
    { new: true }
  );

  return result;
};

const revokeAllUserTokens = async (userId) => {
  const result = await RefreshToken.updateMany(
    { userId, isRevoked: false },
    { isRevoked: true }
  );

  return result.modifiedCount;
};

const deleteExpiredTokens = async () => {
  const result = await RefreshToken.deleteMany({
    expiresAt: { $lt: new Date() },
  });

  return result.deletedCount;
};

const getUserSessions = async (userId) => {
  return await RefreshToken.find({
    userId,
    isRevoked: false,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });
};

const revokeSession = async (tokenId, userId) => {
  const result = await RefreshToken.findOneAndUpdate(
    { _id: tokenId, userId },
    { isRevoked: true },
    { new: true }
  );

  return result;
};

const cleanupOldTokens = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const result = await RefreshToken.deleteMany({
    createdAt: { $lt: thirtyDaysAgo },
  });

  return result.deletedCount;
};

module.exports = {
  RefreshToken,
  storeRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  deleteExpiredTokens,
  getUserSessions,
  revokeSession,
  cleanupOldTokens,
};
