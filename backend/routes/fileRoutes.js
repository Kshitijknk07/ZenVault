const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { folderId, userId } = req.body;
  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const result = await db.query(
    "INSERT INTO files (name, path, folder_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [fileName, filePath, folderId, userId]
  );
  res.json(result.rows[0]);
});

router.get("/download/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM files WHERE id = $1", [id]);
  const file = result.rows[0];
  res.download(file.path, file.name);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM files WHERE id = $1", [id]);
  res.sendStatus(204);
});

router.put("/rename/:id", async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  const result = await db.query(
    "UPDATE files SET name = $1 WHERE id = $2 RETURNING *",
    [newName, id]
  );
  res.json(result.rows[0]);
});

router.put("/move/:id", async (req, res) => {
  const { id } = req.params;
  const { newFolderId } = req.body;
  const result = await db.query(
    "UPDATE files SET folder_id = $1 WHERE id = $2 RETURNING *",
    [newFolderId, id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
