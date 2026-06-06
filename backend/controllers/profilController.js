const db = require("../config/db");

// 1. Update Visi Misi & Tujuan
exports.updateVisiMisi = async (req, res) => {
  const { visi, misi, tujuan } = req.body;
  try {
    await db.query("DELETE FROM profil_visi_misi");
    
    if (visi) await db.query("INSERT INTO profil_visi_misi (kategori, konten, urutan) VALUES (?, ?, ?)", ["visi", visi, 1]);
    
    if (misi && misi.length > 0) {
      for (let i = 0; i < misi.length; i++) {
        await db.query("INSERT INTO profil_visi_misi (kategori, konten, urutan) VALUES (?, ?, ?)", ["misi", misi[i], i + 1]);
      }
    }

    // Tambahan untuk Tujuan
    if (tujuan && tujuan.length > 0) {
      for (let i = 0; i < tujuan.length; i++) {
        await db.query("INSERT INTO profil_visi_misi (kategori, konten, urutan) VALUES (?, ?, ?)", ["tujuan", tujuan[i], i + 1]);
      }
    }
    res.json({ success: true, message: "Visi, Misi & Tujuan berhasil diupdate" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 2. Update Kepala (Dengan Upload)
exports.updateKepala = async (req, res) => {
  const { nama, spesialisasi, bio } = req.body;
  let foto_url = req.body.foto_url_lama || ""; // Ambil foto lama jika tidak upload baru
  
  if (req.file) {
    foto_url = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  try {
    const [existing] = await db.query("SELECT id FROM struktur_organisasi WHERE kategori = 'kepala'");
    if (existing.length > 0) {
      await db.query("UPDATE struktur_organisasi SET nama=?, spesialisasi=?, bio=?, foto_url=? WHERE kategori='kepala'", 
      [nama, spesialisasi, bio, foto_url]);
    } else {
      await db.query("INSERT INTO struktur_organisasi (kategori, nama, role, spesialisasi, bio, foto_url) VALUES ('kepala', ?, 'Kepala UPA-BK', ?, ?, ?)", 
      [nama, spesialisasi, bio, foto_url]);
    }
    res.json({ success: true, message: "Kepala berhasil diupdate", foto_url });
  } catch (error) { console.error(error); res.status(500).json({ success: false, message: "Server Error" }); }
};

// 3. CRUD Staff (Dengan Upload & Bio)
exports.createStaff = async (req, res) => {
  const { nama, role, spesialisasi, bio } = req.body;
  let foto_url = "";
  if (req.file) foto_url = `http://localhost:5000/uploads/${req.file.filename}`;

  try {
    const [result] = await db.query("INSERT INTO struktur_organisasi (kategori, nama, role, spesialisasi, bio, foto_url) VALUES ('staff', ?, ?, ?, ?, ?)", 
    [nama, role, spesialisasi, bio, foto_url]);
    res.json({ success: true, data: { insertId: result.insertId, foto_url } });
  } catch (error) { console.error(error); res.status(500).json({ success: false, message: "Server Error" }); }
};

exports.updateStaff = async (req, res) => {
  const { nama, role, spesialisasi, bio } = req.body;
  let foto_url = req.body.foto_url_lama || "";
  if (req.file) foto_url = `http://localhost:5000/uploads/${req.file.filename}`;

  try {
    await db.query("UPDATE struktur_organisasi SET nama=?, role=?, spesialisasi=?, bio=?, foto_url=? WHERE id=? AND kategori='staff'", 
    [nama, role, spesialisasi, bio, foto_url, req.params.id]);
    res.json({ success: true, foto_url });
  } catch (error) { console.error(error); res.status(500).json({ success: false, message: "Server Error" }); }
};

exports.deleteStaff = async (req, res) => {
  try {
    await db.query("DELETE FROM struktur_organisasi WHERE id=? AND kategori='staff'", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: "Server Error" }); }
};