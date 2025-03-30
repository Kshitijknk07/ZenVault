const folderModel = require("../../models/folders/folderModel");
const fileModel = require("../../models/files/fileModel");
const db = require("../../config/db");


const createFolder = async (req, res, next) => {
  try {
    const { name, parentFolderId } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    
    if (parentFolderId) {
      const parentFolder = await folderModel.getFolderById(
        parentFolderId,
        userId
      );
      if (!parentFolder) {
        return res.status(404).json({ message: "Parent folder not found" });
      }
    }

    
    let targetParentId = parentFolderId;
    if (!targetParentId) {
      const rootFolder = await folderModel.getRootFolder(userId);
      targetParentId = rootFolder ? rootFolder.id : null;
    }

    
    const folderData = {
      name,
      userId,
      parentFolderId: targetParentId,
      isRoot: !targetParentId,
    };

    const folder = await folderModel.createFolder(folderData);

    res.status(201).json({
      message: "Folder created successfully",
      folder,
    });
  } catch (error) {
    next(error);
  }
};


const getFolderDetails = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    const folder = await folderModel.getFolderById(folderId, userId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder);
  } catch (error) {
    next(error);
  }
};


const getFolderContents = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    
    const folder = await folderModel.getFolderById(folderId, userId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    
    const subfolders = await folderModel.getSubfolders(folderId, userId);

    
    const files = await fileModel.getFilesInFolder(folderId, userId);

    res.status(200).json({
      folder,
      subfolders,
      files,
    });
  } catch (error) {
    next(error);
  }
};


const renameFolder = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "New folder name is required" });
    }

    
    const folder = await folderModel.getFolderById(folderId, userId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const updatedFolder = await folderModel.renameFolder(
      folderId,
      name,
      userId
    );

    res.status(200).json({
      message: "Folder renamed successfully",
      folder: updatedFolder,
    });
  } catch (error) {
    next(error);
  }
};


const moveFolderToTrash = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    
    const folder = await folderModel.getFolderById(folderId, userId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    
    if (folder.is_root) {
      return res.status(400).json({ message: "Cannot trash root folder" });
    }

    const trashedFolder = await folderModel.moveFolderToTrash(folderId, userId);

    res.status(200).json({
      message: "Folder moved to trash",
      folder: trashedFolder,
    });
  } catch (error) {
    next(error);
  }
};


const restoreFolderFromTrash = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    const folder = await db.query(
      "SELECT * FROM folders WHERE id = $1 AND user_id = $2 AND is_trash = true",
      [folderId, userId]
    );

    if (folder.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found in trash" });
    }

    const restoredFolder = await folderModel.restoreFolderFromTrash(
      folderId,
      userId
    );

    res.status(200).json({
      message: "Folder restored from trash",
      folder: restoredFolder,
    });
  } catch (error) {
    next(error);
  }
};


const deleteFolderPermanently = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    
    const folder = await db.query(
      "SELECT * FROM folders WHERE id = $1 AND user_id = $2",
      [folderId, userId]
    );

    if (folder.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    
    if (folder.rows[0].is_root) {
      return res.status(400).json({ message: "Cannot delete root folder" });
    }

    
    const deletedFolder = await folderModel.deleteFolderPermanently(
      folderId,
      userId
    );

    
    
    

    res.status(200).json({
      message: "Folder and all its contents deleted permanently",
      folder: deletedFolder,
    });
  } catch (error) {
    next(error);
  }
};


const getFoldersInTrash = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT * FROM folders 
      WHERE user_id = $1 AND is_trash = true
      ORDER BY updated_at DESC
    `;

    const result = await db.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};


const searchFolders = async (req, res, next) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const folders = await folderModel.searchFolders(query, userId);

    res.status(200).json(folders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFolder,
  getFolderDetails,
  getFolderContents,
  renameFolder,
  moveFolderToTrash,
  restoreFolderFromTrash,
  deleteFolderPermanently,
  getFoldersInTrash,
  searchFolders,
};
