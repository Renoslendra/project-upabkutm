const db = require("../config/db");

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const q = req.query.q ? `%${req.query.q}%` : '%';
  const offset = (page - 1) * limit;
  try {
    const [rows] = await db.query(
      "SELECT * FROM kegiatan WHERE nama_kegiatan LIKE ? OR deskripsi LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [q, q, limit, offset]
    );
    const [countRows] = await db.query("SELECT COUNT(*) as total FROM kegiatan WHERE nama_kegiatan LIKE ? OR deskripsi LIKE ?", [q, q]);
    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (err) {
    console.error("Error list kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: "Kegiatan tidak ditemukan" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error get kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { nama_kegiatan, tanggal, lokasi, deskripsi, image_url, status } = req.body;
  if (!nama_kegiatan || !tanggal || !lokasi) {
    return res.status(400).json({ success: false, message: "nama_kegiatan, tanggal, lokasi wajib diisi" });
  }
  if (nama_kegiatan.length < 3) {
    return res.status(400).json({ success: false, message: "Nama kegiatan minimal 3 karakter" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO kegiatan (nama_kegiatan, tanggal, lokasi, deskripsi, image_url, status) VALUES (?, ?, ?, ?, ?, ?)",
      [nama_kegiatan, tanggal, lokasi, deskripsi || null, image_url || null, status || 'Akan Datang']
    );
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE id = ?", [result.insertId]);
    res.status(201).json({ success: true, message: "Kegiatan berhasil dibuat", data: rows[0] });
  } catch (err) {
    console.error("Error create kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { nama_kegiatan, tanggal, lokasi, deskripsi, image_url, status } = req.body;
  if (!nama_kegiatan || !tanggal || !lokasi) {
    return res.status(400).json({ success: false, message: "nama_kegiatan, tanggal, lokasi wajib diisi" });
  }
  if (nama_kegiatan.length < 3) {
    return res.status(400).json({ success: false, message: "Nama kegiatan minimal 3 karakter" });
  }
  try {
    await db.query(
      "UPDATE kegiatan SET nama_kegiatan = ?, tanggal = ?, lokasi = ?, deskripsi = ?, image_url = ?, status = ? WHERE id = ?",
      [nama_kegiatan, tanggal, lokasi, deskripsi || null, image_url || null, status || 'Akan Datang', id]
    );
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE id = ?", [id]);
    res.json({ success: true, message: "Kegiatan berhasil diupdate", data: rows[0] });
  } catch (err) {
    console.error("Error update kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM kegiatan WHERE id = ?", [id]);
    res.json({ success: true, message: "Kegiatan berhasil dihapus" });
  } catch (err) {
    console.error("Error delete kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
