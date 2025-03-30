const express = require("express");
const router = express.Router();
const sharingController = require("../../controllers/sharing/sharingController");
const { protect } = require("../../middleware/auth/authMiddleware");

router.post("/link", protect, sharingController.createShareLink);

router.post("/user", protect, sharingController.shareWithUser);

router.get("/link/:shareLink", sharingController.getSharedItemByLink);

router.get("/with-me", protect, sharingController.getItemsSharedWithMe);

router.get("/by-me", protect, sharingController.getItemsIShared);

router.delete("/:id", protect, sharingController.removeSharing);

module.exports = router;
