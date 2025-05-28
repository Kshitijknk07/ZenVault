const pool = require("../config/db");

async function shareFileOrFolder({
  ownerId,
  targetUserId,
  fileId = null,
  folderId = null,
}) {
  const res = await pool.query(
    "INSERT INTO shares (owner_id, target_user_id, file_id, folder_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [ownerId, targetUserId, fileId, folderId]
  );
  return res.rows[0];
}

async function getSharedWithUser(userId) {
  const res = await pool.query(
    "SELECT * FROM shares WHERE target_user_id = $1",
    [userId]
  );
  return res.rows;
}

module.exports = { shareFileOrFolder, getSharedWithUser };
