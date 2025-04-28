const db = require("../../config/db");

const createTag = async (name, userId) => {
  const query = `
    INSERT INTO tags (name, user_id) 
    VALUES ($1, $2) 
    RETURNING *
  `;

  try {
    const result = await db.query(query, [name, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const addTagToFile = async (fileId, tagId) => {
  const query = `
    INSERT INTO file_tags (file_id, tag_id) 
    VALUES ($1, $2) 
    RETURNING *
  `;

  try {
    const result = await db.query(query, [fileId, tagId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getFileTags = async (fileId) => {
  const query = `
    SELECT t.* FROM tags t
    JOIN file_tags ft ON ft.tag_id = t.id
    WHERE ft.file_id = $1
  `;

  try {
    const result = await db.query(query, [fileId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const searchFilesByTag = async (tagName, userId) => {
  const query = `
    SELECT f.* FROM files f
    JOIN file_tags ft ON ft.file_id = f.id
    JOIN tags t ON ft.tag_id = t.id
    WHERE t.name ILIKE $1 AND f.user_id = $2
  `;

  try {
    const result = await db.query(query, [`%${tagName}%`, userId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTag,
  addTagToFile,
  getFileTags,
  searchFilesByTag,
};
