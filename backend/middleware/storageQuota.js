const checkStorageQuota = async (req, res, next) => {
  const { userId } = req.user;
  const { size } = req.file;
  const result = await db.query(
    "SELECT SUM(size) AS total_size FROM files WHERE user_id = $1",
    [userId]
  );
  const totalSize = result.rows[0].total_size || 0;
  if (totalSize + size > 1073741824) {
    return res.status(403).json({ error: "Storage quota exceeded" });
  }
  next();
};

module.exports = { checkStorageQuota };
