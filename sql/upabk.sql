CREATE DATABASE IF NOT EXISTS upabk;
USE upabk;

-- 1. Tabel ADMIN
DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT uk_admin_username UNIQUE (username)
);

-- 2. Tabel ARTIKEL
DROP TABLE IF EXISTS artikel;
CREATE TABLE artikel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(100),
    excerpt TEXT,
    konten TEXT,
    image_url VARCHAR(255) NULL,
    views INT DEFAULT 0,
    status ENUM('Published', 'Draft') DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_artikel_status (status),
    INDEX idx_artikel_created (created_at)
);

-- 3. Tabel KEGIATAN
DROP TABLE IF EXISTS kegiatan;
CREATE TABLE kegiatan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kegiatan VARCHAR(255) NOT NULL,
    tanggal VARCHAR(100) NOT NULL, 
    lokasi VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    image_url VARCHAR(255) NULL,
    status ENUM('Akan Datang', 'Selesai') DEFAULT 'Akan Datang',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_kegiatan_status (status)
);

-- 4. Tabel STATISTIK
DROP TABLE IF EXISTS statistik;
CREATE TABLE statistik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prodi VARCHAR(150) NOT NULL,
    total INT DEFAULT 0,
    konseling INT DEFAULT 0,
    selesai INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT uk_statistik_prodi UNIQUE (prodi)
);

-- 5. Tabel FAQ
DROP TABLE IF EXISTS faq;
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pertanyaan TEXT NOT NULL,
    jawaban TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Tabel KONTAK
DROP TABLE IF EXISTS kontak;
CREATE TABLE kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    telepon VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    jam_layanan VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Tabel VISI, MISI, & TUJUAN
DROP TABLE IF EXISTS profil_visi_misi;
CREATE TABLE profil_visi_misi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori ENUM('visi', 'misi', 'tujuan') NOT NULL,
    konten TEXT NOT NULL,
    urutan INT DEFAULT 1, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_kategori_urutan (kategori, urutan)
);

-- 8. Tabel STRUKTUR ORGANISASI
DROP TABLE IF EXISTS struktur_organisasi;
CREATE TABLE struktur_organisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori ENUM('kepala', 'staff') NOT NULL DEFAULT 'staff',
    nama VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,     
    spesialisasi VARCHAR(150) NULL, 
    bio TEXT NULL,                  
    foto_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_kategori_struktur (kategori)
);

-- Admin (Password: admin123 sudah di-hash bcrypt)
INSERT INTO admin (username, password, nama) VALUES 
('admin', '$2b$10$weaQsLrV/LxcWv7GRt7MF.OjJMmWn3EavtQQD3SgSYEvcrsnPoHdW', 'Admin UPA-BK');

-- Statistik
INSERT INTO statistik (prodi, total, konseling, selesai) VALUES 
('Psikologi', 124, 84, 70),
('Teknik Informatika', 98, 57, 48),
('Manajemen', 76, 35, 28),
('Akuntansi', 63, 29, 22);

-- Bantuan (Kontak & FAQ)
INSERT INTO kontak (telepon, email, jam_layanan) VALUES 
('(031) 3011146', 'upabk@trunojoyo.ac.id', 'Senin - Jumat, 08.00 - 16.00 WIB');

INSERT INTO faq (pertanyaan, jawaban) VALUES 
('Apakah layanan konseling gratis?', 'Ya, seluruh layanan 100% gratis untuk mahasiswa aktif UTM.'),
('Bagaimana cara mendaftar?', 'Melalui menu "Daftar Konseling" di website ini yang akan mengarahkan ke formulir asesmen.');

-- Artikel & Kegiatan
INSERT INTO artikel (judul, kategori, excerpt, konten, views, status) VALUES
('Mengatasi Kecemasan Ujian', 'Edukasi', 'Tips singkat hadapi ujian...', '<p>Konten lengkap disini...</p>', 1250, 'Published'),
('Pentingnya Self-Care', 'Kesehatan Mental', 'Jaga diri itu penting...', '<p>Konten lengkap disini...</p>', 980, 'Published');

INSERT INTO kegiatan (nama_kegiatan, tanggal, lokasi, deskripsi, status) VALUES
('Webinar Mental Health', '15 Mei 2026', 'Zoom', 'Webinar gratis untuk mahasiswa.', 'Akan Datang'),
('Sosialisasi Anti-Bullying', '10 Apr 2026', 'Auditorium', 'Acara sukses digelar.', 'Selesai');

-- Profil (Visi, Misi, Tujuan)
INSERT INTO profil_visi_misi (kategori, konten, urutan) VALUES 
('visi', 'Menjadi pusat layanan bimbingan dan konseling unggul yang adaptif terhadap kebutuhan mahasiswa, serta mewujudkan ekosistem akademik yang sehat secara psikologis, inklusif, dan berlandaskan empati profesional.', 1),
('misi', 'Menyediakan layanan konseling individu & kelompok berkualitas.', 1),
('misi', 'Melaksanakan asesmen kesehatan mental berkala.', 2),
('tujuan', 'Memberikan layanan konseling yang mudah diakses oleh seluruh civitas akademika UTM.', 1),
('tujuan', 'Meningkatkan literasi kesehatan mental di lingkungan kampus.', 2);

-- Struktur Organisasi
INSERT INTO struktur_organisasi (kategori, nama, role, spesialisasi, bio, foto_url) VALUES 
('kepala', 'Dr. Aminah, M.Psi', 'Kepala UPA-BK', 'Psikologi Klinis', 'Lebih dari 15 tahun pengalaman dalam layanan BK.', ''),
('staff', 'Rifqi Ardian, M.Psi', 'Konselor Senior', 'Konseling Akademik', NULL, ''),
('staff', 'Sari Pratiwi, M.Psi', 'Konselor', 'Anxiety & Depression', NULL, '');