const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // 1. Tambahkan ini

// 2. Tambahkan logika untuk mengecek dan membuat folder otomatis
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfigurasi Multer untuk simpan file gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Disimpan ke folder uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  }
});
const upload = multer({ storage: storage });

router.use(verifyToken);

router.put("/visi-misi", profilController.updateVisiMisi);
// Gunakan upload.single("foto") untuk menerima 1 file dengan nama field "foto"
router.put("/kepala", upload.single("foto"), profilController.updateKepala);
router.post("/staff", upload.single("foto"), profilController.createStaff);
router.put("/staff/:id", upload.single("foto"), profilController.updateStaff);
router.delete("/staff/:id", profilController.deleteStaff);

module.exports = router;