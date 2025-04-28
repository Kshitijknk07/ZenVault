const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const folderModel = require("../models/folders/folderModel");
const { users } = require("@clerk/clerk-sdk-node");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
    });

    await folderModel.createFolder({
      name: "Root",
      userId: newUser.id,
      parentFolderId: null,
      isRoot: true,
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// We only need the profile function now
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Check if user exists in our database
    let user = await userModel.getUserByClerkId(userId);

    // If user doesn't exist in our database yet, create them
    if (!user) {
      // Get user details from Clerk
      const clerkUser = await users.getUser(userId);

      // Create user in our database
      user = await userModel.createUserFromClerk({
        clerkId: userId,
        username:
          clerkUser.username ||
          clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        email: clerkUser.emailAddresses[0].emailAddress,
      });

      // Create root folder for new user
      await folderModel.createFolder({
        name: "Root",
        userId: user.id,
        parentFolderId: null,
        isRoot: true,
      });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      storage_used: user.storage_used,
      storage_limit: user.storage_limit,
      created_at: user.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await userModel.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

module.exports = { login };
module.exports = {
  getUserProfile,
};
