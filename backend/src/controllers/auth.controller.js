const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const refreshTokenModel = require("../models/refreshToken.model");
const { blacklistToken } = require("../config/redis");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("../utils/email");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await refreshTokenModel.storeRefreshToken({
    userId,
    token: refreshToken,
    expiresAt,
  });
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input",
        details: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
        message: "A user with this email already exists",
      });
    }

    const existingUsername = await userModel.findUserByUsername(username);
    if (existingUsername) {
      return res.status(409).json({
        error: "Username taken",
        message: "This username is already taken",
      });
    }

    const { user, verificationToken } = await userModel.createUser({
      username,
      email,
      password,
    });

    const { accessToken, refreshToken } = generateTokens(user.id);

    await storeRefreshToken(user.id, refreshToken);

    try {
      await sendVerificationEmail(email, verificationToken, username);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Registration failed",
      message: "Failed to create user account",
    });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input",
        details: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Account not verified",
        message: "Please verify your email address before logging in",
      });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed",
      message: "Failed to authenticate user",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: "Refresh token required",
        message: "Please provide a refresh token",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const tokenRecord = await refreshTokenModel.findRefreshToken(refreshToken);

    if (!tokenRecord) {
      return res.status(401).json({
        error: "Invalid refresh token",
        message: "Refresh token is invalid or expired",
      });
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens(decoded.userId);

    await refreshTokenModel.revokeRefreshToken(refreshToken);
    await storeRefreshToken(decoded.userId, newRefreshToken);

    res.json({
      message: "Token refreshed successfully",
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired",
        message: "Refresh token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token",
        message: "Invalid refresh token",
      });
    }

    console.error("Token refresh error:", error);
    res.status(500).json({
      error: "Token refresh failed",
      message: "Failed to refresh token",
    });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      await blacklistToken(token);
    }

    const { refreshToken } = req.body;
    if (refreshToken) {
      await refreshTokenModel.revokeRefreshToken(refreshToken);
    }

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Logout failed",
      message: "Failed to logout user",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userModel.verifyUser(token);
    if (!user) {
      return res.status(400).json({
        error: "Invalid token",
        message: "Verification token is invalid or expired",
      });
    }

    res.json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      error: "Verification failed",
      message: "Failed to verify email",
    });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input",
        details: errors.array(),
      });
    }

    const { email } = req.body;

    const user = await userModel.setPasswordResetToken(email);
    if (!user) {
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent",
      });
    }

    try {
      await sendPasswordResetEmail(
        email,
        user.resetPasswordToken,
        user.username
      );
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      return res.status(500).json({
        error: "Email sending failed",
        message: "Failed to send password reset email",
      });
    }

    res.json({
      message:
        "If an account with that email exists, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    res.status(500).json({
      error: "Password reset failed",
      message: "Failed to process password reset request",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input",
        details: errors.array(),
      });
    }

    const { token, newPassword } = req.body;

    const user = await userModel.resetPassword(token, newPassword);
    if (!user) {
      return res.status(400).json({
        error: "Invalid token",
        message: "Password reset token is invalid or expired",
      });
    }

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      error: "Password reset failed",
      message: "Failed to reset password",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User profile not found",
      });
    }

    const stats = await userModel.getUserStats(req.user.id);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      stats,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      error: "Profile retrieval failed",
      message: "Failed to get user profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input",
        details: errors.array(),
      });
    }

    const { username, email } = req.body;

    const updatedUser = await userModel.updateProfile(req.user.id, {
      username,
      email,
    });
    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
        message: "User profile not found",
      });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.message.includes("already exists")) {
      return res.status(409).json({
        error: "Update failed",
        message: error.message,
      });
    }

    res.status(500).json({
      error: "Profile update failed",
      message: "Failed to update user profile",
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  getProfile,
  updateProfile,
};
