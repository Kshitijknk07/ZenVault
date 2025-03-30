const db = require("../../config/db");

const createFolder = async (folderData) => {
  const { name, userId, parentFolderId, isRoot = false } = folderData;
  const query = `
    INSERT INTO folders (name, user_id, parent_folder_id, is_root) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;
  const values = [name, userId, parentFolderId, isRoot];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getFolderById = async (folderId, userId) => {
  const query = `
    SELECT * FROM folders 
    WHERE id = $1 AND user_id = $2 AND is_trash = false
  `;

  try {
    const result = await db.query(query, [folderId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getRootFolder = async (userId) => {
  const query = `
    SELECT * FROM folders 
    WHERE user_id = $1 AND is_root = true
  `;

  try {
    const result = await db.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getSubfolders = async (parentFolderId, userId) => {
  const query = `
    SELECT * FROM folders 
    WHERE parent_folder_id = $1 AND user_id = $2 AND is_trash = false
    ORDER BY name ASC
  `;

  try {
    const result = await db.query(query, [parentFolderId, userId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const renameFolder = async (folderId, newName, userId) => {
  const query = `
    UPDATE folders 
    SET name = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND user_id = $3
    RETURNING *
  `;

  try {
    const result = await db.query(query, [newName, folderId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const moveFolderToTrash = async (folderId, userId) => {
  const query = `
    UPDATE folders 
    SET is_trash = true, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [folderId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const restoreFolderFromTrash = async (folderId, userId) => {
  const query = `
    UPDATE folders 
    SET is_trash = false, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [folderId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteFolderPermanently = async (folderId, userId) => {
  const query = `
    DELETE FROM folders 
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [folderId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const searchFolders = async (searchTerm, userId) => {
  const query = `
    SELECT * FROM folders 
    WHERE user_id = $1 
    AND is_trash = false
    AND name ILIKE $2
    ORDER BY name ASC
  `;

  try {
    const result = await db.query(query, [userId, `%${searchTerm}%`]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFolder,
  getFolderById,
  getRootFolder,
  getSubfolders,
  renameFolder,
  moveFolderToTrash,
  restoreFolderFromTrash,
  deleteFolderPermanently,
  searchFolders,
};
