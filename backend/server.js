const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ZenVault API" });
});

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/files/fileRoutes");
const folderRoutes = require("./routes/folders/folderRoutes");
const sharingRoutes = require("./routes/sharing/sharingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/sharing", sharingRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
