const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth/authMiddleware");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/profile", protect, authController.getUserProfile);

module.exports = router;
