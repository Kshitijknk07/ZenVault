const express = require("express");
const router = express.Router();
const sharingController = require("../../controllers/sharing/sharingController");
const {
  protect,
  extractUser,
} = require("../../middleware/auth/clerkMiddleware");

router.post("/link", protect, extractUser, sharingController.createShareLink);
router.post("/user", protect, extractUser, sharingController.shareWithUser);
router.get("/link/:shareLink", sharingController.getSharedItemByLink);
router.get(
  "/with-me",
  protect,
  extractUser,
  sharingController.getItemsSharedWithMe
);
router.get("/by-me", protect, extractUser, sharingController.getItemsIShared);
router.delete("/:id", protect, extractUser, sharingController.removeSharing);

module.exports = router;
