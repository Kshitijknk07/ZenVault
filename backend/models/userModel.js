const db = require("../config/db");

const createUserFromClerk = async (userData) => {
  const { clerkId, username, email } = userData;
  const query =
    "INSERT INTO users (clerk_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [clerkId, username, email, "clerk-auth-user"];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserByClerkId = async (clerkId) => {
  const query = "SELECT * FROM users WHERE clerk_id = $1";

  try {
    const result = await db.query(query, [clerkId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";

  try {
    const result = await db.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";

  try {
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserFromClerk,
  getUserByClerkId,
  getUserByEmail,
  getUserById,
};
