import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { adminItems } from './AdminDashboard';
import { ErrorNotice } from '../components/ErrorNotice';

type Kegiatan = {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  lokasi: string;
  deskripsi?: string;
  image_url?: string;
  status: 'Akan Datang' | 'Selesai';
};

const blankKegiatan = (): Kegiatan => ({
  id: 0,
  nama_kegiatan: '',
  tanggal: '',
  lokasi: '',
  deskripsi: '',
  image_url: '',
  status: 'Akan Datang',
});

export default function AdminKegiatan() {
  const [data, setData] = useState<Kegiatan[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState<Kegiatan>(blankKegiatan());
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  // Fetch kegiatan
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/api/admin/kegiatan`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error('Gagal memuat kegiatan.');
        }
        const result = await res.json();
        if (result.success) {
          setData(result.data || []);
        } else {
          throw new Error(result.message || 'Gagal memuat kegiatan.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Gagal memuat kegiatan.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const openCreate = () => {
    setFormData(blankKegiatan());
    setIsNew(true);
    setIsOpen(true);
  };

  const openEdit = (item: Kegiatan) => {
    setFormData(item);
    setIsNew(false);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.nama_kegiatan.trim() || !formData.tanggal.trim() || !formData.lokasi.trim()) {
      alert('Nama kegiatan, tanggal, dan lokasi harus diisi');
      return;
    }

    try {
      setError(null);
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? `${API_BASE_URL}/api/admin/kegiatan` : `${API_BASE_URL}/api/admin/kegiatan/${formData.id}`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        if (isNew) {
          setData([...data, result.data]);
        } else {
          setData(data.map((item) => (item.id === formData.id ? result.data : item)));
        }
        setIsOpen(false);
      } else {
        throw new Error(result.message || 'Gagal menyimpan kegiatan.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Gagal menyimpan kegiatan.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus?')) return;

    try {
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/admin/kegiatan/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (result.success) {
        setData(data.filter((item) => item.id !== id));
      } else {
        throw new Error(result.message || 'Gagal menghapus kegiatan.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Gagal menghapus kegiatan.');
    }
  };

  const filtered = data.filter((item) =>
    item.nama_kegiatan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout items={adminItems} title="Kelola Kegiatan" subtitle="Tambah, ubah, atau hapus acara dan kegiatan" role="Admin">
      <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            className="input-field pl-10 w-full"
            placeholder="Cari kegiatan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openCreate}>
          <Plus size={16} /> Tambah Kegiatan
        </button>
      </div>

      {error && <ErrorNotice message={error} className="mb-5" />}

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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                    Memuat kegiatan...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                    Tidak ada kegiatan ditemukan.
                  </td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-hover)]">
                  <td className="px-6 py-4 font-medium">{item.nama_kegiatan}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.tanggal}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.lokasi}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${item.status === 'Akan Datang' ? 'badge-info' : 'badge-neutral'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="p-2 btn-ghost rounded text-blue-600"
                      onClick={() => openEdit(item)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 btn-ghost rounded text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Tambah Kegiatan' : 'Edit Kegiatan'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Kegiatan</label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.nama_kegiatan}
                onChange={(e) => setFormData({ ...formData, nama_kegiatan: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tanggal</label>
              <input
                type="text"
                className="input-field w-full"
                placeholder="e.g., 15 Mei 2026"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lokasi</label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                className="input-field w-full"
                rows={3}
                value={formData.deskripsi || ''}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="input-field w-full"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Akan Datang' | 'Selesai' })}
              >
                <option>Akan Datang</option>
                <option>Selesai</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <button className="btn-ghost" onClick={() => setIsOpen(false)}>
              <X size={16} /> Batal
            </button>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Simpan
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
