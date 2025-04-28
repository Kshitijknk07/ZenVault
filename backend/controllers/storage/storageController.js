const userModel = require("../../models/users/userModel");

const getStorageUsage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storage = await userModel.getUserStorageUsage(userId);

    res.status(200).json({
      storageUsed: storage.storage_used,
      storageLimit: storage.storage_limit,
      percentageUsed: (storage.storage_used / storage.storage_limit) * 100,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStorageUsage,
};
