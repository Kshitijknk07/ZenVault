const folderModel = require("../models/folder.model");
const fileModel = require("../models/file.model");
const { copyS3Object, deleteS3Object, listS3Objects } = require("../utils/s3");

exports.createFolder = async (req, res) => {
  const userId = req.user.id;
  const { name, parentId } = req.body;
  if (!name) return res.status(400).json({ message: "Folder name required" });
  const folder = await folderModel.createFolder({ userId, name, parentId });
  res.status(201).json({ folder });
};

exports.listFolders = async (req, res) => {
  const userId = req.user.id;
  const { parentId = null } = req.query;
  const folders = await folderModel.listFoldersByUser(userId, parentId);
  res.json({ folders });
};

exports.renameFolder = async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.id;
  const { newName } = req.body;
  if (!newName) return res.status(400).json({ message: "newName required" });
  const folder = await folderModel.renameFolder(userId, folderId, newName);
  if (!folder) return res.status(404).json({ message: "Folder not found" });
  res.json({ folder });
};

exports.deleteFolder = async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.id;
  const folder = await folderModel.deleteFolder(userId, folderId);
  if (!folder) return res.status(404).json({ message: "Folder not found" });
  res.json({ message: "Folder deleted" });
};

exports.moveFolder = async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.id;
  const { newParentId, oldPrefix, newPrefix } = req.body;
  if (!newParentId || !oldPrefix || !newPrefix)
    return res
      .status(400)
      .json({ message: "newParentId, oldPrefix, newPrefix required" });

  // Move all files in this folder (and subfolders)
  const files = await fileModel.listFilesByUser(userId);
  const filesInFolder = files.filter((f) => f.s3_key.startsWith(oldPrefix));
  for (const file of filesInFolder) {
    const relativePath = file.s3_key.slice(oldPrefix.length);
    const newS3Key = newPrefix + relativePath;
    await copyS3Object(file.s3_key, newS3Key);
    await deleteS3Object(file.s3_key);
    // Update DB
    const pool = require("../config/db");
    await pool.query("UPDATE files SET s3_key = $1 WHERE id = $2", [
      newS3Key,
      file.id,
    ]);
  }

  // Move folder in DB
  const folder = await folderModel.moveFolder(userId, folderId, newParentId);
  if (!folder) return res.status(404).json({ message: "Folder not found" });
  res.json({ folder });
};

exports.copyFolder = async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.id;
  const { newParentId, oldPrefix, newPrefix } = req.body;
  if (!newParentId || !oldPrefix || !newPrefix)
    return res
      .status(400)
      .json({ message: "newParentId, oldPrefix, newPrefix required" });

  // Copy folder in DB
  const newFolder = await folderModel.copyFolder(userId, folderId, newParentId);
  if (!newFolder) return res.status(404).json({ message: "Folder not found" });

  // Copy all files in this folder (and subfolders)
  const files = await fileModel.listFilesByUser(userId);
  const filesInFolder = files.filter((f) => f.s3_key.startsWith(oldPrefix));
  for (const file of filesInFolder) {
    const relativePath = file.s3_key.slice(oldPrefix.length);
    const newS3Key = newPrefix + relativePath;
    await copyS3Object(file.s3_key, newS3Key);
    // Insert new DB record
    const copied = await fileModel.copyFile(userId, file.id, newFolder.id);
    const pool = require("../config/db");
    await pool.query("UPDATE files SET s3_key = $1 WHERE id = $2", [
      newS3Key,
      copied.id,
    ]);
  }

  res.json({ folder: newFolder });
};
