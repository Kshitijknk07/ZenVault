const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, extractUser } = require("../middleware/auth/clerkMiddleware");

router.get("/profile", protect, extractUser, authController.getUserProfile);

module.exports = router;
