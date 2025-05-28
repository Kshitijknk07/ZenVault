const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const shareController = require("../controllers/share.controller");

const router = express.Router();

router.post("/", authenticateToken, shareController.share);
router.get("/", authenticateToken, shareController.listSharedWithMe);

module.exports = router;

const shareRoutes = require("./routes/share.routes");
app.use("/api/shares", shareRoutes);
