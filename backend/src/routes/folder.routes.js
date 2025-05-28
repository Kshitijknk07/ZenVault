const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const folderController = require("../controllers/folder.controller");

const router = express.Router();

router.post("/", authenticateToken, folderController.createFolder);
router.get("/", authenticateToken, folderController.listFolders);
router.patch("/:id", authenticateToken, folderController.renameFolder);
router.delete("/:id", authenticateToken, folderController.deleteFolder);

module.exports = router;
