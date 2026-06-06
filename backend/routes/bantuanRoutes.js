const express = require("express");
const router = express.Router();
const bantuanController = require("../controllers/bantuanController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route di file ini dilindungi oleh JWT
router.use(verifyToken);

// Route untuk Kontak
router.get("/kontak", bantuanController.getKontakAdmin);
router.put("/kontak", bantuanController.updateKontak);

// Route untuk FAQ
router.get("/", bantuanController.list);
router.get("/:id", bantuanController.getById);
router.post("/", bantuanController.create);
router.put("/:id", bantuanController.update);
router.delete("/:id", bantuanController.remove);

module.exports = router;