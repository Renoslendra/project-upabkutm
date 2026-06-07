const express = require("express");
const router = express.Router();
const pimpinanController = require("../controllers/pimpinanController");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Auto-create uploads folder
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir), // Gunakan absolute path
  filename: (req, file, cb) => cb(null, "pimpinan_" + Date.now() + path.extname(file.originalname))
});

// Filter hanya izinkan file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, PNG, WebP, GIF) yang diizinkan'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Maks 5MB
});

// Rute Publik (Tanpa Token)
router.get("/public", pimpinanController.listPublic);

// Rute Admin (Dengan Token)
router.use(verifyToken);
router.get("/", pimpinanController.listPublic); // Gunakan fungsi list yang sama
router.post("/", upload.single("foto"), pimpinanController.create);
router.put("/:id", upload.single("foto"), pimpinanController.update);
router.delete("/:id", pimpinanController.remove);

module.exports = router;