const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },
    mimeType: {
      type: String,
      required: true,
    },
    s3Key: {
      type: String,
      required: true,
    },
    s3Bucket: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    checksum: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.index({ userId: 1 });
fileSchema.index({ folderId: 1 });
fileSchema.index({ userId: 1, folderId: 1 });
fileSchema.index({ s3Key: 1 });
fileSchema.index({ createdAt: -1 });
fileSchema.index({ fileName: "text", originalName: "text" });

const File = mongoose.model("File", fileSchema);

const createFile = async ({
  userId,
  folderId,
  fileName,
  originalName,
  fileSize,
  mimeType,
  s3Key,
  s3Bucket,
  checksum = null,
}) => {
  const file = new File({
    userId,
    folderId,
    fileName,
    originalName,
    fileSize,
    mimeType,
    s3Key,
    s3Bucket,
    checksum,
  });

  await file.save();
  return file;
};

const getFilesByUser = async (userId, folderId = null, options = {}) => {
  const query = { userId };
  if (folderId !== null) {
    query.folderId = folderId;
  }

  const { page = 1, limit = 20, sort = { createdAt: -1 }, search } = options;

  if (search) {
    query.$text = { $search: search };
  }

  const skip = (page - 1) * limit;

  const files = await File.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("folderId", "name path");

  const total = await File.countDocuments(query);

  return {
    files,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getFileById = async (fileId, userId) => {
  return await File.findOne({ _id: fileId, userId }).populate(
    "folderId",
    "name path"
  );
};

const updateFile = async (fileId, userId, updateData) => {
  const allowedFields = ["fileName", "isPublic"];
  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const file = await File.findOneAndUpdate(
    { _id: fileId, userId },
    filteredData,
    { new: true, runValidators: true }
  ).populate("folderId", "name path");

  return file;
};

const deleteFile = async (fileId, userId) => {
  const file = await File.findOneAndDelete({ _id: fileId, userId });
  return file;
};

const moveFile = async (fileId, userId, newFolderId) => {
  const file = await File.findOneAndUpdate(
    { _id: fileId, userId },
    { folderId: newFolderId },
    { new: true, runValidators: true }
  ).populate("folderId", "name path");

  return file;
};

const copyFile = async (fileId, userId, newFolderId, newFileName = null) => {
  const sourceFile = await File.findOne({ _id: fileId, userId });
  if (!sourceFile) {
    throw new Error("Source file not found");
  }

  const fileName = newFileName || sourceFile.fileName;

  const newFile = new File({
    userId,
    folderId: newFolderId,
    fileName,
    originalName: sourceFile.originalName,
    fileSize: sourceFile.fileSize,
    mimeType: sourceFile.mimeType,
    s3Key: sourceFile.s3Key,
    s3Bucket: sourceFile.s3Bucket,
    checksum: sourceFile.checksum,
  });

  await newFile.save();
  return newFile;
};

const getFileStats = async (userId) => {
  const stats = await File.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalFiles: { $sum: 1 },
        totalSize: { $sum: "$fileSize" },
        avgFileSize: { $avg: "$fileSize" },
      },
    },
  ]);

  const fileTypes = await File.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$mimeType",
        count: { $sum: 1 },
        totalSize: { $sum: "$fileSize" },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  return {
    totalFiles: stats.length > 0 ? stats[0].totalFiles : 0,
    totalSize: stats.length > 0 ? stats[0].totalSize : 0,
    avgFileSize: stats.length > 0 ? stats[0].avgFileSize : 0,
    fileTypes,
  };
};

const searchFiles = async (userId, searchTerm, options = {}) => {
  const { page = 1, limit = 20, folderId = null } = options;

  const query = {
    userId,
    $text: { $search: searchTerm },
  };

  if (folderId !== null) {
    query.folderId = folderId;
  }

  const skip = (page - 1) * limit;

  const files = await File.find(query)
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit)
    .populate("folderId", "name path");

  const total = await File.countDocuments(query);

  return {
    files,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getRecentFiles = async (userId, limit = 10) => {
  return await File.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("folderId", "name path");
};

const getFilesByType = async (userId, mimeType, options = {}) => {
  const { page = 1, limit = 20 } = options;

  const query = { userId };
  if (mimeType) {
    query.mimeType = { $regex: mimeType, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const files = await File.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("folderId", "name path");

  const total = await File.countDocuments(query);

  return {
    files,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const deleteFilesByFolder = async (folderId) => {
  const files = await File.find({ folderId });
  await File.deleteMany({ folderId });
  return files;
};

const updateFilePaths = async (oldFolderPath, newFolderPath) => {};

module.exports = {
  File,
  createFile,
  getFilesByUser,
  getFileById,
  updateFile,
  deleteFile,
  moveFile,
  copyFile,
  getFileStats,
  searchFiles,
  getRecentFiles,
  getFilesByType,
  deleteFilesByFolder,
  updateFilePaths,
};
