const express = require("express");
const router = express.Router();
const informasiUniversitasController = require("../controllers/informasiUniversitasController");
const verifyToken = require("../middleware/authMiddleware");

// Bebas diakses publik (Tanpa Token)
router.get("/", informasiUniversitasController.list);
router.get("/:id", informasiUniversitasController.getById);

// Wajib Login / Akses Admin (Pakai Token)
router.post("/", verifyToken, informasiUniversitasController.create);
router.put("/:id", verifyToken, informasiUniversitasController.update);
router.delete("/:id", verifyToken, informasiUniversitasController.remove);

module.exports = router;
