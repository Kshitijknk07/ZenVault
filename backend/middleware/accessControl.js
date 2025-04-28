const checkFileAccess = async (req, res, next) => {
  const { fileId } = req.params;
  const { userId } = req.user;
  const file = await db.query(
    "SELECT * FROM files WHERE id = $1 AND user_id = $2",
    [fileId, userId]
  );
  if (!file.rows.length) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = { checkFileAccess };
