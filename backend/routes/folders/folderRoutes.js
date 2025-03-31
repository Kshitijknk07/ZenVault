const express = require("express");
const router = express.Router();
const folderController = require("../../controllers/folders/folderController");
const {
  protect,
  extractUser,
} = require("../../middleware/auth/clerkMiddleware");

router.post("/", protect, extractUser, folderController.createFolder);
router.get("/:id", protect, extractUser, folderController.getFolderDetails);
router.get(
  "/:id/contents",
  protect,
  extractUser,
  folderController.getFolderContents
);
router.put("/:id/rename", protect, extractUser, folderController.renameFolder);
router.put(
  "/:id/trash",
  protect,
  extractUser,
  folderController.moveFolderToTrash
);
router.put(
  "/:id/restore",
  protect,
  extractUser,
  folderController.restoreFolderFromTrash
);
router.delete(
  "/:id",
  protect,
  extractUser,
  folderController.deleteFolderPermanently
);
router.get("/trash", protect, extractUser, folderController.getFoldersInTrash);
router.get("/search", protect, extractUser, folderController.searchFolders);

module.exports = router;
