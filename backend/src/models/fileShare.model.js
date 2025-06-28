const mongoose = require("mongoose");

const fileShareSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    permission: {
      type: String,
      enum: ["read", "write", "admin"],
      default: "read",
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

fileShareSchema.index({ fileId: 1 });
fileShareSchema.index({ sharedWith: 1 });
fileShareSchema.index({ sharedBy: 1 });
fileShareSchema.index({ fileId: 1, sharedWith: 1 }, { unique: true });
fileShareSchema.index({ expiresAt: 1 });

const FileShare = mongoose.model("FileShare", fileShareSchema);

const shareFile = async ({
  fileId,
  sharedBy,
  sharedWith,
  permission,
  expiresAt = null,
}) => {
  try {
    const fileShare = new FileShare({
      fileId,
      sharedBy,
      sharedWith,
      permission,
      expiresAt,
    });

    await fileShare.save();
    return fileShare;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("File is already shared with this user");
    }
    throw error;
  }
};

const getSharedFiles = async (userId, options = {}) => {
  const { page = 1, limit = 20, permission = null } = options;

  const query = { sharedWith: userId, isActive: true };

  if (permission) {
    query.permission = permission;
  }

  query.$or = [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }];

  const skip = (page - 1) * limit;

  const shares = await FileShare.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "fileId",
      populate: {
        path: "userId",
        select: "username email",
      },
    })
    .populate("sharedBy", "username email");

  const total = await FileShare.countDocuments(query);

  return {
    shares,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getFilesSharedByUser = async (userId, options = {}) => {
  const { page = 1, limit = 20 } = options;

  const skip = (page - 1) * limit;

  const shares = await FileShare.find({ sharedBy: userId, isActive: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "fileId",
      populate: {
        path: "userId",
        select: "username email",
      },
    })
    .populate("sharedWith", "username email");

  const total = await FileShare.countDocuments({
    sharedBy: userId,
    isActive: true,
  });

  return {
    shares,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getShareById = async (shareId, userId) => {
  return await FileShare.findOne({
    _id: shareId,
    $or: [{ sharedBy: userId }, { sharedWith: userId }],
    isActive: true,
  }).populate("fileId sharedBy sharedWith");
};

const updateShare = async (shareId, userId, updateData) => {
  const allowedFields = ["permission", "expiresAt"];
  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const share = await FileShare.findOneAndUpdate(
    { _id: shareId, sharedBy: userId },
    filteredData,
    { new: true, runValidators: true }
  ).populate("fileId sharedBy sharedWith");

  return share;
};

const removeShare = async (shareId, userId) => {
  const share = await FileShare.findOneAndUpdate(
    { _id: shareId, sharedBy: userId },
    { isActive: false },
    { new: true }
  );

  return share;
};

const checkFileAccess = async (fileId, userId) => {
  const share = await FileShare.findOne({
    fileId,
    sharedWith: userId,
    isActive: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  });

  return share;
};

const getUserFilePermission = async (fileId, userId) => {
  const share = await FileShare.findOne({
    fileId,
    sharedWith: userId,
    isActive: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  });

  return share ? share.permission : null;
};

const getFileAccessUsers = async (fileId, userId) => {
  const shares = await FileShare.find({
    fileId,
    sharedBy: userId,
    isActive: true,
  }).populate("sharedWith", "username email");

  return shares;
};

const bulkShareFiles = async (
  fileIds,
  sharedBy,
  sharedWith,
  permission,
  expiresAt = null
) => {
  const shares = [];

  for (const fileId of fileIds) {
    try {
      const share = await shareFile({
        fileId,
        sharedBy,
        sharedWith,
        permission,
        expiresAt,
      });
      shares.push(share);
    } catch (error) {
      if (error.message.includes("already shared")) {
        continue;
      }
      throw error;
    }
  }

  return shares;
};

const cleanupExpiredShares = async () => {
  const result = await FileShare.updateMany(
    {
      expiresAt: { $lt: new Date() },
      isActive: true,
    },
    { isActive: false }
  );

  return result.modifiedCount;
};

const getShareStats = async (userId) => {
  const stats = await FileShare.aggregate([
    {
      $match: {
        $or: [
          { sharedBy: new mongoose.Types.ObjectId(userId) },
          { sharedWith: new mongoose.Types.ObjectId(userId) },
        ],
        isActive: true,
      },
    },
    {
      $group: {
        _id: null,
        totalShared: {
          $sum: {
            $cond: [
              { $eq: ["$sharedBy", new mongoose.Types.ObjectId(userId)] },
              1,
              0,
            ],
          },
        },
        totalReceived: {
          $sum: {
            $cond: [
              { $eq: ["$sharedWith", new mongoose.Types.ObjectId(userId)] },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  return {
    totalShared: stats.length > 0 ? stats[0].totalShared : 0,
    totalReceived: stats.length > 0 ? stats[0].totalReceived : 0,
  };
};

module.exports = {
  FileShare,
  shareFile,
  getSharedFiles,
  getFilesSharedByUser,
  getShareById,
  updateShare,
  removeShare,
  checkFileAccess,
  getUserFilePermission,
  getFileAccessUsers,
  bulkShareFiles,
  cleanupExpiredShares,
  getShareStats,
};
