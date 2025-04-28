const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/usage", async (req, res) => {
  const { userId } = req.user;
  const result = await db.query(
    "SELECT SUM(size) AS total_size, COUNT(*) AS file_count FROM files WHERE user_id = $1",
    [userId]
  );
  res.json(result.rows[0]);
});

module.exports = router;
