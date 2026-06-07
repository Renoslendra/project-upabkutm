import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { adminItems } from './AdminDashboard';
import { ErrorNotice } from '../components/ErrorNotice';

type Pimpinan = {
  id: number;
  nama: string;
  role: string;
  urutan: number;
  foto_url: string;
};

export default function AdminPimpinan() {
  const [data, setData] = useState<Pimpinan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState<Partial<Pimpinan>>({});
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const token = localStorage.getItem('token');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/pimpinan`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Gagal memuat data pimpinan.');
      }
      const result = await res.json();
      if (result.success) {
        setData(result.data || []);
      } else {
        throw new Error(result.message || 'Gagal memuat data pimpinan.');
      }
    } catch (err) {
      console.error('Error fetching:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat data pimpinan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setFormData({ nama: '', role: '', urutan: 1, foto_url: '' });
    setFotoFile(null);
    setIsNew(true);
    setIsOpen(true);
  };

  const openEdit = (item: Pimpinan) => {
    setFormData(item);
    setFotoFile(null);
    setIsNew(false);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.nama || !formData.role) return alert('Nama dan Jabatan wajib diisi');

    const payload = new FormData();
    payload.append('nama', formData.nama);
    payload.append('role', formData.role);
    payload.append('urutan', formData.urutan?.toString() || '1');
    if (fotoFile) payload.append('foto', fotoFile);
    if (!isNew && formData.foto_url) payload.append('foto_url_lama', formData.foto_url);

    try {
      setError(null);
      const url = isNew 
        ? `${API_BASE_URL}/api/pimpinan` 
        : `${API_BASE_URL}/api/pimpinan/${formData.id}`;
        
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { Authorization: `Bearer ${token}` }, // Tanpa Content-Type krn FormData browser yg set boundary
        body: payload,
      });

      const result = await res.json();
      if (result.success) {
        setIsOpen(false);
        fetchData();
      } else {
        setError(result.message || 'Gagal menyimpan data pimpinan.');
        alert(result.message || 'Gagal menyimpan data pimpinan.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan saat menyimpan data pimpinan.');
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus data pimpinan ini?')) return;
    try {
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/pimpinan/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        fetchData();
      } else {
        throw new Error(result.message || 'Gagal menghapus data pimpinan.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus data pimpinan.');
    }
  };

  return (
    <DashboardLayout items={adminItems} title="Kelola Pimpinan" subtitle="Atur daftar Rektor dan Wakil Rektor" role="Admin">
      <div className="card-soft p-6 mb-5 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Daftar Pimpinan UTM</h3>
        <button className="btn-primary flex items-center gap-2" onClick={openCreate}>
          <Plus size={16} /> Tambah Data
        </button>
      </div>

      {error && <ErrorNotice message={error} className="mb-5" />}

      {loading ? <div className="card-soft p-10 text-center animate-pulse">Memuat data...</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map(item => (
            <div key={item.id} className="card-soft p-0 overflow-hidden flex flex-col group">
              <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                {item.foto_url ? (
                  <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={40} className="text-slate-300" />
                )}
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  Urutan: {item.urutan}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">{item.nama}</h4>
                  <p className="text-sm text-slate-500 mb-4">{item.role}</p>
                </div>
                <div className="flex gap-2 pt-3 border-t border-slate-100 mt-auto">
                  <button className="flex-1 btn-ghost text-blue-600 bg-blue-50 py-1.5" onClick={() => openEdit(item)}>Edit</button>
                  <button className="flex-1 btn-ghost text-red-600 bg-red-50 py-1.5" onClick={() => handleDelete(item.id)}>Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{isNew ? 'Tambah Pimpinan' : 'Edit Pimpinan'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap & Gelar</label>
              <input type="text" className="input-field w-full" value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Jabatan / Role</label>
                <input type="text" className="input-field w-full" placeholder="Cth: Rektor" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
                <input type="number" className="input-field w-full" value={formData.urutan || 1} onChange={e => setFormData({...formData, urutan: Number(e.target.value)})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Foto Pimpinan</label>
              <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={e => { if (e.target.files) setFotoFile(e.target.files[0]) }} />
              <div className="flex gap-3 items-center">
                <button className="btn-secondary py-1.5 text-sm" onClick={() => fileInputRef.current?.click()}>Pilih Foto</button>
                <span className="text-xs text-slate-500 truncate">{fotoFile ? fotoFile.name : (formData.foto_url ? 'Gunakan foto lama' : 'Belum ada file dipilih')}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button className="btn-ghost" onClick={() => setIsOpen(false)}>Batal</button>
            <button className="btn-primary" onClick={handleSave}><Save size={16} className="mr-2 inline" /> Simpan</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
