const pool = require("../config/db");

async function addFile({ userId, fileName, s3Key, fileSize }) {
  const res = await pool.query(
    "INSERT INTO files (user_id, file_name, s3_key, file_size) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, fileName, s3Key, fileSize]
  );
  return res.rows[0];
}

async function listFilesByUser(userId) {
  const res = await pool.query(
    "SELECT id, file_name, s3_key, file_size, uploaded_at FROM files WHERE user_id = $1 ORDER BY uploaded_at DESC",
    [userId]
  );
  return res.rows;
}

async function deleteFileById(userId, fileId) {
  const res = await pool.query(
    "DELETE FROM files WHERE id = $1 AND user_id = $2 RETURNING *",
    [fileId, userId]
  );
  return res.rows[0];
}

async function renameFileById(userId, fileId, newName) {
  const res = await pool.query(
    "UPDATE files SET file_name = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [newName, fileId, userId]
  );
  return res.rows[0];
}

module.exports = {
  addFile,
  listFilesByUser,
  deleteFileById,
  renameFileById,
};
