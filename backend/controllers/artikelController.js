const db = require("../config/db");
const logAktivitas = require("../config/logAktivitas");

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const q = req.query.q ? `%${req.query.q}%` : '%';
  const offset = (page - 1) * limit;
  try {
    const [rows] = await db.query(
      "SELECT * FROM artikel WHERE judul LIKE ? OR konten LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [q, q, limit, offset]
    );
    const [countRows] = await db.query("SELECT COUNT(*) as total FROM artikel WHERE judul LIKE ? OR konten LIKE ?", [q, q]);
    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (err) {
    console.error("Error list artikel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM artikel WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error get artikel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { judul, kategori, excerpt, konten, image_url, status } = req.body;
  if (!judul || !konten) {
    return res.status(400).json({ success: false, message: "judul & konten wajib diisi" });
  }
  if (judul.length < 3) {
    return res.status(400).json({ success: false, message: "Judul minimal 3 karakter" });
  }
  try {
    const adminId = req.admin ? req.admin.id : null;
    const [result] = await db.query(
      "INSERT INTO artikel (judul, kategori, excerpt, konten, image_url, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [judul, kategori || null, excerpt || null, konten, image_url || null, status || 'Draft', adminId]
    );
    const [rows] = await db.query("SELECT * FROM artikel WHERE id = ?", [result.insertId]);
    await logAktivitas({ adminId, aksi: 'CREATE', tabel: 'artikel', recordId: result.insertId, keterangan: `Membuat artikel: ${judul}`, ipAddress: req.ip });
    res.status(201).json({ success: true, message: "Artikel berhasil dibuat", data: rows[0] });
  } catch (err) {
    console.error("Error create artikel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { judul, kategori, excerpt, konten, image_url, status } = req.body;
  if (!judul || !konten) {
    return res.status(400).json({ success: false, message: "judul & konten wajib diisi" });
  }
  if (judul.length < 3) {
    return res.status(400).json({ success: false, message: "Judul minimal 3 karakter" });
  }
  try {
    const adminId = req.admin ? req.admin.id : null;
    await db.query(
      "UPDATE artikel SET judul = ?, kategori = ?, excerpt = ?, konten = ?, image_url = ?, status = ? WHERE id = ?",
      [judul, kategori || null, excerpt || null, konten, image_url || null, status || 'Draft', id]
    );
    const [rows] = await db.query("SELECT * FROM artikel WHERE id = ?", [id]);
    await logAktivitas({ adminId, aksi: 'UPDATE', tabel: 'artikel', recordId: parseInt(id), keterangan: `Mengupdate artikel: ${judul}`, ipAddress: req.ip });
    res.json({ success: true, message: "Artikel berhasil diupdate", data: rows[0] });
  } catch (err) {
    console.error("Error update artikel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const adminId = req.admin ? req.admin.id : null;
    await db.query("DELETE FROM artikel WHERE id = ?", [id]);
    await logAktivitas({ adminId, aksi: 'DELETE', tabel: 'artikel', recordId: parseInt(id), keterangan: `Menghapus artikel id: ${id}`, ipAddress: req.ip });
    res.json({ success: true, message: "Artikel berhasil dihapus" });
  } catch (err) {
    console.error("Error delete artikel:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
