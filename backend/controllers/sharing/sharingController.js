const sharingModel = require("../../models/sharing/sharingModel");
const fileModel = require("../../models/files/fileModel");
const folderModel = require("../../models/folders/folderModel");
const userModel = require("../../models/userModel");


const createShareLink = async (req, res, next) => {
  try {
    const { itemType, itemId, permission, isPublic, expiresAt } = req.body;
    const userId = req.user.id;

    if (!itemType || !itemId || !permission) {
      return res.status(400).json({
        message: "Item type, item ID, and permission are required",
      });
    }

    
    if (itemType !== "file" && itemType !== "folder") {
      return res.status(400).json({
        message: "Item type must be 'file' or 'folder'",
      });
    }

    
    if (permission !== "view" && permission !== "edit") {
      return res.status(400).json({
        message: "Permission must be 'view' or 'edit'",
      });
    }

    
    let item;
    if (itemType === "file") {
      item = await fileModel.getFileById(itemId, userId);
    } else {
      item = await folderModel.getFolderById(itemId, userId);
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    
    const shareData = {
      itemType,
      itemId,
      ownerId: userId,
      permission,
      isPublic: isPublic || false,
      expiresAt: expiresAt || null,
    };

    const shareLink = await sharingModel.createShareLink(shareData);

    res.status(201).json({
      message: "Share link created successfully",
      shareLink,
    });
  } catch (error) {
    next(error);
  }
};


const shareWithUser = async (req, res, next) => {
  try {
    const { itemType, itemId, email, permission } = req.body;
    const userId = req.user.id;

    if (!itemType || !itemId || !email || !permission) {
      return res.status(400).json({
        message: "Item type, item ID, email, and permission are required",
      });
    }

    
    if (itemType !== "file" && itemType !== "folder") {
      return res.status(400).json({
        message: "Item type must be 'file' or 'folder'",
      });
    }

    
    if (permission !== "view" && permission !== "edit") {
      return res.status(400).json({
        message: "Permission must be 'view' or 'edit'",
      });
    }

    
    let item;
    if (itemType === "file") {
      item = await fileModel.getFileById(itemId, userId);
    } else {
      item = await folderModel.getFolderById(itemId, userId);
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    
    const targetUser = await userModel.getUserByEmail(email);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (targetUser.id === userId) {
      return res.status(400).json({ message: "Cannot share with yourself" });
    }

    
    const shareData = {
      itemType,
      itemId,
      ownerId: userId,
      sharedWithId: targetUser.id,
      permission,
    };

    const share = await sharingModel.shareWithUser(shareData);

    res.status(201).json({
      message: "Item shared successfully",
      share,
    });
  } catch (error) {
    next(error);
  }
};


const getSharedItemByLink = async (req, res, next) => {
  try {
    const { shareLink } = req.params;

    const sharedItem = await sharingModel.getSharedItemByLink(shareLink);
    if (!sharedItem) {
      return res
        .status(404)
        .json({ message: "Shared item not found or link expired" });
    }

    res.status(200).json(sharedItem);
  } catch (error) {
    next(error);
  }
};


const getItemsSharedWithMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sharedItems = await sharingModel.getItemsSharedWithUser(userId);

    res.status(200).json(sharedItems);
  } catch (error) {
    next(error);
  }
};


const getItemsIShared = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sharedItems = await sharingModel.getItemsSharedByUser(userId);

    res.status(200).json(sharedItems);
  } catch (error) {
    next(error);
  }
};


const removeSharing = async (req, res, next) => {
  try {
    const shareId = req.params.id;
    const userId = req.user.id;

    const removedShare = await sharingModel.removeSharing(shareId, userId);
    if (!removedShare) {
      return res.status(404).json({ message: "Share not found" });
    }

    res.status(200).json({
      message: "Sharing removed successfully",
      share: removedShare,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShareLink,
  shareWithUser,
  getSharedItemByLink,
  getItemsSharedWithMe,
  getItemsIShared,
  removeSharing,
};
