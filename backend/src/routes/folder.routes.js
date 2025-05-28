const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const folderController = require("../controllers/folder.controller");

const router = express.Router();

router.post("/", authenticateToken, folderController.createFolder);
router.get("/", authenticateToken, folderController.listFolders);
router.patch("/:id", authenticateToken, folderController.renameFolder);
router.delete("/:id", authenticateToken, folderController.deleteFolder);
router.post("/:id/move", authenticateToken, folderController.moveFolder);
router.post("/:id/copy", authenticateToken, folderController.copyFolder);

module.exports = router;
