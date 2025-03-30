const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

const createShareLink = async (shareData) => {
  const { itemType, itemId, ownerId, permission, isPublic, expiresAt } =
    shareData;
  const shareLink = uuidv4();

  const query = `
    INSERT INTO shared_items (item_type, item_id, owner_id, permission, is_public, share_link, expires_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *
  `;
  const values = [
    itemType,
    itemId,
    ownerId,
    permission,
    isPublic,
    shareLink,
    expiresAt,
  ];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const shareWithUser = async (shareData) => {
  const { itemType, itemId, ownerId, sharedWithId, permission } = shareData;

  const query = `
    INSERT INTO shared_items (item_type, item_id, owner_id, shared_with_id, permission) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  const values = [itemType, itemId, ownerId, sharedWithId, permission];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getSharedItemByLink = async (shareLink) => {
  const query = `
    SELECT si.*, 
           CASE 
             WHEN si.item_type = 'file' THEN json_build_object('id', f.id, 'name', f.name, 'mime_type', f.mime_type, 'size', f.size, 'path', f.path)
             WHEN si.item_type = 'folder' THEN json_build_object('id', fo.id, 'name', fo.name)
           END as item_details
    FROM shared_items si
    LEFT JOIN files f ON si.item_type = 'file' AND si.item_id = f.id
    LEFT JOIN folders fo ON si.item_type = 'folder' AND si.item_id = fo.id
    WHERE si.share_link = $1
    AND (si.expires_at IS NULL OR si.expires_at > CURRENT_TIMESTAMP)
  `;

  try {
    const result = await db.query(query, [shareLink]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getItemsSharedWithUser = async (userId) => {
  const query = `
    SELECT si.*, 
           CASE 
             WHEN si.item_type = 'file' THEN json_build_object('id', f.id, 'name', f.name, 'mime_type', f.mime_type, 'size', f.size, 'path', f.path)
             WHEN si.item_type = 'folder' THEN json_build_object('id', fo.id, 'name', fo.name)
           END as item_details,
           u.username as owner_name
    FROM shared_items si
    LEFT JOIN files f ON si.item_type = 'file' AND si.item_id = f.id
    LEFT JOIN folders fo ON si.item_type = 'folder' AND si.item_id = fo.id
    LEFT JOIN users u ON si.owner_id = u.id
    WHERE si.shared_with_id = $1
    AND (si.expires_at IS NULL OR si.expires_at > CURRENT_TIMESTAMP)
  `;

  try {
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getItemsSharedByUser = async (userId) => {
  const query = `
    SELECT si.*, 
           CASE 
             WHEN si.item_type = 'file' THEN json_build_object('id', f.id, 'name', f.name, 'mime_type', f.mime_type, 'size', f.size)
             WHEN si.item_type = 'folder' THEN json_build_object('id', fo.id, 'name', fo.name)
           END as item_details,
           u.username as shared_with_name
    FROM shared_items si
    LEFT JOIN files f ON si.item_type = 'file' AND si.item_id = f.id
    LEFT JOIN folders fo ON si.item_type = 'folder' AND si.item_id = fo.id
    LEFT JOIN users u ON si.shared_with_id = u.id
    WHERE si.owner_id = $1
    AND (si.expires_at IS NULL OR si.expires_at > CURRENT_TIMESTAMP)
  `;

  try {
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const removeSharing = async (shareId, userId) => {
  const query = `
    DELETE FROM shared_items 
    WHERE id = $1 AND owner_id = $2
    RETURNING *
  `;

  try {
    const result = await db.query(query, [shareId, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createShareLink,
  shareWithUser,
  getSharedItemByLink,
  getItemsSharedWithUser,
  getItemsSharedByUser,
  removeSharing,
};
