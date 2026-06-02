require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("./config/db");

async function createAdmin() {
  try {
    // 1. Kita suruh bcrypt membuat hash password "admin123"
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 2. Kita hapus semua isi tabel admin yang lama/error
    await db.query("TRUNCATE TABLE admin");

    // 3. Kita masukkan admin baru dengan password yang sudah di-hash secara akurat
    await db.query(
      "INSERT INTO admin (username, password, nama) VALUES (?, ?, ?)",
      ["admin", hashedPassword, "Admin UPA-BK"]
    );

    console.log("SUKSES! Akun admin berhasil dibuat ke database.");
    console.log("Username : admin");
    console.log("Password : admin123");
    process.exit();
  } catch (error) {
    console.error("❌ Terjadi Error:", error);
    process.exit(1);
  }
}

createAdmin();