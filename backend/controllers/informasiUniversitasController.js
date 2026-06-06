const db = require("../config/db");

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const q = req.query.q ? `%${req.query.q}%` : '%';
  const offset = (page - 1) * limit;
  try {
    const [rows] = await db.query(
      "SELECT * FROM informasi_universitas WHERE judul LIKE ? OR deskripsi LIKE ? OR kategori LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [q, q, q, limit, offset]
    );
    const [countRows] = await db.query(
      "SELECT COUNT(*) as total FROM informasi_universitas WHERE judul LIKE ? OR deskripsi LIKE ? OR kategori LIKE ?",
      [q, q, q]
    );
    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (err) {
    console.error("Error list informasi universitas:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM informasi_universitas WHERE id = ?", [id]);
    if (!rows.length)
      return res
        .status(404)
        .json({ success: false, message: "Informasi universitas tidak ditemukan" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error get informasi universitas:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { judul, deskripsi, kategori, link_edaran, status } = req.body;
  if (!judul || !deskripsi || !kategori) {
    return res.status(400).json({
      success: false,
      message: "judul, deskripsi & kategori wajib diisi",
    });
  }
  if (judul.length < 3) {
    return res
      .status(400)
      .json({ success: false, message: "Judul minimal 3 karakter" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO informasi_universitas (judul, deskripsi, kategori, link_edaran, status) VALUES (?, ?, ?, ?, ?)",
      [judul, deskripsi, kategori, link_edaran || null, status || 'Aktif']
    );
    const [rows] = await db.query("SELECT * FROM informasi_universitas WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json({
      success: true,
      message: "Informasi universitas berhasil dibuat",
      data: rows[0],
    });
  } catch (err) {
    console.error("Error create informasi universitas:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { judul, deskripsi, kategori, link_edaran, status } = req.body;
  if (!judul || !deskripsi || !kategori) {
    return res.status(400).json({
      success: false,
      message: "judul, deskripsi & kategori wajib diisi",
    });
  }
  if (judul.length < 3) {
    return res
      .status(400)
      .json({ success: false, message: "Judul minimal 3 karakter" });
  }
  try {
    await db.query(
      "UPDATE informasi_universitas SET judul = ?, deskripsi = ?, kategori = ?, link_edaran = ?, status = ? WHERE id = ?",
      [judul, deskripsi, kategori, link_edaran || null, status || 'Aktif', id]
    );
    const [rows] = await db.query("SELECT * FROM informasi_universitas WHERE id = ?", [id]);
    res.json({
      success: true,
      message: "Informasi universitas berhasil diupdate",
      data: rows[0],
    });
  } catch (err) {
    console.error("Error update informasi universitas:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM informasi_universitas WHERE id = ?", [id]);
    res.json({ success: true, message: "Informasi universitas berhasil dihapus" });
  } catch (err) {
    console.error("Error delete informasi universitas:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
