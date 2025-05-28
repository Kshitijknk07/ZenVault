const {
  addFile,
  listFilesByUser,
  deleteFileById,
  renameFileById,
  moveFile,
  copyFile,
} = require("../models/file.model");
const { copyS3Object, deleteS3Object } = require("../utils/s3");

exports.listUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await listFilesByUser(userId);
    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

exports.saveFileMetadata = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fileName, s3Key, fileSize } = req.body;
    if (!fileName || !s3Key) {
      return res
        .status(400)
        .json({ message: "fileName and s3Key are required" });
    }
    const file = await addFile({ userId, fileName, s3Key, fileSize });
    res.status(201).json({ file });
  } catch (err) {
    res.status(500).json({ message: "Failed to save file metadata" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;
    const deleted = await deleteFileById(userId, fileId);
    if (!deleted) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete file" });
  }
};

exports.renameFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;
    const { newName } = req.body;
    if (!newName) {
      return res.status(400).json({ message: "newName is required" });
    }
    const updated = await renameFileById(userId, fileId, newName);
    if (!updated) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json({ file: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to rename file" });
  }
};

exports.moveFile = async (req, res) => {
  const userId = req.user.id;
  const fileId = req.params.id;
  const { newFolderId, newS3Key } = req.body;
  if (!newFolderId || !newS3Key)
    return res
      .status(400)
      .json({ message: "newFolderId and newS3Key required" });

  // Get the file
  const files = await listFilesByUser(userId);
  const file = files.find((f) => f.id == fileId);
  if (!file) return res.status(404).json({ message: "File not found" });

  // Move on S3: copy then delete
  await copyS3Object(file.s3_key, newS3Key);
  await deleteS3Object(file.s3_key);

  // Update DB
  const updated = await moveFile(userId, fileId, newFolderId);
  // Also update s3_key in DB
  const pool = require("../config/db");
  await pool.query("UPDATE files SET s3_key = $1 WHERE id = $2", [
    newS3Key,
    fileId,
  ]);

  res.json({ file: { ...updated, s3_key: newS3Key } });
};

exports.copyFile = async (req, res) => {
  const userId = req.user.id;
  const fileId = req.params.id;
  const { newFolderId, newS3Key } = req.body;
  if (!newFolderId || !newS3Key)
    return res
      .status(400)
      .json({ message: "newFolderId and newS3Key required" });

  // Get the file
  const files = await listFilesByUser(userId);
  const file = files.find((f) => f.id == fileId);
  if (!file) return res.status(404).json({ message: "File not found" });

  // Copy on S3
  await copyS3Object(file.s3_key, newS3Key);

  // Insert new DB record
  const copied = await copyFile(userId, fileId, newFolderId);
  // Update s3_key in DB
  const pool = require("../config/db");
  await pool.query("UPDATE files SET s3_key = $1 WHERE id = $2", [
    newS3Key,
    copied.id,
  ]);

  res.json({ file: { ...copied, s3_key: newS3Key } });
};
