const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.put("/trash/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("UPDATE files SET is_trashed = true WHERE id = $1", [id]);
  res.sendStatus(204);
});

router.put("/restore/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("UPDATE files SET is_trashed = false WHERE id = $1", [id]);
  res.sendStatus(204);
});

router.get("/trash", async (req, res) => {
  const { userId } = req.user;
  const result = await db.query(
    "SELECT * FROM files WHERE user_id = $1 AND is_trashed = true",
    [userId]
  );
  res.json(result.rows);
});

module.exports = router;
