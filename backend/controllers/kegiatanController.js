const db = require("../config/db");
const logAktivitas = require("../config/logAktivitas");

const VALID_STATUSES = new Set(["Akan Datang", "Selesai"]);

function requiredText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(value) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text || null;
}

function normalizeOptionalUrl(value) {
  const text = optionalText(value);
  if (!text) return null;

  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(text) ? text : `https://${text}`;

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function kegiatanPayload(body = {}) {
  const nama_kegiatan = requiredText(body.nama_kegiatan);
  const tanggal = requiredText(body.tanggal);
  const lokasi = requiredText(body.lokasi);
  const deskripsi = optionalText(body.deskripsi);
  const content_link = normalizeOptionalUrl(body.content_link);
  const image_url = optionalText(body.image_url);
  const status = optionalText(body.status) || "Akan Datang";

  if (!nama_kegiatan || !tanggal || !lokasi) {
    return { error: "nama_kegiatan, tanggal, lokasi wajib diisi" };
  }

  if (nama_kegiatan.length < 3) {
    return { error: "Nama kegiatan minimal 3 karakter" };
  }

  if (optionalText(body.content_link) && !content_link) {
    return { error: "Link detail kegiatan harus berupa URL http atau https yang valid" };
  }

  if (!VALID_STATUSES.has(status)) {
    return { error: "Status kegiatan tidak valid" };
  }

  return {
    data: {
      nama_kegiatan,
      tanggal,
      lokasi,
      deskripsi,
      content_link,
      image_url,
      status,
    },
  };
}

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
  const payload = kegiatanPayload(req.body);
  if (payload.error) return res.status(400).json({ success: false, message: payload.error });

  const { nama_kegiatan, tanggal, lokasi, deskripsi, content_link, image_url, status } = payload.data;

  try {
    const adminId = req.admin ? req.admin.id : null;
    const [result] = await db.query(
      "INSERT INTO kegiatan (nama_kegiatan, tanggal, lokasi, deskripsi, content_link, image_url, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nama_kegiatan, tanggal, lokasi, deskripsi || null, content_link || null, image_url || null, status || 'Akan Datang', adminId]
    );
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE id = ?", [result.insertId]);
    await logAktivitas({ adminId, aksi: 'CREATE', tabel: 'kegiatan', recordId: result.insertId, keterangan: `Membuat kegiatan: ${nama_kegiatan}`, ipAddress: req.ip });
    res.status(201).json({ success: true, message: "Kegiatan berhasil dibuat", data: rows[0] });
  } catch (err) {
    console.error("Error create kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const payload = kegiatanPayload(req.body);
  if (payload.error) return res.status(400).json({ success: false, message: payload.error });

  const { nama_kegiatan, tanggal, lokasi, deskripsi, content_link, image_url, status } = payload.data;

  try {
    const adminId = req.admin ? req.admin.id : null;
    const [result] = await db.query(
      "UPDATE kegiatan SET nama_kegiatan = ?, tanggal = ?, lokasi = ?, deskripsi = ?, content_link = ?, image_url = ?, status = ? WHERE id = ?",
      [nama_kegiatan, tanggal, lokasi, deskripsi || null, content_link || null, image_url || null, status || 'Akan Datang', id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Kegiatan tidak ditemukan" });
    }
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE id = ?", [id]);
    await logAktivitas({ adminId, aksi: 'UPDATE', tabel: 'kegiatan', recordId: parseInt(id), keterangan: `Mengupdate kegiatan: ${nama_kegiatan}`, ipAddress: req.ip });
    res.json({ success: true, message: "Kegiatan berhasil diupdate", data: rows[0] });
  } catch (err) {
    console.error("Error update kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const adminId = req.admin ? req.admin.id : null;
    const [result] = await db.query("DELETE FROM kegiatan WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Kegiatan tidak ditemukan" });
    }
    await logAktivitas({ adminId, aksi: 'DELETE', tabel: 'kegiatan', recordId: parseInt(id), keterangan: `Menghapus kegiatan id: ${id}`, ipAddress: req.ip });
    res.json({ success: true, message: "Kegiatan berhasil dihapus" });
  } catch (err) {
    console.error("Error delete kegiatan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
