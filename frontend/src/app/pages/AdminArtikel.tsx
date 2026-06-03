import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { adminItems } from './AdminDashboard';

type Artikel = {
  id: number;
  judul: string;
  kategori?: string;
  excerpt?: string;
  konten?: string;
  image_url?: string;
  views: number;
  status: 'Published' | 'Draft';
};

const blankArtikel = (): Artikel => ({
  id: 0,
  judul: '',
  kategori: '',
  excerpt: '',
  konten: '',
  image_url: '',
  views: 0,
  status: 'Draft',
});

export default function AdminArtikel() {
  const [data, setData] = useState<Artikel[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState<Artikel>(blankArtikel());
  const token = localStorage.getItem('token');

  // Fetch artikel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/artikel', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const openCreate = () => {
    setFormData(blankArtikel());
    setIsNew(true);
    setIsOpen(true);
  };

  const openEdit = (item: Artikel) => {
    setFormData(item);
    setIsNew(false);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.judul.trim()) {
      alert('Judul artikel harus diisi');
      return;
    }

    try {
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? 'http://localhost:5000/api/admin/artikel' : `http://localhost:5000/api/admin/artikel/${formData.id}`;

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
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/artikel/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (result.success) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const filtered = data.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout items={adminItems} title="Kelola Artikel & Edukasi" subtitle="Tambah, ubah, atau hapus artikel edukasi" role="Admin">
      <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            className="input-field pl-10 w-full"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openCreate}>
          <Plus size={16} /> Tambah Artikel
        </button>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F9F2F4]">
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Judul Artikel</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Kategori</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Views</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Status</th>
                <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-hover)]">
                  <td className="px-6 py-4 font-medium">{item.judul}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.kategori || '-'}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.views}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${item.status === 'Published' ? 'badge-success' : 'badge-neutral'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-2 btn-ghost rounded text-blue-600" onClick={() => openEdit(item)}>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Tambah Artikel' : 'Edit Artikel'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <input
                type="text"
                className="input-field w-full"
                placeholder="e.g., Edukasi"
                value={formData.kategori || ''}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <textarea
                className="input-field w-full"
                rows={2}
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Konten</label>
              <textarea
                className="input-field w-full"
                rows={4}
                value={formData.konten || ''}
                onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">URL Gambar</label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="input-field w-full"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
              >
                <option>Draft</option>
                <option>Published</option>
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