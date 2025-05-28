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
} = require("../models/user.model");
const { sendResetEmail } = require("../utils/email");

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

  res.status(201).json({
    message: "User registered",
    user: { id: user.id, email: user.email, username: user.username },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
  res.json({ token });
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
