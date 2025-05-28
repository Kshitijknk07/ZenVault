const {
  addFile,
  listFilesByUser,
  deleteFileById,
  renameFileById,
} = require("../models/file.model");

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
