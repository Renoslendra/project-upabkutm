const db = require("./db");

/**
 * Mencatat aktivitas admin ke tabel log_aktivitas.
 *
 * @param {Object} options
 * @param {number|null} options.adminId  - ID admin yang melakukan aksi (dari req.admin.id)
 * @param {string}      options.aksi     - Jenis aksi: 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
 * @param {string}      options.tabel    - Nama tabel yang diubah
 * @param {number|null} options.recordId - ID record yang diubah (opsional)
 * @param {string|null} options.keterangan - Detail perubahan (opsional)
 * @param {string|null} options.ipAddress  - IP address admin (opsional)
 */
async function logAktivitas({ adminId, aksi, tabel, recordId = null, keterangan = null, ipAddress = null }) {
  try {
    await db.query(
      "INSERT INTO log_aktivitas (admin_id, aksi, tabel, record_id, keterangan, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [adminId || null, aksi, tabel, recordId, keterangan, ipAddress]
    );
  } catch (err) {
    // Log error tapi jangan sampai mengganggu operasi utama
    console.error("Gagal mencatat log aktivitas:", err.message);
  }
}

module.exports = logAktivitas;
