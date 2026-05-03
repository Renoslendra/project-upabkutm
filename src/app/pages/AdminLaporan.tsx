import { Download, FileText, TrendingUp, CheckCircle2, Layers } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const trend = [
  { m: 'Nov', sesi: 52, hadir: 88 }, { m: 'Des', sesi: 48, hadir: 90 }, { m: 'Jan', sesi: 64, hadir: 92 },
  { m: 'Feb', sesi: 71, hadir: 89 }, { m: 'Mar', sesi: 82, hadir: 91 }, { m: 'Apr', sesi: 95, hadir: 93 },
];

export default function AdminLaporan() {
  return (
    <DashboardLayout items={adminItems} title="Laporan" subtitle="Insight bulanan & tahunan UPA-BK" role="Admin" name="Dr. Aminah">
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input type="date" className="input-field md:w-48" />
        <input type="date" className="input-field md:w-48" />
        <div className="md:ml-auto flex gap-2">
          <button className="btn-secondary"><FileText size={16} /> PDF</button>
          <button className="btn-primary"><Download size={16} /> Excel</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { Icon: TrendingUp, l: 'Total Sesi (bulan)', v: '95', delta: '+15%' },
          { Icon: CheckCircle2, l: 'Tingkat Kehadiran', v: '93%', delta: '+2%' },
          { Icon: Layers, l: 'Kategori Terbanyak', v: 'Akademik', delta: '35%' },
        ].map((s) => (
          <div key={s.l} className="card-soft">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                <s.Icon size={18} style={{ color: 'var(--primary-dark)' }} />
              </div>
              <span className="badge badge-success">{s.delta}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary-dark)' }}>{s.v}</div>
            <div className="eyebrow mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="card-soft mb-6">
        <h3 className="mb-4" style={{ fontSize: '1.1rem' }}>Trend Sesi & Kehadiran</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="m" stroke="#9A8D91" />
            <YAxis stroke="#9A8D91" />
            <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: 12, boxShadow: 'var(--shadow-md)' }} />
            <Line type="monotone" dataKey="sesi" stroke="#89467F" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="hadir" stroke="#7BC67E" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {[
          { t: 'Laporan Bulanan April', d: 'PDF · 24 halaman · 2.4 MB' },
          { t: 'Rekap Asesmen Q1 2026', d: 'Excel · 380 baris · 1.1 MB' },
          { t: 'Survey Kepuasan Mahasiswa', d: 'PDF · 18 halaman · 1.8 MB' },
          { t: 'Laporan Kehadiran Konselor', d: 'Excel · 92 baris · 0.5 MB' },
        ].map((r) => (
          <div key={r.t} className="card-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'var(--surface-sunken)' }}>
              <FileText size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontWeight: 500 }}>{r.t}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{r.d}</div>
            </div>
            <button className="btn-ghost p-2"><Download size={16} /></button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
