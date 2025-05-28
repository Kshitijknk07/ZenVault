const express = require("express");
const { body, validationResult } = require("express-validator");
const { generateUploadUrl, generateDownloadUrl } = require("../utils/s3");
const authenticateToken = require("../middlewares/auth.middleware");

const router = express.Router();

// Generate pre-signed upload URL
router.post(
  "/upload-url",
  authenticateToken,
  [body("key").notEmpty().withMessage("Key is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { key } = req.body;
      const url = await generateUploadUrl(key);
      res.json({ url });
    } catch (err) {
      res.status(500).json({ message: "Failed to generate upload URL" });
    }
  }
);

// Generate pre-signed download URL
router.post(
  "/download-url",
  authenticateToken,
  [body("key").notEmpty().withMessage("Key is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { key } = req.body;
      const url = await generateDownloadUrl(key);
      res.json({ url });
    } catch (err) {
      res.status(500).json({ message: "Failed to generate download URL" });
    }
  }
);

module.exports = router;

const s3Routes = require("./routes/s3.routes");
app.use("/api/s3", s3Routes);
