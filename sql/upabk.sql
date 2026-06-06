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

-- 9. Tabel INFORMASI UNIVERSITAS
DROP TABLE IF EXISTS informasi_universitas;
CREATE TABLE informasi_universitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori ENUM('Libur Akademik', 'Pengumuman', 'Beasiswa', 'Akademik', 'Lainnya') NOT NULL,
    link_edaran VARCHAR(255) NULL,
    status ENUM('Aktif', 'Nonaktif') DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_kategori (kategori),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- Admin (Password: admin123 sudah di-hash bcrypt)
INSERT INTO admin (username, password, nama) VALUES 
('admin', '$2b$10$weaQsLrV/LxcWv7GRt7MF.OjJMmWn3EavtQQD3SgSYEvcrsnPoHdW', 'Admin UPA-BK');

-- Statistik
INSERT INTO statistik (prodi, total, konseling, selesai) VALUES 
('Psikologi', 124, 84, 70),
('Teknik Informatika', 98, 57, 48),
('Manajemen', 76, 35, 28),
('Akuntansi', 63, 29, 22),
('Ilmu Komunikasi', 85, 40, 35),
('Hukum', 90, 45, 38);

-- Bantuan (Kontak & FAQ)
INSERT INTO kontak (telepon, email, jam_layanan) VALUES 
('(031) 3011146', 'upabk@trunojoyo.ac.id', 'Senin - Jumat, 08.00 - 16.00 WIB');

INSERT INTO faq (pertanyaan, jawaban) VALUES 
('Apakah layanan konseling gratis?', 'Ya, seluruh layanan 100% gratis untuk mahasiswa aktif Universitas Trunojoyo Madura.'),
('Bagaimana cara mendaftar sesi konseling?', 'Melalui menu "Daftar Konseling" di website ini yang akan mengarahkan Anda ke formulir asesmen awal. Tim kami akan menghubungi Anda untuk penjadwalan.'),
('Apakah kerahasiaan sesi konseling terjamin?', 'Tentu saja. UPA-BK UTM memegang teguh asas kerahasiaan sesuai kode etik psikologi. Data Anda tidak akan dibagikan ke pihak fakultas maupun prodi tanpa persetujuan tertulis dari Anda.'),
('Apakah layanan ini tersedia untuk dosen dan tenaga kependidikan?', 'Ya, kami juga menyediakan ruang aman bagi dosen dan tendik yang membutuhkan layanan bimbingan psikologis terkait stres kerja atau masalah personal.');

