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

export const adminItems = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/profil', label: 'Profil', Icon: UserCog },
  { to: '/admin/artikel', label: 'Artikel & Edukasi', Icon: BookOpen },
  { to: '/admin/kegiatan', label: 'Kegiatan', Icon: Sparkles },
  { to: '/admin/statistik', label: 'Statistik', Icon: BarChart3 },
  { to: '/admin/bantuan', label: 'Bantuan', Icon: HelpCircle },
];

// ---- Dummy data (nanti tinggal ganti saat ada API) ----
const viewsTrend = [
  { m: 'Jan', v: 620 },
  { m: 'Feb', v: 880 },
  { m: 'Mar', v: 1040 },
  { m: 'Apr', v: 1250 },
  { m: 'Mei', v: 1420 },
  { m: 'Jun', v: 1180 },
];

const artikelStatus = [
  { n: 'Published', v: 38 },
  { n: 'Draft', v: 14 },
];

const COLORS = ['#89467F', '#C77DBA'];

const recentArtikel = [
  { id: 1, title: 'Mengatasi Kecemasan Menjelang Ujian', views: 1250, status: 'Published' },
  { id: 2, title: 'Pentingnya Self-Care untuk Mahasiswa', views: 980, status: 'Published' },
  { id: 3, title: 'Mengenali Tanda-Tanda Burnt Out', views: 850, status: 'Draft' },
];

const upcomingKegiatan = [
  { id: 1, title: 'Webinar Kesehatan Mental 2026', date: '15 Mei 2026', loc: 'Zoom Meeting', status: 'Akan Datang' },
  { id: 2, title: 'Pelatihan Peer Counselor', date: '02 Jun 2026', loc: 'Gedung Rektorat Lt.4', status: 'Akan Datang' },
  { id: 3, title: 'Sosialisasi Anti-Bullying', date: '10 Apr 2026', loc: 'Auditorium UTM', status: 'Selesai' },
];

const kpis = [
  { l: 'Total Artikel', v: '52', delta: '+4 bulan ini', cls: 'badge-info', Icon: BookOpen },
  { l: 'Artikel Published', v: '38', delta: '+12%', cls: 'badge-success', Icon: CheckCircle2 },
  { l: 'Total Kegiatan', v: '14', delta: '+2 bulan ini', cls: 'badge-info', Icon: Sparkles },
  { l: 'Akan Datang', v: '5', delta: 'Mei–Jun', cls: 'badge-warning', Icon: CalendarDays },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout
      items={adminItems}
      title="Dashboard Admin"
      subtitle="Ringkasan artikel edukasi & kegiatan UPA-BK UTM"
      role="Admin"
      name="Dr. Aminah"
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

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((s) => (
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
              {s.v}
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
            <BarChart data={viewsTrend}>
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
                  <stop offset="0%" stopColor="#89467F" />
                  <stop offset="100%" stopColor="#C77DBA" />
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
                data={artikelStatus}
                dataKey="v"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {artikelStatus.map((_, i) => (
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
            {artikelStatus.map((d, i) => (
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
        <div className="card-soft p-0 overflow-hidden">
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F9F2F4' }}>
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
                {recentArtikel.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t hover:bg-[var(--surface-sunken)] transition-colors"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <td className="px-6 py-3 flex items-center gap-2">
                      <FileText size={14} style={{ color: 'var(--primary)' }} />
                      <span className="font-medium">{r.title}</span>
                    </td>
                    <td
                      className="px-6 py-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Eye size={13} /> {r.views.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`badge ${
                          r.status === 'Published' ? 'badge-success' : 'badge-neutral'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kegiatan Terdekat */}
        <div className="card-soft p-0 overflow-hidden">
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F9F2F4' }}>
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
                {upcomingKegiatan.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t hover:bg-[var(--surface-sunken)] transition-colors"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <td className="px-6 py-3 font-medium">{r.title}</td>
                    <td
                      className="px-6 py-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={13} /> {r.date}
                      </span>
                    </td>
                    <td
                      className="px-6 py-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={13} /> {r.loc}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`badge ${
                          r.status === 'Akan Datang' ? 'badge-info' : 'badge-neutral'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
