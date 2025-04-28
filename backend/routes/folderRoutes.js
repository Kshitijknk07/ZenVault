const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/create", async (req, res) => {
  const { name, parentFolderId, userId } = req.body;
  const result = await db.query(
    "INSERT INTO folders (name, parent_folder_id, user_id) VALUES ($1, $2, $3) RETURNING *",
    [name, parentFolderId, userId]
  );
  res.json(result.rows[0]);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM folders WHERE id = $1", [id]);
  res.sendStatus(204);
});

router.put("/rename/:id", async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  const result = await db.query(
    "UPDATE folders SET name = $1 WHERE id = $2 RETURNING *",
    [newName, id]
  );
  res.json(result.rows[0]);
});

router.put("/move/:id", async (req, res) => {
  const { id } = req.params;
  const { newParentFolderId } = req.body;
  const result = await db.query(
    "UPDATE folders SET parent_folder_id = $1 WHERE id = $2 RETURNING *",
    [newParentFolderId, id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
