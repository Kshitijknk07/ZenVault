const express = require("express");
const router = express.Router();
const fileController = require("../../controllers/files/fileController");
const {
  protect,
  extractUser,
} = require("../../middleware/auth/clerkMiddleware");
const upload = require("../../middleware/fileUpload");

router.post(
  "/",
  protect,
  extractUser,
  upload.single("file"),
  fileController.uploadFile
);
router.get("/:id/download", protect, extractUser, fileController.downloadFile);
router.get("/:id", protect, extractUser, fileController.getFileDetails);
router.get(
  "/folder/:folderId",
  protect,
  extractUser,
  fileController.getFilesInFolder
);
router.put("/:id/trash", protect, extractUser, fileController.moveFileToTrash);
router.put(
  "/:id/restore",
  protect,
  extractUser,
  fileController.restoreFileFromTrash
);
router.delete(
  "/:id",
  protect,
  extractUser,
  fileController.deleteFilePermanently
);
router.get("/search", protect, extractUser, fileController.searchFiles);
router.get("/type/:type", protect, extractUser, fileController.getFilesByType);
router.get("/trash", protect, extractUser, fileController.getFilesInTrash);
router.post(
  "/:id/versions",
  protect,
  extractUser,
  upload.single("file"),
  fileController.createFileVersion
);
router.get(
  "/:id/versions",
  protect,
  extractUser,
  fileController.getFileVersions
);
router.put(
  "/:fileId/versions/:versionId/restore",
  protect,
  extractUser,
  fileController.restoreFileVersion
);

module.exports = router;
