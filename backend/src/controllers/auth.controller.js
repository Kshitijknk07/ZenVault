const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  findUserByEmail,
  createUser,
  updateUserPassword,
  setResetToken,
  findUserByResetToken,
  clearResetToken,
  setVerificationToken,
  findUserByVerificationToken,
  verifyUser,
} = require("../models/user.model");
const { sendResetEmail, sendVerificationEmail } = require("../utils/email");
const { blacklistToken } = require("../utils/tokenBlacklist");
const {
  addRefreshToken,
  removeRefreshToken,
  hasRefreshToken,
} = require("../utils/refreshTokens");

const JWT_EXPIRY = "1h";

exports.register = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    return res
      .status(400)
      .json({ message: "Email, username, and password required" });

  const existingUser = await findUserByEmail(email);
  if (existingUser)
    return res.status(409).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashedPassword, username);

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  await setVerificationToken(email, verificationToken);

  // Send verification email
  const verificationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/verify-email?token=${verificationToken}`;
  await sendVerificationEmail(email, verificationLink);

  res.status(201).json({
    message: "User registered. Please verify your email.",
    user: { id: user.id, email: user.email, username: user.username },
  });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: "Token required" });

  const user = await findUserByVerificationToken(token);
  if (!user) return res.status(400).json({ message: "Invalid token" });

  await verifyUser(user.email);

  res.json({ message: "Email verified successfully. You can now log in." });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.is_verified)
    return res
      .status(403)
      .json({ message: "Please verify your email before logging in." });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  await addRefreshToken(refreshToken, 7 * 24 * 60 * 60); // 7 days
  res.json({ token, refreshToken });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !(await hasRefreshToken(refreshToken))) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  try {
    const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
    res.json({ token: newToken });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

exports.logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { refreshToken } = req.body;
  if (token) {
    // Blacklist for the remaining token lifetime (e.g., 1 hour)
    await blacklistToken(token, 60 * 60);
  }
  if (refreshToken) {
    await removeRefreshToken(refreshToken);
  }
  res.json({ message: "Logged out successfully" });
};

exports.profile = async (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user)
    return res
      .status(200)
      .json({ message: "If email exists, reset link sent" });

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await setResetToken(email, token, expiry);

  const resetLink = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${token}`;
  await sendResetEmail(email, resetLink);

  res.json({ message: "If email exists, reset link sent" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await findUserByResetToken(token);
  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await updateUserPassword(user.email, hashedPassword);
  await clearResetToken(user.email);

  res.json({ message: "Password reset successful" });
};
