import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

const initialData = [
  { id: 1, title: 'Mengatasi Kecemasan Menjelang Ujian', views: 1250, status: 'Published' },
  { id: 2, title: 'Pentingnya Self-Care untuk Mahasiswa', views: 980, status: 'Published' },
  { id: 3, title: 'Mengenali Tanda-Tanda Burnt Out', views: 850, status: 'Draft' },
];

export default function AdminArtikel() {
  const [data, setData] = useState(initialData);

  return (
    <DashboardLayout items={adminItems} title="Kelola Artikel & Edukasi" subtitle="Tambah, ubah, atau hapus artikel edukasi" role="Admin" name="Dr. Aminah">
      <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input className="input-field pl-10 w-full" placeholder="Cari artikel..." />
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Tambah Artikel
        </button>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F9F2F4]">
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Judul Artikel</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Views</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Status</th>
                <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-hover)]">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.views}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${item.status === 'Published' ? 'badge-success' : 'badge-neutral'}`}>
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