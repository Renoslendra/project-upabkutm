const db = require("../config/db");

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const q = req.query.q ? `%${req.query.q}%` : '%';
  const offset = (page - 1) * limit;
  try {
    const [rows] = await db.query(
      "SELECT * FROM faq WHERE pertanyaan LIKE ? OR jawaban LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [q, q, limit, offset]
    );
    const [countRows] = await db.query("SELECT COUNT(*) as total FROM faq WHERE pertanyaan LIKE ? OR jawaban LIKE ?", [q, q]);
    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (err) {
    console.error("Error list bantuan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM faq WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: "Bantuan tidak ditemukan" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error get bantuan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { pertanyaan, jawaban } = req.body;
  if (!pertanyaan || !jawaban) {
    return res.status(400).json({ success: false, message: "pertanyaan & jawaban wajib diisi" });
  }
  if (pertanyaan.length < 5) {
    return res.status(400).json({ success: false, message: "Pertanyaan minimal 5 karakter" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO faq (pertanyaan, jawaban) VALUES (?, ?)",
      [pertanyaan, jawaban]
    );
    const [rows] = await db.query("SELECT * FROM faq WHERE id = ?", [result.insertId]);
    res.status(201).json({ success: true, message: "Bantuan berhasil dibuat", data: rows[0] });
  } catch (err) {
    console.error("Error create bantuan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { pertanyaan, jawaban } = req.body;
  if (!pertanyaan || !jawaban) {
    return res.status(400).json({ success: false, message: "pertanyaan & jawaban wajib diisi" });
  }
  if (pertanyaan.length < 5) {
    return res.status(400).json({ success: false, message: "Pertanyaan minimal 5 karakter" });
  }
  try {
    await db.query(
      "UPDATE faq SET pertanyaan = ?, jawaban = ? WHERE id = ?",
      [pertanyaan, jawaban, id]
    );
    const [rows] = await db.query("SELECT * FROM faq WHERE id = ?", [id]);
    res.json({ success: true, message: "Bantuan berhasil diupdate", data: rows[0] });
  } catch (err) {
    console.error("Error update bantuan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM faq WHERE id = ?", [id]);
    res.json({ success: true, message: "Bantuan berhasil dihapus" });
  } catch (err) {
    console.error("Error delete bantuan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getKontakAdmin = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kontak ORDER BY updated_at DESC LIMIT 1");
    res.json({ success: true, data: rows[0] || { telepon: "", email: "", jam_layanan: "" } });
  } catch (err) {
    console.error("Error get kontak admin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateKontak = async (req, res) => {
  const { telepon, email, jam_layanan } = req.body;
  if (!telepon || !email || !jam_layanan) {
    return res.status(400).json({ success: false, message: "Semua field kontak wajib diisi" });
  }
  try {
    const [rows] = await db.query("SELECT id FROM kontak LIMIT 1");
    if (rows.length > 0) {
      await db.query(
        "UPDATE kontak SET telepon = ?, email = ?, jam_layanan = ? WHERE id = ?",
        [telepon, email, jam_layanan, rows[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO kontak (telepon, email, jam_layanan) VALUES (?, ?, ?)",
        [telepon, email, jam_layanan]
      );
    }
    res.json({ success: true, message: "Informasi kontak berhasil diperbarui" });
  } catch (err) {
    console.error("Error update kontak:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};