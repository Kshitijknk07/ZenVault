const express = require("express");
const router = express.Router();
const folderController = require("../../controllers/folders/folderController");
const { protect } = require("../../middleware/auth/authMiddleware");

router.post("/", protect, folderController.createFolder);

router.get("/:id", protect, folderController.getFolderDetails);

router.get("/:id/contents", protect, folderController.getFolderContents);

router.put("/:id/rename", protect, folderController.renameFolder);

router.put("/:id/trash", protect, folderController.moveFolderToTrash);

router.put("/:id/restore", protect, folderController.restoreFolderFromTrash);

router.delete("/:id", protect, folderController.deleteFolderPermanently);

router.get("/trash", protect, folderController.getFoldersInTrash);

router.get("/search", protect, folderController.searchFolders);

module.exports = router;
