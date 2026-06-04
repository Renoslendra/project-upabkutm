const express = require("express");
const router = express.Router();
const kegiatanController = require("../controllers/kegiatanController");
const verifyToken = require("../middleware/authMiddleware");

// Bebas diakses publik (Tanpa Token)
router.get("/", kegiatanController.list);
router.get("/:id", kegiatanController.getById);

// Wajib Login / Akses Admin (Pakai Token)
router.post("/", verifyToken, kegiatanController.create);
router.put("/:id", verifyToken, kegiatanController.update);
router.delete("/:id", verifyToken, kegiatanController.remove);

module.exports = router;