const pool = require("../config/db");

async function createFolder({ userId, name, parentId = null }) {
  const res = await pool.query(
    "INSERT INTO folders (user_id, name, parent_id) VALUES ($1, $2, $3) RETURNING *",
    [userId, name, parentId]
  );
  return res.rows[0];
}

async function listFoldersByUser(userId, parentId = null) {
  const res = await pool.query(
    "SELECT * FROM folders WHERE user_id = $1 AND parent_id IS NOT DISTINCT FROM $2 ORDER BY name",
    [userId, parentId]
  );
  return res.rows;
}

async function renameFolder(userId, folderId, newName) {
  const res = await pool.query(
    "UPDATE folders SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [newName, folderId, userId]
  );
  return res.rows[0];
}

async function deleteFolder(userId, folderId) {
  const res = await pool.query(
    "DELETE FROM folders WHERE id = $1 AND user_id = $2 RETURNING *",
    [folderId, userId]
  );
  return res.rows[0];
}

module.exports = {
  createFolder,
  listFoldersByUser,
  renameFolder,
  deleteFolder,
};
