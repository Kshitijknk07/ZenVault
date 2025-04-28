const express = require("express");
const router = express.Router();
const storageController = require("../../controllers/storage/storageController");
const { protect } = require("../../middleware/auth/clerkMiddleware");

router.get("/usage", protect, storageController.getStorageUsage);

module.exports = router;
