import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Plus,
  ArrowUpRight,
  Eye,
  CalendarDays,
  MapPin,
  FileText,
  CheckCircle2,
  BarChart3,
  HelpCircle,
  UserCog,
  Building2,
  Award,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { API_BASE_URL } from '../../config';
import { ErrorNotice } from '../components/ErrorNotice';

export const adminItems = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/profil', label: 'Profil', Icon: UserCog },
  { to: '/admin/artikel', label: 'Artikel & Edukasi', Icon: BookOpen },
  { to: '/admin/kegiatan', label: 'Kegiatan', Icon: Sparkles },
  { to: '/admin/statistik', label: 'Statistik', Icon: BarChart3 },
  { to: '/admin/pimpinan', label: 'Pimpinan', Icon: Award },
  { to: '/admin/informasi-universitas', label: 'Informasi Universitas', Icon: Building2 },
  { to: '/admin/bantuan', label: 'Bantuan', Icon: HelpCircle },
];

const COLORS = ['#6B21A8', '#A855F7'];

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  
  // State untuk Tabel Terbaru
  const [recentArtikel, setRecentArtikel] = useState<any[]>([]);
  const [upcomingKegiatan, setUpcomingKegiatan] = useState<any[]>([]);
  
  // State untuk Grafik dan KPI
  const [kpiData, setKpiData] = useState({ totalArt: 0, pubArt: 0, totalKeg: 0, akanDatang: 0 });
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) setAdminName(storedName);

    const fetchDashboardData = async () => {
      try {
        setError(null);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Ambil data dalam jumlah besar (limit 1000) untuk dikalkulasi oleh React
        const resArtikel = await fetch(`${API_BASE_URL}/api/admin/artikel?limit=1000`, { headers });
        if (!resArtikel.ok) {
          throw new Error('Gagal memuat data artikel dashboard.');
        }
        const dataArtikel = await resArtikel.json();
        
        const resKegiatan = await fetch(`${API_BASE_URL}/api/admin/kegiatan?limit=1000`, { headers });
        if (!resKegiatan.ok) {
          throw new Error('Gagal memuat data kegiatan dashboard.');
        }
        const dataKegiatan = await resKegiatan.json();

        if (dataArtikel.success && dataKegiatan.success) {
          const allArt = dataArtikel.data;
          const allKeg = dataKegiatan.data;

          // 1. DATA TABEL TERBARU (Ambil 3 Teratas)
          setRecentArtikel(allArt.slice(0, 3));
          setUpcomingKegiatan(allKeg.slice(0, 3));

          // 2. KALKULASI DATA KPI (4 Kotak Angka)
          const pubArt = allArt.filter((a: any) => a.status === 'Published').length;
          const draftArt = allArt.length - pubArt;
          const akanDatang = allKeg.filter((k: any) => k.status === 'Akan Datang').length;

          setKpiData({
            totalArt: allArt.length,
            pubArt: pubArt,
            totalKeg: allKeg.length,
            akanDatang: akanDatang
          });

          // 3. DATA PIE CHART (Status Artikel)
          setPieData([
            { n: 'Published', v: pubArt },
            { n: 'Draft', v: draftArt }
          ]);

          // 4. DATA BAR CHART (Views 6 Bulan Terakhir)
          const months = [];
          const today = new Date();
          // Buat array 6 bulan terakhir ke belakang
          for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push(d.toLocaleString('id-ID', { month: 'short' }));
          }
          
          const trend = months.map(m => ({ m, v: 0 }));
          
          // Masukkan data view dari setiap artikel ke bulan yang sesuai
          allArt.forEach((a: any) => {
            const d = a.created_at ? new Date(a.created_at) : new Date();
            const mName = d.toLocaleString('id-ID', { month: 'short' });
            const target = trend.find(t => t.m === mName);
            if (target) {
              target.v += (a.views || 0); // Tambahkan view artikel ke bulan tersebut
            }
          });
          
          setBarData(trend);
        } else {
          throw new Error('Gagal memuat data dashboard.');
        }
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
        setError(error instanceof Error ? error.message : 'Gagal memuat data dashboard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Variabel untuk merender 4 kotak KPI secara dinamis
  const kpisDynamic = [
    { l: 'Total Artikel', v: kpiData.totalArt, delta: 'Semua waktu', cls: 'badge-info', Icon: BookOpen },
    { l: 'Artikel Published', v: kpiData.pubArt, delta: 'Live', cls: 'badge-success', Icon: CheckCircle2 },
    { l: 'Total Kegiatan', v: kpiData.totalKeg, delta: 'Semua agenda', cls: 'badge-info', Icon: Sparkles },
    { l: 'Akan Datang', v: kpiData.akanDatang, delta: 'Segera', cls: 'badge-warning', Icon: CalendarDays },
  ];

  return (
    <DashboardLayout
      items={adminItems}
      title="Dashboard Admin"
      subtitle="Ringkasan artikel edukasi & kegiatan UPA-BK UTM"
      role="Admin"
      name={adminName}
    >
      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link to="/admin/artikel" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus size={16} /> Tambah Artikel
        </Link>
        <Link to="/admin/kegiatan" className="btn-secondary inline-flex items-center gap-2 text-sm">
          <Plus size={16} /> Tambah Kegiatan
        </Link>
      </div>

      {error && <ErrorNotice message={error} className="mb-8" />}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpisDynamic.map((s) => (
          <div key={s.l} className="card-soft">
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--primary-fixed)' }}
              >
                <s.Icon size={18} style={{ color: 'var(--primary-dark)' }} />
              </div>
              <span className={`badge ${s.cls}`}>{s.delta}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.75rem', color: 'var(--primary-dark)' }}>
              {isLoading ? "-" : s.v}
            </div>
            <div className="eyebrow mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Views Artikel per Bulan</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Performa konten edukasi dalam 6 bulan terakhir
              </p>
            </div>
            <Link
              to="/admin/artikel"
              className="btn-ghost text-sm inline-flex items-center gap-1"
            >
              Lihat semua <ArrowUpRight size={14} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <XAxis dataKey="m" stroke="#9A8D91" />
              <YAxis stroke="#9A8D91" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: 'none',
                  borderRadius: 12,
                  boxShadow: 'var(--shadow-md)',
                }}
              />
              <Bar dataKey="v" fill="url(#g1)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B21A8" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-soft">
          <h3 className="mb-4" style={{ fontSize: '1.1rem' }}>
            Status Artikel
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="v"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: 'none',
                  borderRadius: 12,
                  boxShadow: 'var(--shadow-md)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {pieData.map((d, i) => (
              <div key={d.n} className="flex justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: COLORS[i] }}
                  />
                  {d.n}
                </span>
                <span style={{ fontWeight: 600 }}>{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two recent tables side by side */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Artikel Terbaru */}
        <div className="card-soft p-0 overflow-hidden flex flex-col h-full">
          <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Artikel Terbaru</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                3 artikel terakhir yang diunggah
              </p>
            </div>
            <Link
              to="/admin/artikel"
              className="btn-ghost text-sm inline-flex items-center gap-1"
            >
              Kelola <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F5F3FF' }}>
                  {['Judul', 'Views', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 eyebrow"
                      style={{ color: 'var(--primary-dark)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={3} className="p-4 text-center text-gray-500">Memuat...</td></tr>
                ) : recentArtikel.length === 0 ? (
                  <tr><td colSpan={3} className="p-4 text-center text-gray-500">Belum ada artikel</td></tr>
                ) : (
                  recentArtikel.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t hover:bg-[var(--surface-sunken)] transition-colors"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <td className="px-6 py-4 flex items-center gap-2">
                        <FileText size={14} style={{ color: 'var(--primary)' }} />
                        <span className="font-medium line-clamp-1">{r.judul}</span>
                      </td>
                      <td
                        className="px-6 py-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span className="inline-flex items-center gap-1">
                          <Eye size={13} /> {r.views || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge ${
                            r.status === 'Published' ? 'badge-success' : 'badge-neutral'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kegiatan Terdekat */}
        <div className="card-soft p-0 overflow-hidden flex flex-col h-full">
          <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Kegiatan Terdekat</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Jadwal terbaru dari agenda UPA-BK
              </p>
            </div>
            <Link
              to="/admin/kegiatan"
              className="btn-ghost text-sm inline-flex items-center gap-1"
            >
              Kelola <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F5F3FF' }}>
                  {['Nama', 'Tanggal', 'Lokasi', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 eyebrow"
                      style={{ color: 'var(--primary-dark)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={4} className="p-4 text-center text-gray-500">Memuat...</td></tr>
                ) : upcomingKegiatan.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center text-gray-500">Belum ada kegiatan</td></tr>
                ) : (
                  upcomingKegiatan.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t hover:bg-[var(--surface-sunken)] transition-colors"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <td className="px-6 py-4 font-medium line-clamp-1">{r.nama_kegiatan}</td>
                      <td
                        className="px-6 py-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={13} /> 
                          {new Date(r.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td
                        className="px-6 py-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={13} /> {r.lokasi}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge ${
                            r.status === 'Akan Datang' ? 'badge-info' : 'badge-neutral'
                          }`}
                        >
                          {r.status || 'Akan Datang'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
