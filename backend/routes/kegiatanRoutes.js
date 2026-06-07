const express = require("express");
const router = express.Router();
const kegiatanController = require("../controllers/kegiatanController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route admin dilindungi JWT. Endpoint publik kegiatan tersedia di /api/public/kegiatan.
router.use(verifyToken);

router.get("/", kegiatanController.list);
router.get("/:id", kegiatanController.getById);
router.post("/", kegiatanController.create);
router.put("/:id", kegiatanController.update);
router.delete("/:id", kegiatanController.remove);

module.exports = router;
