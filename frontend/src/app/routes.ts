import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'
import Beranda from './pages/Beranda';
import Tentang from './pages/Tentang';
import VisiMisi from './pages/VisiMisi';
import StrukturOrganisasi from './pages/StrukturOrganisasi';
import Booking from './pages/Booking';
import LayananMahasiswa from './pages/LayananMahasiswa';
import LayananDosen from './pages/LayananDosen';
import LayananEksternal from './pages/LayananEksternal';
import Artikel from './pages/Artikel';
import Kegiatan from './pages/Kegiatan';
import BantuanCp from './pages/BantuanCp';
import BantuanFaq from './pages/BantuanFaq';
import AdminDashboard from './pages/AdminDashboard';
import AdminArtikel from './pages/AdminArtikel';
import AdminKegiatan from './pages/AdminKegiatan';
import AdminStatistik from './pages/AdminStatistik';
import AdminBantuan from './pages/AdminBantuan';
import AdminInformasiUniversitas from './pages/AdminInformasiUniversitas';
import AdminProfil from './pages/AdminProfil';
import AdminLogin from './pages/AdminLogin';
import Evaluasi from './pages/Evaluasi';
import SopKonseling from './pages/SopKonseling';
import StatistikProdi from './pages/StatistikProdi';
import Universitas from './pages/Universitas';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      // RUTE PUBLIK
      { index: true, Component: Beranda },
      { path: 'tentang', Component: Tentang },
      { path: 'visi-misi', Component: VisiMisi },
      { path: 'struktur-organisasi', Component: StrukturOrganisasi },
      { path: 'booking', Component: Booking },
      { path: 'layanan/mahasiswa', Component: LayananMahasiswa },
      { path: 'layanan/dosen', Component: LayananDosen },
      { path: 'layanan/eksternal', Component: LayananEksternal },
      { path: 'artikel', Component: Artikel },
      { path: 'kegiatan', Component: Kegiatan },
      { path: 'admin-rahasia', Component: AdminLogin },
      { path: 'bantuan/cp', Component: BantuanCp },
      { path: 'bantuan/faq', Component: BantuanFaq },
      { path: 'dokumen/sop-konseling', Component: SopKonseling },
      { path: 'universitas', Component: Universitas },
      { path: 'statistik/prodi', Component: StatistikProdi },
      { path: 'evaluasi', Component: Evaluasi },

      // === RUTE ADMIN (Wajib Login)
      {
        Component: ProtectedRoute, // Jadikan ProtectedRoute sebagai pembungkus
        children: [
          { path: 'admin', Component: AdminDashboard },
          { path: 'admin/artikel', Component: AdminArtikel },
          { path: 'admin/kegiatan', Component: AdminKegiatan },
          { path: 'admin/statistik', Component: AdminStatistik },
          { path: 'admin/bantuan', Component: AdminBantuan },
          { path: 'admin/informasi-universitas', Component: AdminInformasiUniversitas },
          { path: 'admin/profil', Component: AdminProfil },
        ],
      },

      { path: '*', Component: NotFound },
    ],
  },
]);