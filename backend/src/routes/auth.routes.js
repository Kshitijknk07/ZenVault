const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const auth = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/auth.middleware");

const router = express.Router();

// Rate limiter: 5 requests per minute per IP for auth endpoints
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: "Too many attempts, please try again later.",
});

router.post(
  "/register",
  authLimiter,
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("Password must contain a special character"),
    body("username").notEmpty().withMessage("Username is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  auth.register
);

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  auth.login
);

// Registration
router.post("/register", auth.register);

// Login
router.post("/login", auth.login);

// Protected profile route
router.get("/profile", authenticateToken, auth.profile);

// Forgot password
router.post("/forgot-password", authLimiter, auth.forgotPassword);

// Reset password
router.post("/reset-password/:token", authLimiter, auth.resetPassword);

// Email verification
router.get("/verify-email", auth.verifyEmail);

// Logout
router.post("/logout", authenticateToken, auth.logout);

// Refresh token
router.post("/refresh-token", auth.refreshToken);

module.exports = router;
