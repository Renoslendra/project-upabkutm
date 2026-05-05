import { LayoutDashboard, Users, MessageCircle, CalendarDays, ClipboardList, BookOpen, FileText, FileBarChart, Bell, Settings, Download, Calendar as CalIcon, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const adminItems = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/asesmen', label: 'Asesmen Mahasiswa', Icon: ClipboardList },
  { to: '/admin/konseling', label: 'Data Konseling', Icon: FileText },
  { to: '/admin/artikel', label: 'Artikel & Edukasi', Icon: BookOpen },
  { to: '/admin/kegiatan', label: 'Kegiatan', Icon: Sparkles },
  { to: '/admin/laporan', label: 'Laporan', Icon: FileBarChart },
];

const barData = [
  { m: 'Jan', v: 45 }, { m: 'Feb', v: 62 }, { m: 'Mar', v: 78 }, { m: 'Apr', v: 95 },
  { m: 'Mei', v: 84 }, { m: 'Jun', v: 71 },
];
const pieData = [
  { n: 'Akademik', v: 35 }, { n: 'Kecemasan', v: 28 }, { n: 'Karier', v: 18 },
  { n: 'Keluarga', v: 12 }, { n: 'Lainnya', v: 7 },
];
const COLORS = ['#89467F', '#C77DBA', '#7B68AE', '#F0C674', '#7BC67E'];

export default function AdminDashboard() {
  return (
    <DashboardLayout items={adminItems} title="Dashboard Admin" subtitle="Overview UPA-BK UTM · April 2026" role="Admin" name="Dr. Aminah">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { l: 'Pendaftar Bulan Ini', v: '95', delta: '+12%', cls: 'badge-success' },
          { l: 'Sesi Selesai', v: '187', delta: '+8%', cls: 'badge-success' },
          { l: 'Artikel Published', v: '52', delta: '+3', cls: 'badge-info' },
          { l: 'Mahasiswa Blacklist', v: '2', delta: '0', cls: 'badge-neutral' },
        ].map((s) => (
          <div key={s.l} className="card-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow">{s.l}</div>
              <span className={`badge ${s.cls}`}>{s.delta}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.75rem', color: 'var(--primary-dark)' }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '1.1rem' }}>Pendaftar per Bulan</h3>
            <button className="btn-ghost text-sm"><Download size={14} /> Export</button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <XAxis dataKey="m" stroke="#9A8D91" />
              <YAxis stroke="#9A8D91" />
              <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: 12, boxShadow: 'var(--shadow-md)' }} />
              <Bar dataKey="v" fill="url(#g1)" radius={[8, 8, 0, 0]} />
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#89467F" /><stop offset="100%" stopColor="#C77DBA" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-soft">
          <h3 className="mb-4" style={{ fontSize: '1.1rem' }}>Kategori Masalah</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="v" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {pieData.map((d, i) => (
              <div key={d.n} className="flex justify-between text-xs">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} /> {d.n}</span>
                <span style={{ fontWeight: 600 }}>{d.v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Pendaftaran Terbaru</h3>
            <p className="text-sm">Daftar pendaftaran konseling 24 jam terakhir</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost text-sm"><CalIcon size={14} /> Filter</button>
            <button className="btn-secondary text-sm"><Download size={14} /> Export Laporan</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F9F2F4' }}>
                {['Tanggal', 'NIM', 'Nama', 'Jenis', 'Status', 'Aksi'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 eyebrow" style={{ color: 'var(--primary-dark)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { d: '29 Apr', n: '20210101', nm: 'Aulia Rahma', t: 'Online', s: 'Pending', cls: 'badge-warning' },
                { d: '29 Apr', n: '20210114', nm: 'Bagas Pratama', t: 'Offline', s: 'Confirmed', cls: 'badge-success' },
                { d: '28 Apr', n: '20210207', nm: 'Citra Ayu', t: 'Online', s: 'Completed', cls: 'badge-info' },
                { d: '28 Apr', n: '20210298', nm: 'Dimas R.', t: 'Online', s: 'Cancelled', cls: 'badge-error' },
                { d: '27 Apr', n: '20210332', nm: 'Erika W.', t: 'Offline', s: 'Confirmed', cls: 'badge-success' },
              ].map((r) => (
                <tr key={r.n} className="border-t hover:bg-[var(--surface-sunken)] transition-colors" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{r.d}</td>
                  <td className="px-6 py-3" style={{ fontWeight: 500 }}>{r.n}</td>
                  <td className="px-6 py-3">{r.nm}</td>
                  <td className="px-6 py-3"><span className="badge badge-neutral">{r.t}</span></td>
                  <td className="px-6 py-3"><span className={`badge ${r.cls}`}>{r.s}</span></td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1">
                      <button className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(123,198,126,0.15)', color: '#2F7B33' }}>Approve</button>
                      <button className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(186,26,26,0.10)', color: 'var(--error)' }}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
