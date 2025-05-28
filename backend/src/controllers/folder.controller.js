const folderModel = require("../models/folder.model");

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
