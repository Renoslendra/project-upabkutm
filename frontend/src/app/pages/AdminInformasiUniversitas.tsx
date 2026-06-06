import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { adminItems } from './AdminDashboard';

type InformasiUniversitas = {
  id: number;
  judul: string;
  deskripsi: string;
  kategori: 'Libur Akademik' | 'Pengumuman' | 'Beasiswa' | 'Akademik' | 'Lainnya';
  link_edaran?: string;
  status: 'Aktif' | 'Nonaktif';
};

const blankInformasi = (): InformasiUniversitas => ({
  id: 0,
  judul: '',
  deskripsi: '',
  kategori: 'Pengumuman',
  link_edaran: '',
  status: 'Aktif',
});

export default function AdminInformasiUniversitas() {
  const [data, setData] = useState<InformasiUniversitas[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState<InformasiUniversitas>(blankInformasi());
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  // Fetch informasi universitas
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/admin/informasi-universitas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error('Error:', err);
        setError('Gagal memuat informasi');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const openCreate = () => {
    setFormData(blankInformasi());
    setIsNew(true);
    setError(null);
    setIsOpen(true);
  };

  const openEdit = (item: InformasiUniversitas) => {
    setFormData(item);
    setIsNew(false);
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.judul.trim() || !formData.deskripsi.trim()) {
      setError('Judul dan deskripsi harus diisi');
      return;
    }

    try {
      setError(null);
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew
        ? 'http://localhost:5000/api/admin/informasi-universitas'
        : `http://localhost:5000/api/admin/informasi-universitas/${formData.id}`;

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
        setError(result.message || 'Gagal menyimpan informasi');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Terjadi kesalahan saat menyimpan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus informasi ini?')) return;

    try {
      setError(null);
      const res = await fetch(`http://localhost:5000/api/admin/informasi-universitas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (result.success) {
        setData(data.filter((item) => item.id !== id));
      } else {
        setError(result.message || 'Gagal menghapus informasi');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Terjadi kesalahan saat menghapus');
    }
  };

  const filtered = data.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase()) ||
    item.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      items={adminItems}
      title="Kelola Informasi Universitas"
      subtitle="Kelola edaran, pengumuman, dan informasi penting universitas"
      role="Admin"
    >
      {error && (
        <div className="card-soft border border-red-300 bg-red-50 p-4 mb-5">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="card-soft p-10 text-center">
          <p className="text-[var(--text-secondary)]">Memuat informasi...</p>
        </div>
      ) : (
        <>
          <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            <div className="relative w-full max-w-sm">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
              <input
                className="input-field pl-10 w-full"
                placeholder="Cari informasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn-primary flex items-center gap-2 justify-center" onClick={openCreate}>
              <Plus size={16} /> Tambah Informasi
            </button>
          </div>

          <div className="card-soft p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9F2F4]">
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Judul Informasi</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Kategori</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Status</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Link Edaran</th>
                    <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                        Tidak ada informasi ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--surface-hover)]">
                        <td className="px-6 py-4 font-medium">{item.judul}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">
                          <span className="px-3 py-1 rounded-full bg-[var(--primary-fixed)] text-[var(--primary-dark)] text-xs font-medium">
                            {item.kategori}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`badge ${item.status === 'Aktif' ? 'badge-success' : 'badge-neutral'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">
                          {item.link_edaran ? (
                            <a
                              href={item.link_edaran}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs truncate"
                            >
                              Lihat
                            </a>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <button
                            className="p-2 btn-ghost rounded text-blue-600 hover:bg-blue-50"
                            onClick={() => openEdit(item)}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 btn-ghost rounded text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(item.id)}
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Tambah Informasi' : 'Edit Informasi'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium mb-1">Judul Informasi *</label>
              <input
                type="text"
                className="input-field w-full"
                placeholder="Contoh: Edaran Libur Semester"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi *</label>
              <textarea
                className="input-field w-full"
                rows={4}
                placeholder="Deskripsikan konten informasi ini secara detail..."
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kategori *</label>
                <select
                  className="input-field w-full"
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value as any })}
                >
                  <option value="Libur Akademik">Libur Akademik</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Beasiswa">Beasiswa</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status *</label>
                <select
                  className="input-field w-full"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Aktif' | 'Nonaktif' })}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link Edaran Resmi</label>
              <input
                type="text"
                className="input-field w-full"
                placeholder="https://example.com/edaran-libur"
                value={formData.link_edaran || ''}
                onChange={(e) => setFormData({ ...formData, link_edaran: e.target.value })}
              />
              <p className="text-xs text-[var(--text-tertiary)] mt-1">URL ke dokumen atau halaman edaran resmi</p>
            </div>
          </div>

          <DialogFooter>
            <button
              className="btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              Batal
            </button>
            <button
              className="btn-primary flex items-center gap-2"
              onClick={handleSave}
            >
              <Save size={16} /> {isNew ? 'Buat Informasi' : 'Simpan Perubahan'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
