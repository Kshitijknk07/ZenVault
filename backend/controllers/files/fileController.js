const path = require("path");
const fs = require("fs-extra");
const fileModel = require("../../models/files/fileModel");
const folderModel = require("../../models/folders/folderModel");
const db = require("../../config/db");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { folderId } = req.body;
    const userId = req.user.id;

    if (folderId) {
      const folder = await folderModel.getFolderById(folderId, userId);
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
    }

    let targetFolderId = folderId;
    if (!targetFolderId) {
      const rootFolder = await folderModel.getRootFolder(userId);
      targetFolderId = rootFolder.id;
    }

    const fileData = {
      name: req.file.originalname,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      userId,
      folderId: targetFolderId,
    };

    const file = await fileModel.createFile(fileData);

    res.status(201).json({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    next(error);
  }
};

const downloadFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ message: "File not found on disk" });
    }

    res.download(file.path, file.original_name);
  } catch (error) {
    next(error);
  }
};

const getFileDetails = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

const getFilesInFolder = async (req, res, next) => {
  try {
    const folderId = req.params.folderId;
    const userId = req.user.id;

    const folder = await folderModel.getFolderById(folderId, userId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const files = await fileModel.getFilesInFolder(folderId, userId);

    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

const moveFileToTrash = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const trashedFile = await fileModel.moveFileToTrash(fileId, userId);

    res.status(200).json({
      message: "File moved to trash",
      file: trashedFile,
    });
  } catch (error) {
    next(error);
  }
};

const restoreFileFromTrash = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const restoredFile = await fileModel.restoreFileFromTrash(fileId, userId);

    res.status(200).json({
      message: "File restored from trash",
      file: restoredFile,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFilePermanently = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const deletedFile = await fileModel.deleteFilePermanently(fileId, userId);

    if (fs.existsSync(file.path)) {
      await fs.unlink(file.path);
    }

    const versions = await fileModel.getFileVersions(fileId);
    for (const version of versions) {
      if (fs.existsSync(version.path)) {
        await fs.unlink(version.path);
      }
    }

    res.status(200).json({
      message: "File deleted permanently",
      file: deletedFile,
    });
  } catch (error) {
    next(error);
  }
};

const searchFiles = async (req, res, next) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const files = await fileModel.searchFiles(query, userId);

    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

const getFilesByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const userId = req.user.id;

    let mimeType;
    switch (type.toLowerCase()) {
      case "image":
        mimeType = "image/";
        break;
      case "document":
        mimeType = "application/";
        break;
      case "video":
        mimeType = "video/";
        break;
      case "audio":
        mimeType = "audio/";
        break;
      default:
        mimeType = type;
    }

    const files = await fileModel.getFilesByType(mimeType, userId);

    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

const getFilesInTrash = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT * FROM files 
      WHERE user_id = $1 AND is_trashed = true
      ORDER BY updated_at DESC
    `;

    const result = await db.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createFileVersion = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const versions = await fileModel.getFileVersions(fileId);
    const versionNumber =
      versions.length > 0 ? versions[0].version_number + 1 : 1;

    const versionData = {
      fileId,
      versionNumber,
      path: req.file.path,
      size: req.file.size,
    };

    const newVersion = await fileModel.createFileVersion(
      versionData.fileId,
      versionData.versionNumber,
      versionData.path,
      versionData.size
    );

    const updatedFile = await db.query(
      `UPDATE files 
       SET path = $1, size = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 
       RETURNING *`,
      [req.file.path, req.file.size, fileId]
    );

    await db.query(
      "UPDATE users SET storage_used = storage_used + $1 WHERE id = $2",
      [req.file.size, userId]
    );

    res.status(200).json({
      message: "File version created successfully",
      file: updatedFile.rows[0],
      version: newVersion,
    });
  } catch (error) {
    next(error);
  }
};

const getFileVersions = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const versions = await fileModel.getFileVersions(fileId);

    res.status(200).json(versions);
  } catch (error) {
    next(error);
  }
};

const restoreFileVersion = async (req, res, next) => {
  try {
    const fileId = req.params.fileId;
    const versionId = req.params.versionId;
    const userId = req.user.id;

    const file = await fileModel.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const versionQuery =
      "SELECT * FROM file_versions WHERE id = $1 AND file_id = $2";
    const versionResult = await db.query(versionQuery, [versionId, fileId]);
    const version = versionResult.rows[0];

    if (!version) {
      return res.status(404).json({ message: "Version not found" });
    }

    const versions = await fileModel.getFileVersions(fileId);
    const newVersionNumber =
      versions.length > 0 ? versions[0].version_number + 1 : 1;

    await fileModel.createFileVersion(
      fileId,
      newVersionNumber,
      file.path,
      file.size
    );

    const updatedFile = await db.query(
      `UPDATE files 
       SET path = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [version.path, fileId]
    );

    res.status(200).json({
      message: "File version restored successfully",
      file: updatedFile.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  getFileDetails,
  getFilesInFolder,
  moveFileToTrash,
  restoreFileFromTrash,
  deleteFilePermanently,
  searchFiles,
  getFilesByType,
  getFilesInTrash,
  createFileVersion,
  getFileVersions,
  restoreFileVersion,
};
