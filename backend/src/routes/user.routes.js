const express = require("express");
const { query } = require("express-validator");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

const validateSearch = [
  query("q")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Search term must be between 2 and 50 characters"),
];

router.get("/search", verifyToken, validateSearch, userController.searchUsers);

module.exports = router;
