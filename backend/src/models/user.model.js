const pool = require("../config/db");

async function findUserByEmail(email) {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
}

async function createUser(email, hashedPassword) {
  const res = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
  );
  return res.rows[0];
}

async function updateUserPassword(email, hashedPassword) {
  await pool.query("UPDATE users SET password = $1 WHERE email = $2", [
    hashedPassword,
    email,
  ]);
}

async function setResetToken(email, token, expiry) {
  await pool.query(
    "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
    [token, expiry, email]
  );
}

async function findUserByResetToken(token) {
  const res = await pool.query(
    "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()",
    [token]
  );
  return res.rows[0];
}

async function clearResetToken(email) {
  await pool.query(
    "UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE email = $1",
    [email]
  );
}

module.exports = {
  findUserByEmail,
  createUser,
  updateUserPassword,
  setResetToken,
  findUserByResetToken,
  clearResetToken,
};
