const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z0-9_-]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ verificationToken: 1 });
userSchema.index({ resetPasswordToken: 1 });

const User = mongoose.model("User", userSchema);

const createUser = async ({ username, email, password }) => {
  try {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const verificationToken = uuidv4();

    const user = new User({
      username,
      email,
      passwordHash,
      verificationToken,
    });

    await user.save();

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      verificationToken,
    };
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        throw new Error("Email already exists");
      }
      if (error.keyPattern.username) {
        throw new Error("Username already exists");
      }
    }
    throw error;
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const findUserById = async (id) => {
  return await User.findById(id).select("-passwordHash");
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      isVerified: true,
      verificationToken: null,
    },
    { new: true }
  );

  return user;
};

const updatePassword = async (userId, newPassword) => {
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);

  const user = await User.findByIdAndUpdate(
    userId,
    {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    { new: true }
  ).select("-passwordHash");

  return user;
};

const setPasswordResetToken = async (email) => {
  const resetToken = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    {
      resetPasswordToken: resetToken,
      resetPasswordExpires: expiresAt,
    },
    { new: true }
  );

  return user;
};

const resetPassword = async (resetToken, newPassword) => {
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);

  const user = await User.findOneAndUpdate(
    {
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: new Date() },
    },
    {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    { new: true }
  ).select("-passwordHash");

  return user;
};

const updateProfile = async (userId, { username, email }) => {
  try {
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email.toLowerCase();

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");

    return user;
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        throw new Error("Username already exists");
      }
      if (error.keyPattern.email) {
        throw new Error("Email already exists");
      }
    }
    throw error;
  }
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId).select("-passwordHash");
  return user;
};

const getUserStats = async (userId) => {
  try {
    const fileCount = await mongoose.model("File").countDocuments({ userId });

    const folderCount = await mongoose
      .model("Folder")
      .countDocuments({ userId });

    const storageResult = await mongoose
      .model("File")
      .aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, totalStorage: { $sum: "$fileSize" } } },
      ]);

    const totalStorage =
      storageResult.length > 0 ? storageResult[0].totalStorage : 0;

    const sharedFiles = await mongoose
      .model("FileShare")
      .countDocuments({ sharedBy: userId });

    return {
      fileCount,
      folderCount,
      totalStorage,
      sharedFiles,
    };
  } catch (error) {
    console.error("Error getting user stats:", error);
    throw error;
  }
};

const validatePassword = async (userId, password) => {
  const user = await User.findById(userId).select("passwordHash");
  if (!user) return false;

  return await bcrypt.compare(password, user.passwordHash);
};

const searchUsersForSharing = async (searchTerm, currentUserId) => {
  const users = await User.find({
    $and: [
      {
        $or: [
          { username: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      },
      { _id: { $ne: currentUserId } },
      { isVerified: true },
    ],
  })
    .select("username email")
    .limit(10);

  return users;
};

module.exports = {
  User,
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  verifyUser,
  updatePassword,
  setPasswordResetToken,
  resetPassword,
  updateProfile,
  deleteUser,
  getUserStats,
  validatePassword,
  searchUsersForSharing,
};
