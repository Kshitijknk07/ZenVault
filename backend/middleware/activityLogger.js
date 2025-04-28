const logActivity = async (req, res, next) => {
  const { userId } = req.user;
  const { method, originalUrl } = req;
  await db.query(
    "INSERT INTO activity_logs (user_id, action, details) VALUES ($1, $2, $3)",
    [userId, method, originalUrl]
  );
  next();
};

module.exports = { logActivity };
