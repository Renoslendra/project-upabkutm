const express = require("express");
const router = express.Router();
const artikelController = require("../controllers/artikelController");
const verifyToken = require("../middleware/authMiddleware");

// Bebas diakses publik (Tanpa Token)
router.get("/", artikelController.list);
router.get("/:id", artikelController.getById);

// Wajib Login / Akses Admin (Pakai Token)
router.post("/", verifyToken, artikelController.create);
router.put("/:id", verifyToken, artikelController.update);
router.delete("/:id", verifyToken, artikelController.remove);

module.exports = router;