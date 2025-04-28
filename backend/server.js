const express = require("express");
const fileRoutes = require("./routes/fileRoutes");
const folderRoutes = require("./routes/folderRoutes");
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
