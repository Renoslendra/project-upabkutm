const db = require("../config/db");
const logAktivitas = require("../config/logAktivitas");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

exports.listPublic = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pimpinan_universitas ORDER BY urutan ASC");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.create = async (req, res) => {
  const { nama, role, urutan } = req.body;
  let foto_url = "";
  if (req.file) foto_url = `${BASE_URL}/uploads/${req.file.filename}`;

  try {
    const [result] = await db.query(
      "INSERT INTO pimpinan_universitas (nama, role, urutan, foto_url) VALUES (?, ?, ?, ?)",
      [nama, role, urutan || 1, foto_url]
    );
    res.status(201).json({ success: true, message: "Data pimpinan berhasil ditambahkan" });
    const adminId = req.admin ? req.admin.id : null;
    await logAktivitas({ adminId, aksi: 'CREATE', tabel: 'pimpinan_universitas', recordId: result.insertId, keterangan: `Menambah pimpinan: ${nama}`, ipAddress: req.ip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { nama, role, urutan } = req.body;
  let foto_url = req.body.foto_url_lama || "";
  if (req.file) foto_url = `${BASE_URL}/uploads/${req.file.filename}`;

  try {
    await db.query(
      "UPDATE pimpinan_universitas SET nama=?, role=?, urutan=?, foto_url=? WHERE id=?",
      [nama, role, urutan || 1, foto_url, id]
    );
    res.json({ success: true, message: "Data pimpinan berhasil diupdate" });
    const adminId = req.admin ? req.admin.id : null;
    await logAktivitas({ adminId, aksi: 'UPDATE', tabel: 'pimpinan_universitas', recordId: parseInt(id), keterangan: `Mengupdate pimpinan: ${nama}`, ipAddress: req.ip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query("DELETE FROM pimpinan_universitas WHERE id=?", [req.params.id]);
    const adminId = req.admin ? req.admin.id : null;
    await logAktivitas({ adminId, aksi: 'DELETE', tabel: 'pimpinan_universitas', recordId: parseInt(req.params.id), keterangan: `Menghapus pimpinan id: ${req.params.id}`, ipAddress: req.ip });
    res.json({ success: true, message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};