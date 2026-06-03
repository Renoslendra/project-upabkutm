const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const q = req.query.q ? `%${req.query.q}%` : '%';
  const offset = (page - 1) * limit;
  try {
    const [rows] = await db.query(
      "SELECT id, username, nama, email, created_at FROM admin WHERE nama LIKE ? OR username LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [q, q, limit, offset]
    );
    const [countRows] = await db.query("SELECT COUNT(*) as total FROM admin WHERE nama LIKE ? OR username LIKE ?", [q, q]);
    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (err) {
    console.error("Error list admin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT id, username, nama, email, created_at FROM admin WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: "Admin tidak ditemukan" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error get admin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { username, password, nama, email } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "username & password wajib diisi" });
  }
  if (username.length < 3) {
    return res.status(400).json({ success: false, message: "Username minimal 3 karakter" });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password minimal 6 karakter" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO admin (username, password, nama, email) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, nama || null, email || null]
    );
    const [rows] = await db.query("SELECT id, username, nama, email, created_at FROM admin WHERE id = ?", [result.insertId]);
    res.status(201).json({ success: true, message: "Admin berhasil dibuat", data: rows[0] });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: "Username sudah ada" });
    }
    console.error("Error create admin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { nama, email } = req.body;
  // Note: tidak bisa update password lewat endpoint ini untuk keamanan
  try {
    await db.query(
      "UPDATE admin SET nama = ?, email = ? WHERE id = ?",
      [nama || null, email || null, id]
    );
    const [rows] = await db.query("SELECT id, username, nama, email, created_at FROM admin WHERE id = ?", [id]);
    res.json({ success: true, message: "Admin berhasil diupdate", data: rows[0] });
  } catch (err) {
    console.error("Error update admin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM admin WHERE id = ?", [id]);
    res.json({ success: true, message: "Admin berhasil dihapus" });
  } catch (err) {
    console.error("Error delete admin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
