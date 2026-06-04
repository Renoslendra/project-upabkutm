const db = require("../config/db");

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, prodi, total, konseling, selesai, created_at, updated_at FROM statistik ORDER BY prodi ASC"
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Error list statistik:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { prodi, total, konseling, selesai } = req.body;
  
  if (!prodi || !prodi.trim()) {
    return res.status(400).json({ success: false, message: "Nama prodi wajib diisi" });
  }
  
  try {
    const [result] = await db.query(
      "INSERT INTO statistik (prodi, total, konseling, selesai) VALUES (?, ?, ?, ?)",
      [prodi.trim(), total || 0, konseling || 0, selesai || 0]
    );
    
    const [rows] = await db.query(
      "SELECT id, prodi, total, konseling, selesai, created_at, updated_at FROM statistik WHERE id = ?",
      [result.insertId]
    );
    
    res.status(201).json({ success: true, message: "Statistik prodi berhasil ditambahkan", data: rows[0] });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: "Program studi ini sudah ada" });
    }
    console.error("Error create statistik:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { prodi, total, konseling, selesai } = req.body;
  
  if (!prodi || !prodi.trim()) {
    return res.status(400).json({ success: false, message: "Nama prodi wajib diisi" });
  }
  
  try {
    await db.query(
      "UPDATE statistik SET prodi = ?, total = ?, konseling = ?, selesai = ? WHERE id = ?",
      [prodi.trim(), total || 0, konseling || 0, selesai || 0, id]
    );
    
    const [rows] = await db.query(
      "SELECT id, prodi, total, konseling, selesai, created_at, updated_at FROM statistik WHERE id = ?",
      [id]
    );
    
    if (!rows.length) {
      return res.status(404).json({ success: false, message: "Statistik prodi tidak ditemukan" });
    }
    
    res.json({ success: true, message: "Statistik prodi berhasil diperbarui", data: rows[0] });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: "Program studi ini sudah ada" });
    }
    console.error("Error update statistik:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const [result] = await db.query("DELETE FROM statistik WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Statistik prodi tidak ditemukan" });
    }
    
    res.json({ success: true, message: "Statistik prodi berhasil dihapus" });
  } catch (err) {
    console.error("Error delete statistik:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
