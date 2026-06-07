require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

// 1. Import Semua Routes
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");

const artikelRoutes = require("./routes/artikelRoutes");
const kegiatanRoutes = require("./routes/kegiatanRoutes");
const bantuanRoutes = require("./routes/bantuanRoutes");
const statistikRoutes = require("./routes/statistikRoutes");
const profilRoutes = require("./routes/profilRoutes");
const informasiUniversitasRoutes = require("./routes/informasiUniversitasRoutes");
const pimpinanRoutes = require('./routes/pimpinanRoutes');

// Jika kamu menggunakan file manajemenAdminRoutes.js untuk kelola admin
const adminRoutes = require("./routes/manajemenAdminRoutes"); 

const app = express();

// 2. Middleware Global
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); // Untuk menerima request berupa JSON
app.use(express.urlencoded({ extended: true })); // Untuk menerima form-data (seperti upload file)

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit.",
  },
});

// 3. Expose Folder Uploads ke Publik
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. Daftarkan Semua Routing

// API Publik & Auth
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);

// API Admin
app.use("/api/admin/artikel", artikelRoutes);
app.use("/api/admin/kegiatan", kegiatanRoutes);
app.use("/api/admin/bantuan", bantuanRoutes);
app.use("/api/admin/statistik", statistikRoutes);
app.use("/api/admin/profil", profilRoutes);
app.use("/api/admin/informasi-universitas", informasiUniversitasRoutes);
app.use('/api/pimpinan', pimpinanRoutes);

// Jika ada rute khusus untuk manajemen admin (tambah/hapus akun admin)
app.use("/api/admin/manajemen", adminRoutes);

// 5. Global Error Handler (harus di paling bawah, sebelum app.listen)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }

  if (err.message && err.message.includes("Hanya file gambar")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Terjadi kesalahan pada server'
      : err.message || 'Internal Server Error'
  });
});

// 6. Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
