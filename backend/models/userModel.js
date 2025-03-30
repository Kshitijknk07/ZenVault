const db = require("../config/db");

const createUser = async (userData) => {
  const { username, email, password } = userData;
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
  const values = [username, email, password];

  try {
    const result = await db.query(query, values);
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
  createUser,
  getUserByEmail,
  getUserById,
};
