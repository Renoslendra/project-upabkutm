const db = require("../config/db");

exports.listPublishedArtikel = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const q = req.query.q ? `%${req.query.q}%` : "%";
  const kategori = req.query.kategori;
  const offset = (page - 1) * limit;

  try {
    const kategoriClause = kategori && kategori !== 'Semua' ? " AND kategori = ?" : "";
    const params = kategori && kategori !== 'Semua'
      ? [q, q, q, kategori, limit, offset]
      : [q, q, q, limit, offset];
    const countParams = kategori && kategori !== 'Semua'
      ? [q, q, q, kategori]
      : [q, q, q];

    const [rows] = await db.query(
      `SELECT id, judul, kategori, excerpt, konten, image_url, views, status, created_at FROM artikel WHERE status = 'Published' AND (judul LIKE ? OR konten LIKE ? OR kategori LIKE ?)${kategoriClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params
    );
    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM artikel WHERE status = 'Published' AND (judul LIKE ? OR konten LIKE ? OR kategori LIKE ?)${kategoriClause}`,
      countParams
    );

    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (error) {
    console.error("Error list public artikel:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getArtikelById = async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT id, judul, kategori, excerpt, konten, image_url, views, status, created_at FROM artikel WHERE id = ? AND status = 'Published'",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error get public artikel:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listKegiatan = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const q = req.query.q ? `%${req.query.q}%` : "%";
  const status = req.query.status;
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
  const offset = (page - 1) * limit;

  try {
    const statusClause = status ? " AND status = ?" : "";
    const params = status ? [q, q, status, limit, offset] : [q, q, limit, offset];
    const countParams = status ? [q, q, status] : [q, q];

    const [rows] = await db.query(
      `SELECT id, nama_kegiatan, tanggal, lokasi, deskripsi, content_link, image_url, status, created_at FROM kegiatan WHERE (nama_kegiatan LIKE ? OR deskripsi LIKE ?)${statusClause} ORDER BY created_at ${order} LIMIT ? OFFSET ?`,
      params
    );
    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM kegiatan WHERE (nama_kegiatan LIKE ? OR deskripsi LIKE ?)${statusClause}`,
      countParams
    );

    res.json({ success: true, data: rows, total: countRows[0].total });
  } catch (error) {
    console.error("Error list public kegiatan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listFaq = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, pertanyaan, jawaban, created_at FROM faq ORDER BY created_at DESC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error list public faq:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getKontak = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, telepon, email, jam_layanan, updated_at FROM kontak ORDER BY updated_at DESC LIMIT 1"
    );

    res.json({ success: true, data: rows[0] || null });
  } catch (error) {
    console.error("Error get public kontak:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listStatistik = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, prodi, total, konseling, selesai, created_at, updated_at FROM statistik ORDER BY prodi ASC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error list public statistik:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listVisiMisi = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, kategori, konten, urutan, updated_at FROM profil_visi_misi ORDER BY FIELD(kategori, 'visi', 'misi', 'tujuan'), urutan ASC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error list public visi misi:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listStruktur = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, kategori, nama, role, spesialisasi, bio, foto_url, created_at, updated_at FROM struktur_organisasi ORDER BY FIELD(kategori, 'kepala', 'staff'), created_at ASC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error list public struktur:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listInformasiUniversitas = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, judul, deskripsi, kategori, link_edaran, status, created_at, updated_at FROM informasi_universitas WHERE status = 'Aktif' ORDER BY created_at DESC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error list public informasi universitas:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
