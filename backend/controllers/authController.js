const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logAktivitas = require("../config/logAktivitas");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 1. Validasi input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi.",
    });
  }

  try {
    // 2. Cari admin berdasarkan username
    const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
    
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah.",
      });
    }

    const admin = rows[0];

    // 3. Cocokkan password bervariasi hash memakai bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah.",
      });
    }

    // 4. Generate JWT Token (Menggunakan secret dari .env kamu)
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token berlaku selama 1 hari
    );

    // 5. Catat log login & kirim respons sukses
    await logAktivitas({ adminId: admin.id, aksi: 'LOGIN', tabel: 'admin', recordId: admin.id, keterangan: `Login berhasil: ${admin.username}`, ipAddress: req.ip });
    res.status(200).json({
      success: true,
      message: "Login berhasil.",
      token: token,
      admin: {
        id: admin.id,
        username: admin.username,
        nama: admin.nama,
      },
    });
  } catch (error) {
    console.error("Error pada login:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

exports.verify = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token valid.",
    admin: req.admin,
  });
};
