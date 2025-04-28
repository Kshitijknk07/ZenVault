const updateStorageUsage = async (userId, sizeChange) => {
  const query = `
    UPDATE users
    SET storage_used = storage_used + $1
    WHERE id = $2
    RETURNING storage_used, storage_limit
  `;

  try {
    const result = await db.query(query, [sizeChange, userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const checkStorageLimit = async (userId, fileSize) => {
  const query = `
    SELECT storage_used, storage_limit
    FROM users
    WHERE id = $1
  `;

  try {
    const result = await db.query(query, [userId]);
    const { storage_used, storage_limit } = result.rows[0];
    return storage_used + fileSize <= storage_limit;
  } catch (error) {
    throw error;
  }
};

const getUserStorageUsage = async (userId) => {
  const query = `
    SELECT storage_used, storage_limit 
    FROM users 
    WHERE id = $1
  `;

  try {
    const result = await db.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateStorageUsage,
  checkStorageLimit,
  getUserStorageUsage,
};
