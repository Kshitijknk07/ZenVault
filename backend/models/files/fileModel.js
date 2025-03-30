const db = require("../../config/db");

const createFile = async (fileData) => {
  const { name, originalName, mimeType, size, path, userId, folderId } =
    fileData;
  const query = `
    INSERT INTO files (name, original_name, mime_type, size, path, user_id, folder_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *
  `;
  const values = [name, originalName, mimeType, size, path, userId, folderId];

  try {
    const result = await db.query(query, values);

    await db.query(
      "UPDATE users SET storage_used = storage_used + $1 WHERE id = $2",
      [size, userId]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getFileById = async (fileId, userId) => {
  const query = `
    SELECT * FROM files 
    WHERE id = $1 AND user_id = $2 AND is_trashed = false
  `;

  try {
    const result = await db.query(query, [fileId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getFilesInFolder = async (folderId, userId) => {
  const query = `
    SELECT * FROM files 
    WHERE folder_id = $1 AND user_id = $2 AND is_trashed = false
    ORDER BY created_at DESC
  `;

  try {
    const result = await db.query(query, [folderId, userId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const moveFileToTrash = async (fileId, userId) => {
  const query = `
    UPDATE files 
    SET is_trashed = true, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [fileId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const restoreFileFromTrash = async (fileId, userId) => {
  const query = `
    UPDATE files 
    SET is_trashed = false, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [fileId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteFilePermanently = async (fileId, userId) => {
  const query = `
    DELETE FROM files 
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [fileId, userId]);

    if (result.rows[0]) {
      await db.query(
        "UPDATE users SET storage_used = storage_used - $1 WHERE id = $2",
        [result.rows[0].size, userId]
      );
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const searchFiles = async (searchTerm, userId) => {
  const query = `
    SELECT * FROM files 
    WHERE user_id = $1 
    AND is_trashed = false
    AND name ILIKE $2
    ORDER BY created_at DESC
  `;

  try {
    const result = await db.query(query, [userId, `%${searchTerm}%`]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getFilesByType = async (mimeType, userId) => {
  const query = `
    SELECT * FROM files 
    WHERE user_id = $1 
    AND is_trashed = false
    AND mime_type LIKE $2
    ORDER BY created_at DESC
  `;

  try {
    const result = await db.query(query, [userId, `${mimeType}%`]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const createFileVersion = async (fileId, versionNumber, path, size) => {
  const query = `
    INSERT INTO file_versions (file_id, version_number, path, size) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;

  try {
    const result = await db.query(query, [fileId, versionNumber, path, size]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getFileVersions = async (fileId) => {
  const query = `
    SELECT * FROM file_versions 
    WHERE file_id = $1
    ORDER BY version_number DESC
  `;

  try {
    const result = await db.query(query, [fileId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFile,
  getFileById,
  getFilesInFolder,
  moveFileToTrash,
  restoreFileFromTrash,
  deleteFilePermanently,
  searchFiles,
  getFilesByType,
  createFileVersion,
  getFileVersions,
};
