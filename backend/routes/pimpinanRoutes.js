const express = require("express");
const router = express.Router();
const pimpinanController = require("../controllers/pimpinanController");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "pimpinan_" + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Rute Publik (Tanpa Token)
router.get("/public", pimpinanController.listPublic);

// Rute Admin (Dengan Token)
router.use(verifyToken);
router.get("/", pimpinanController.listPublic); // Gunakan fungsi list yang sama
router.post("/", upload.single("foto"), pimpinanController.create);
router.put("/:id", upload.single("foto"), pimpinanController.update);
router.delete("/:id", pimpinanController.remove);

module.exports = router;