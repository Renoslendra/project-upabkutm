require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// 1. Import Semua Routes
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");

const artikelRoutes = require("./routes/artikelRoutes");
const kegiatanRoutes = require("./routes/kegiatanRoutes");
const bantuanRoutes = require("./routes/bantuanRoutes");
const statistikRoutes = require("./routes/statistikRoutes");
const profilRoutes = require("./routes/profilRoutes");
const informasiUniversitasRoutes = require("./routes/informasiUniversitasRoutes");

// Jika kamu menggunakan file manajemenAdminRoutes.js untuk kelola admin
const adminRoutes = require("./routes/manajemenAdminRoutes"); 

const app = express();

// 2. Middleware Global
app.use(cors());
app.use(express.json()); // Untuk menerima request berupa JSON
app.use(express.urlencoded({ extended: true })); // Untuk menerima form-data (seperti upload file)

// 3. Expose Folder Uploads ke Publik
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. Daftarkan Semua Routing

// API Publik & Auth
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);

// API Admin
app.use("/api/admin/artikel", artikelRoutes);
app.use("/api/admin/kegiatan", kegiatanRoutes);
app.use("/api/admin/bantuan", bantuanRoutes);
app.use("/api/admin/statistik", statistikRoutes);
app.use("/api/admin/profil", profilRoutes);
app.use("/api/admin/informasi-universitas", informasiUniversitasRoutes);

// Jika ada rute khusus untuk manajemen admin (tambah/hapus akun admin)
app.use("/api/admin/manajemen", adminRoutes);

// 5. Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});