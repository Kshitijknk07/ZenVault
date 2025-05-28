const {
  shareFileOrFolder,
  getSharedWithUser,
} = require("../models/share.model");

exports.share = async (req, res) => {
  const ownerId = req.user.id;
  const { targetUserId, fileId, folderId } = req.body;
  if (!targetUserId || (!fileId && !folderId)) {
    return res
      .status(400)
      .json({ message: "Missing targetUserId or file/folder to share" });
  }
  const share = await shareFileOrFolder({
    ownerId,
    targetUserId,
    fileId,
    folderId,
  });
  res.status(201).json({ share });
};

exports.listSharedWithMe = async (req, res) => {
  const userId = req.user.id;
  const shares = await getSharedWithUser(userId);
  res.json({ shares });
};
