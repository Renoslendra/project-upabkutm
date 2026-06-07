const express = require("express");
const router = express.Router();
const informasiUniversitasController = require("../controllers/informasiUniversitasController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route admin dilindungi JWT. Endpoint publik informasi tersedia di /api/public/informasi-universitas.
router.use(verifyToken);

router.get("/", informasiUniversitasController.list);
router.get("/:id", informasiUniversitasController.getById);
router.post("/", informasiUniversitasController.create);
router.put("/:id", informasiUniversitasController.update);
router.delete("/:id", informasiUniversitasController.remove);

module.exports = router;
