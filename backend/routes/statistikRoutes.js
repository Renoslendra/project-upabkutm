const express = require("express");
const router = express.Router();
const statistikController = require("../controllers/statistikController");
const verifyToken = require("../middleware/authMiddleware");

// GET semua statistik - publik
router.get("/", statistikController.list);

// POST, PUT, DELETE - hanya untuk admin (perlu token)
router.post("/", verifyToken, statistikController.create);
router.put("/:id", verifyToken, statistikController.update);
router.delete("/:id", verifyToken, statistikController.delete);

module.exports = router;
