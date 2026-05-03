import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

const data = [
  { nim: '20210101', n: 'Aulia Rahma', d: 14, k: 18, s: 22, total: 54, lvl: 'Sedang', cls: 'badge-warning', date: '24 Apr' },
  { nim: '20210114', n: 'Bagas Pratama', d: 8, k: 6, s: 10, total: 24, lvl: 'Normal', cls: 'badge-success', date: '23 Apr' },
  { nim: '20210207', n: 'Citra Ayu', d: 26, k: 24, s: 30, total: 80, lvl: 'Berat', cls: 'badge-error', date: '22 Apr' },
  { nim: '20210298', n: 'Dimas R.', d: 10, k: 12, s: 8, total: 30, lvl: 'Normal', cls: 'badge-success', date: '21 Apr' },
  { nim: '20210332', n: 'Erika W.', d: 18, k: 16, s: 14, total: 48, lvl: 'Sedang', cls: 'badge-warning', date: '20 Apr' },
];

export default function AdminAsesmen() {
  return (
    <DashboardLayout items={adminItems} title="Asesmen Mahasiswa" subtitle="Data asesmen DASS-21" role="Admin" name="Dr. Aminah">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { l: 'Normal', v: '142', cls: 'badge-success' },
          { l: 'Sedang', v: '68', cls: 'badge-warning' },
          { l: 'Berat', v: '12', cls: 'badge-error' },
          { l: 'Total Asesmen', v: '222', cls: 'badge-info' },
        ].map((s) => (
          <div key={s.l} className="card-soft">
            <div className="flex justify-between mb-3"><span className="eyebrow">{s.l}</span><span className={`badge ${s.cls}`}>•</span></div>
            <div style={{ fontWeight: 700, fontSize: '1.75rem', color: 'var(--primary-dark)' }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3">
        <input type="date" className="input-field md:w-48" />
        <select className="input-field md:w-48"><option>Semua Fakultas</option></select>
        <select className="input-field md:w-48"><option>Semua Severity</option><option>Normal</option><option>Sedang</option><option>Berat</option></select>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F9F2F4' }}>
                {['NIM', 'Nama', 'Depresi', 'Kecemasan', 'Stres', 'Total', 'Level', 'Tanggal'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 eyebrow" style={{ color: 'var(--primary-dark)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.nim} className="border-t hover:bg-[var(--surface-sunken)] cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-6 py-3" style={{ fontWeight: 500 }}>{r.nim}</td>
                  <td className="px-6 py-3">{r.n}</td>
                  <td className="px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{r.d}</td>
                  <td className="px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{r.k}</td>
                  <td className="px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{r.s}</td>
                  <td className="px-6 py-3" style={{ fontWeight: 600 }}>{r.total}</td>
                  <td className="px-6 py-3"><span className={`badge ${r.cls}`}>{r.lvl}</span></td>
                  <td className="px-6 py-3" style={{ color: 'var(--text-tertiary)' }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
