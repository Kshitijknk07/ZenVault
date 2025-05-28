const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

// Registration
router.post("/register", auth.register);

// Login
router.post("/login", auth.login);

// Protected profile route
router.get("/profile", authenticateToken, auth.profile);

// Forgot password
router.post("/forgot-password", auth.forgotPassword);

// Reset password
router.post("/reset-password/:token", auth.resetPassword);

module.exports = router;
