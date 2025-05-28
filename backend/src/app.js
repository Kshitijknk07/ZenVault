const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const fileRoutes = require("./routes/file.routes");
const folderRoutes = require("./routes/folder.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

app.post("/api/files", (req, res) => {
  const { fileName, s3Key, fileSize, folderId } = req.body;

  // Pass folderId to addFile and store it in the DB
  // Your logic to save file metadata and folder association in the database

  res.status(201).send({ message: "File metadata saved successfully" });
});

module.exports = app;