-- Artikel & Edukasi
INSERT INTO artikel (judul, kategori, excerpt, konten, image_url, views, status) VALUES
('Memahami Gejala Depresi pada Mahasiswa dan Cara Mengatasinya', 'Depresi', 'Depresi bukan sekadar sedih biasa. Kenali tanda-tandanya dan jangan ragu mencari bantuan profesional jika dibutuhkan.', 'https://www.halodoc.com/kesehatan/depresi', 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&q=80', 1450, 'Published'),
('Cara Tepat Mendukung Teman Kampus yang Mengalami Depresi', 'Depresi', 'Bingung bagaimana merespons teman yang sedang down? Ketahui batasan empati dan cara mendengarkan yang baik.', 'https://www.halodoc.com/artikel/ini-cara-membantu-teman-yang-mengalami-depresi', 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80', 890, 'Published'),
('Mengelola Kecemasan Berlebih (Anxiety) Menjelang Sidang Skripsi', 'Kecemasan', 'Jantung berdebar dan keringat dingin sebelum presentasi? Simak cara efektif meredakan kecemasan akademik.', 'https://www.alodokter.com/anxiety-disorder', 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80', 2100, 'Published'),
('Mengatasi Social Anxiety (Kecemasan Sosial) Saat Presentasi', 'Kecemasan', 'Takut dihakimi saat berbicara di depan kelas? Pelajari trik psikologis untuk tampil lebih percaya diri.', 'https://hellosehat.com/mental/gangguan-kecemasan/gangguan-kecemasan-sosial/', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', 1650, 'Published'),
('Manajemen Stres: Teknik Relaksasi untuk Menurunkan Ketegangan', 'Stres', 'Tugas menumpuk bikin pusing? Cobalah beberapa teknik relaksasi pernapasan ini untuk menenangkan pikiranmu.', 'https://hellosehat.com/mental/stres/cara-menghilangkan-stres/', 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80', 1340, 'Published'),
('Mengenal Eustress: Ketika Stres Justru Menjadi Motivasi', 'Stres', 'Tidak semua stres itu buruk. Eustress adalah jenis stres positif yang bisa mendorong performa belajarmu.', 'https://www.alodokter.com/tidak-selalu-buruk-ini-manfaat-stres-yang-perlu-anda-tahu', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', 1120, 'Published'),
('Pentingnya Self-Care untuk Menjaga Kewarasan Selama Kuliah', 'Self-Care', 'Menjaga diri sendiri bukan berarti egois. Temukan rutinitas self-care yang cocok untuk jadwal padatmu.', 'https://www.siloamhospitals.com/informasi-siloam/artikel/apa-itu-self-care', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80', 1890, 'Published'),
('Digital Minimalism: Puasa Sosmed Sebagai Bentuk Self-Care', 'Self-Care', 'Terlalu sering doomscrolling bisa memicu overthinking. Saatnya detoks digital untuk kesehatan mentalmu.', 'https://pijarpsikologi.org/blog/digital-minimalism-cara-sehat-menggunakan-media-sosial', 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80', 2300, 'Published'),
('Mengenal Tanda-Tanda Burnout Akademik dan Solusinya', 'Akademik', 'Kehilangan motivasi belajar dan merasa lelah secara emosional terus-menerus? Waspadai Academic Burnout.', 'https://www.siloamhospitals.com/informasi-siloam/artikel/apa-itu-burnout', 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80', 2560, 'Published'),
('Strategi Menjaga Mental Saat Menghadapi Revisi Skripsi', 'Akademik', 'Revisi berulang kali dari dosen pembimbing memang melelahkan. Begini cara menjaga semangat agar tidak menyerah.', 'https://campuspedia.id/kabar/cara-menghadapi-revisi-skripsi-tanpa-stres/', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', 3450, 'Published'),
('Manajemen Waktu Efektif: Selamat Tinggal Prokrastinasi!', 'Tips', 'Sering menunda-nunda tugas sampai sistem SKS (Sistem Kebut Semalam)? Cobalah metode manajemen waktu ini.', 'https://glints.com/id/lowongan/time-management-adalah/', 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&q=80', 3120, 'Published'),
('Tips Membangun Habit Belajar Konsisten ala Atomic Habits', 'Tips', 'Sulit fokus belajar? Terapkan sistem 1 persen lebih baik setiap hari untuk hasil akademik yang maksimal.', 'https://www.gramedia.com/best-seller/review-buku-atomic-habits/', 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=800&q=80', 4120, 'Published');

-- Kegiatan & Workshop
INSERT INTO kegiatan (nama_kegiatan, tanggal, lokasi, deskripsi, image_url, status) VALUES
('Webinar Mental Health: Stress Management 101', '15 Mei 2026 09:00', 'Zoom Meeting', 'Webinar interaktif untuk mahasiswa UTM mengenai cara mengelola stres akademik dengan teknik relaksasi praktis.', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80', 'Akan Datang'),
('Workshop: Membangun Resiliensi Diri', '25 Jun 2026 13:00', 'Gedung Rektorat Lt. 4', 'Pelatihan tatap muka untuk membentuk ketahanan mental mahasiswa dalam menghadapi kegagalan dan penolakan.', 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80', 'Akan Datang'),
('Group Counseling: Mengatasi Quarter Life Crisis', '05 Jul 2026 10:00', 'Ruang Konseling UPA-BK', 'Sesi berbagi bersama teman sebaya (maksimal 10 orang) dengan panduan psikolog profesional UPA-BK.', 'https://images.unsplash.com/photo-1529156069898-49953eb1f5ff?w=800&q=80', 'Akan Datang'),
('Kampanye Peduli Kesehatan Jiwa (World Mental Health Day)', '10 Okt 2026 07:00', 'Lapangan Rektorat UTM', 'Acara puncak peringatan hari kesehatan mental dunia. Terdapat senam bersama, talkshow, dan pameran poster edukasi.', 'https://images.unsplash.com/photo-1531206715517-5c5610e252a2?w=800&q=80', 'Akan Datang'),
('Sosialisasi Anti-Bullying di Lingkungan Kampus', '10 Apr 2026 09:00', 'Auditorium UTM', 'Kampanye kesadaran pencegahan perundungan dan kekerasan seksual di lingkungan perguruan tinggi. Acara sukses digelar.', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', 'Selesai'),
('Pelatihan Peer Counselor Mahasiswa Batch 1', '20 Mar 2026 08:00', 'Lab Fakultas Ilmu Pendidikan', 'Pelatihan intensif untuk membekali mahasiswa terpilih agar bisa menjadi pendengar dan konselor sebaya (peer counselor) yang baik.', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80', 'Selesai');

-- Profil (Visi, Misi, Tujuan)
INSERT INTO profil_visi_misi (kategori, konten, urutan) VALUES 
('visi', 'Menjadi pusat layanan bimbingan dan konseling unggul yang adaptif terhadap kebutuhan mahasiswa, serta mewujudkan ekosistem akademik yang sehat secara psikologis, inklusif, dan berlandaskan empati profesional.', 1),
('misi', 'Menyediakan layanan konseling individu & kelompok yang profesional dan rahasia.', 1),
('misi', 'Melaksanakan program psikoedukasi, seminar, dan workshop kesehatan mental secara berkala.', 2),
('misi', 'Memfasilitasi pengembangan potensi diri dan perencanaan karier mahasiswa.', 3),
('tujuan', 'Memberikan kemudahan akses layanan psikologis bagi seluruh civitas akademika UTM.', 1),
('tujuan', 'Meningkatkan literasi dan kesadaran akan pentingnya kesehatan mental di lingkungan kampus.', 2);

-- Struktur Organisasi
INSERT INTO struktur_organisasi (kategori, nama, role, spesialisasi, bio, foto_url) VALUES 
('kepala', 'Dr. Hera Wahyuni, M.Psi, Psikolog', 'Kepala UPA-BK', 'Psikologi Klinis Dewasa', 'Memiliki pengalaman lebih dari 15 tahun dalam praktik psikologi klinis dan penanganan trauma. Berkomitmen menjadikan UPA-BK ruang aman bagi mahasiswa.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'),
('staff', 'Rifqi Ardian, M.Psi', 'Konselor Senior', 'Konseling Akademik & Karier', 'Spesialis dalam mendampingi mahasiswa yang mengalami kesulitan belajar, manajemen waktu, dan kebingungan menentukan arah karier pasca-lulus.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'),
('staff', 'Meyla Nuzula, M.Psi, Psikolog', 'Psikolog', 'Anxiety & Depression', 'Berfokus pada intervensi klinis untuk kecemasan berlebih (anxiety), depresi, dan masalah manajemen emosi.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'),
('staff', 'Ruel, S.Kom., M.A.', 'Konselor', 'Pengembangan Karakter', 'Konselor yang aktif memberikan pelatihan resiliensi, motivasi berprestasi, dan penyelesaian konflik interpersonal antarmahasiswa.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'),
('staff', 'Prima Prigita, M.Psi., Psikolog', 'Psikolog', 'Keluarga & Relasi', 'Membantu mahasiswa yang menghadapi masalah keluarga (broken home), krisis identitas, dan toxic relationship.', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80'),
('staff', 'Jauhari Faizal, S.Kom.', 'Staf IT & Administrasi', 'Manajemen Data & Sistem', 'Bertanggung jawab dalam pengelolaan jadwal konseling, administrasi sistem UPA-BK, dan memastikan kerahasiaan rekam medis digital.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80');

-- Informasi Universitas
INSERT INTO informasi_universitas (judul, deskripsi, kategori, link_edaran, status) VALUES
('Edaran Libur Semester Gasal 2024/2025', 'Penetapan jadwal libur semester gasal untuk seluruh mahasiswa, dosen, dan tenaga kependidikan Universitas Trunojoyo Madura tahun akademik 2024/2025.', 'Libur Akademik', 'https://example.com/edaran-libur-gasal-2024', 'Aktif'),
('Pengumuman Beasiswa Penuh Program Pascasarjana', 'Dibuka kesempatan beasiswa penuh untuk mahasiswa berprestasi yang ingin melanjutkan studi ke jenjang S2 di berbagai program studi unggulan UTM.', 'Beasiswa', 'https://example.com/beasiswa-pascasarjana-2024', 'Aktif'),
('Peraturan Akademik Tahun Akademik 2024/2025', 'Perubahan dan penambahan peraturan akademik yang berlaku untuk semua mahasiswa, dosen, dan akademisi di UTM mulai TA 2024/2025.', 'Akademik', 'https://example.com/peraturan-akademik-2024', 'Aktif'),
('Penyesuaian Jadwal Perkuliahan Akhir Semester', 'Penjadwalan ulang perkuliahan minggu terakhir sebelum ujian akhir semester untuk optimalisasi waktu belajar mahasiswa.', 'Pengumuman', 'https://example.com/jadwal-perkuliahan-gasal', 'Aktif'),
('Program Akselerator Skripsi Semester Ini', 'Kesempatan bagi mahasiswa semester akhir untuk mempercepat penyelesaian skripsi dengan dukungan intensif dari pembimbing dan UPA-BK.', 'Akademik', 'https://example.com/akselerator-skripsi', 'Aktif');