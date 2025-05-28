const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const fileController = require("../controllers/file.controller");
const { generateDownloadUrl } = require("../utils/s3");

const router = express.Router();

router.get("/", authenticateToken, fileController.listUserFiles);

// Save file metadata after upload
router.post("/", authenticateToken, fileController.saveFileMetadata);

// Delete a file record
router.delete("/:id", authenticateToken, fileController.deleteFile);

// Rename a file
router.patch("/:id", authenticateToken, fileController.renameFile);

// Generate a pre-signed download URL for a file the user owns
router.post("/download-url", authenticateToken, async (req, res) => {
  const { s3Key } = req.body;
  if (!s3Key) {
    return res.status(400).json({ message: "s3Key is required" });
  }
  const userId = req.user.id;
  const { listFilesByUser } = require("../models/file.model");
  const files = await listFilesByUser(userId);
  const file = files.find((f) => f.s3_key === s3Key);
  if (!file) {
    return res
      .status(404)
      .json({ message: "File not found or not owned by user" });
  }

  try {
    const url = await generateDownloadUrl(s3Key);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate download URL" });
  }
});

module.exports = router;
