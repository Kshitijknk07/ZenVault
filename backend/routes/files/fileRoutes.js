const express = require("express");
const router = express.Router();
const fileController = require("../../controllers/files/fileController");
const { protect } = require("../../middleware/auth/authMiddleware");
const upload = require("../../middleware/fileUpload");

router.post("/", protect, upload.single("file"), fileController.uploadFile);

router.get("/:id/download", protect, fileController.downloadFile);

router.get("/:id", protect, fileController.getFileDetails);

router.get("/folder/:folderId", protect, fileController.getFilesInFolder);

router.put("/:id/trash", protect, fileController.moveFileToTrash);

router.put("/:id/restore", protect, fileController.restoreFileFromTrash);

router.delete("/:id", protect, fileController.deleteFilePermanently);

router.get("/search", protect, fileController.searchFiles);

router.get("/type/:type", protect, fileController.getFilesByType);

router.get("/trash", protect, fileController.getFilesInTrash);

router.post(
  "/:id/versions",
  protect,
  upload.single("file"),
  fileController.createFileVersion
);

router.get("/:id/versions", protect, fileController.getFileVersions);

router.put(
  "/:fileId/versions/:versionId/restore",
  protect,
  fileController.restoreFileVersion
);

module.exports = router;
