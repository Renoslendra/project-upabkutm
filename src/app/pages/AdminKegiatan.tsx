import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

const initialData = [
  { id: 1, title: 'Webinar Kesehatan Mental 2026', date: '15 Mei 2026', location: 'Zoom Meeting', status: 'Akan Datang' },
  { id: 2, title: 'Pelatihan Peer Counselor', date: '02 Jun 2026', location: 'Gedung Rektorat Lt.4', status: 'Akan Datang' },
  { id: 3, title: 'Sosialisasi Anti-Bullying', date: '10 Apr 2026', location: 'Auditorium UTM', status: 'Selesai' },
];

export default function AdminKegiatan() {
  const [data, setData] = useState(initialData);

  return (
    <DashboardLayout items={adminItems} title="Kelola Kegiatan" subtitle="Tambah, ubah, atau hapus acara dan kegiatan" role="Admin" name="Dr. Aminah">
      <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input className="input-field pl-10 w-full" placeholder="Cari kegiatan..." />
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Tambah Kegiatan
        </button>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F9F2F4]">
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Nama Kegiatan</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Tanggal</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Lokasi</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Status</th>
                <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-hover)]">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.date}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.location}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${item.status === 'Akan Datang' ? 'badge-info' : 'badge-neutral'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-2 btn-ghost rounded text-blue-600" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 btn-ghost rounded text-red-600" title="Hapus">
                      <Trash2 size={16} />
                    </button>
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