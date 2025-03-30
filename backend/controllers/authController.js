const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const folderModel = require("../models/folders/folderModel");


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


const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
