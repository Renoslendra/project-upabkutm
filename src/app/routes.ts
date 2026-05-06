import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Beranda from './pages/Beranda';
import Tentang from './pages/Tentang';
import Asesmen from './pages/Asesmen';
import HasilAsesmen from './pages/HasilAsesmen';
import Booking from './pages/Booking';
import Artikel from './pages/Artikel';
import ArtikelDetail from './pages/ArtikelDetail';
import Kegiatan from './pages/Kegiatan';
import BantuanAlur from './pages/BantuanAlur';
import BantuanCp from './pages/BantuanCp';
import BantuanFaq from './pages/BantuanFaq';
import BantuanChatbot from './pages/BantuanChatbot';
import AdminDashboard from './pages/AdminDashboard';
import AdminAsesmen from './pages/AdminAsesmen';
import AdminKonseling from './pages/AdminKonseling';
import AdminLaporan from './pages/AdminLaporan';
import AdminArtikel from './pages/AdminArtikel';
import AdminKegiatan from './pages/AdminKegiatan';
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
      { index: true, Component: Beranda },
      { path: 'tentang', Component: Tentang },
      { path: 'asesmen', Component: Asesmen },
      { path: 'hasil-asesmen', Component: HasilAsesmen },
      { path: 'booking', Component: Booking },
      { path: 'artikel', Component: Artikel },
      { path: 'artikel/:id', Component: ArtikelDetail },
      { path: 'kegiatan', Component: Kegiatan },
      { path: 'admin-rahasia', Component: AdminLogin },
      { path: 'bantuan/alur', Component: BantuanAlur },
      { path: 'bantuan/cp', Component: BantuanCp },
      { path: 'bantuan/faq', Component: BantuanFaq },
      { path: 'bantuan/chatbot', Component: BantuanChatbot },
      { path: 'dokumen/sop-konseling', Component: SopKonseling },
      { path: 'universitas', Component: Universitas },
      { path: 'statistik/prodi', Component: StatistikProdi },
      { path: 'admin', Component: AdminDashboard },
      { path: 'admin/asesmen', Component: AdminAsesmen },
      { path: 'admin/konseling', Component: AdminKonseling },
      { path: 'admin/laporan', Component: AdminLaporan },
      { path: 'admin/artikel', Component: AdminArtikel },
      { path: 'admin/kegiatan', Component: AdminKegiatan },
      { path: 'evaluasi', Component: Evaluasi },
      { path: '*', Component: NotFound },
    ],
  },
]);
