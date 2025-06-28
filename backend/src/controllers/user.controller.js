const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const searchUsers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input",
        details: errors.array(),
      });
    }

    const { q: searchTerm } = req.query;
    const currentUserId = req.user.id;

    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.status(400).json({
        error: "Invalid search term",
        message: "Search term must be at least 2 characters long",
      });
    }

    const users = await userModel.searchUsersForSharing(
      searchTerm.trim(),
      currentUserId
    );

    res.json({
      message: "Users found successfully",
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    console.error("User search error:", error);
    res.status(500).json({
      error: "Search failed",
      message: "Failed to search users",
    });
  }
};

module.exports = {
  searchUsers,
};
