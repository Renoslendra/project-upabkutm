import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, Target, ListChecks, Upload } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

type Kepala = {
  id?: number;
  nama: string;
  spesialisasi: string;
  bio: string;
  foto: string;
};

type StaffMember = {
  id: number;
  nama: string;
  role: string;
  spesialisasi: string;
  bio: string;
  foto: string;
};

const blankStaff = (): StaffMember => ({
  id: 0,
  nama: '',
  role: '',
  spesialisasi: '',
  bio: '',
  foto: '',
});

type TabKey = 'visi-misi' | 'struktur';

export default function AdminProfil() {
  const [tab, setTab] = useState<TabKey>('visi-misi');
  const token = localStorage.getItem('token');

  // STATE ASLI DARI DATABASE
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState<string[]>([]);
  const [tujuan, setTujuan] = useState<string[]>([]); // TAMBAHAN TUJUAN
  const [kepala, setKepala] = useState<Kepala>({ nama: '', spesialisasi: '', bio: '', foto: '' });
  const [staff, setStaff] = useState<StaffMember[]>([]);

  // ================= 1. FETCH DATA =================
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const resVM = await fetch('http://localhost:5000/api/public/visi-misi');
        const vmData = await resVM.json();
        if (vmData.success) {
          const v = vmData.data.find((item: any) => item.kategori === 'visi');
          const mList = vmData.data.filter((item: any) => item.kategori === 'misi').map((item: any) => item.konten);
          const tList = vmData.data.filter((item: any) => item.kategori === 'tujuan').map((item: any) => item.konten); // FETCH TUJUAN
          
          if (v) setVisi(v.konten);
          if (mList.length > 0) setMisi(mList);
          if (tList.length > 0) setTujuan(tList);
        }

        const resStruktur = await fetch('http://localhost:5000/api/public/struktur-organisasi');
        const strukData = await resStruktur.json();
        if (strukData.success) {
          const k = strukData.data.find((item: any) => item.kategori === 'kepala');
          if (k) setKepala({ id: k.id, nama: k.nama, spesialisasi: k.spesialisasi || '', bio: k.bio || '', foto: k.foto_url || '' });
          
          const sList = strukData.data.filter((item: any) => item.kategori === 'staff').map((item: any) => ({
            id: item.id, nama: item.nama, role: item.role, spesialisasi: item.spesialisasi || '', bio: item.bio || '', foto: item.foto_url || ''
          }));
          setStaff(sList);
        }
      } catch (err) { console.error("Gagal load profil:", err); }
    };
    fetchProfil();
  }, []);

  // ================= 2. FUNGSI SIMPAN VISI MISI & TUJUAN =================
  const [vmEditing, setVmEditing] = useState(false);
  const [vmDraft, setVmDraft] = useState({ visi: '', misi: [] as string[], tujuan: [] as string[] });

  const startEditVM = () => { setVmDraft({ visi, misi: [...misi], tujuan: [...tujuan] }); setVmEditing(true); };
  const cancelVM = () => setVmEditing(false);
  const saveVM = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/profil/visi-misi', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          visi: vmDraft.visi, 
          misi: vmDraft.misi.filter((m) => m.trim()),
          tujuan: vmDraft.tujuan.filter((t) => t.trim()) 
        }),
      });
      const result = await res.json();
      if (result.success) {
        setVisi(vmDraft.visi);
        setMisi(vmDraft.misi.filter((m) => m.trim()));
        setTujuan(vmDraft.tujuan.filter((t) => t.trim()));
        setVmEditing(false);
      } else alert(result.message);
    } catch (err) { console.error(err); }
  };
  
  const updateArr = (type: 'misi' | 'tujuan', idx: number, val: string) => setVmDraft((p) => ({ ...p, [type]: p[type].map((item, i) => (i === idx ? val : item)) }));
  const addArr = (type: 'misi' | 'tujuan') => setVmDraft((p) => ({ ...p, [type]: [...p[type], ''] }));
  const removeArr = (type: 'misi' | 'tujuan', idx: number) => setVmDraft((p) => ({ ...p, [type]: p[type].filter((_, i) => i !== idx) }));

  // ================= 3. FUNGSI SIMPAN KEPALA (DENGAN FILE UPLOAD) =================
  const [kepalaEditing, setKepalaEditing] = useState(false);
  const [kepalaDraft, setKepalaDraft] = useState<Kepala>({ nama: '', spesialisasi: '', bio: '', foto: '' });
  const [kepalaFile, setKepalaFile] = useState<File | null>(null);

  const startEditKepala = () => { setKepalaDraft(kepala); setKepalaFile(null); setKepalaEditing(true); };
  const cancelKepala = () => { setKepalaEditing(false); setKepalaFile(null); };
  
  const saveKepala = async () => {
    const formData = new FormData();
    formData.append('nama', kepalaDraft.nama);
    formData.append('spesialisasi', kepalaDraft.spesialisasi);
    formData.append('bio', kepalaDraft.bio);
    formData.append('foto_url_lama', kepalaDraft.foto);
    if (kepalaFile) formData.append('foto', kepalaFile);

    try {
      const res = await fetch('http://localhost:5000/api/admin/profil/kepala', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }, // TANPA Content-Type agar browser otomatis set multipart
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setKepala({ ...kepalaDraft, foto: result.foto_url });
        setKepalaEditing(false);
      }
    } catch (err) { console.error(err); }
  };

  // ================= 4. FUNGSI SIMPAN STAFF (DENGAN FILE UPLOAD) =================
  const [staffDraft, setStaffDraft] = useState<StaffMember | null>(null);
  const [staffFile, setStaffFile] = useState<File | null>(null);
  const [staffIsNew, setStaffIsNew] = useState(false);

  const startAddStaff = () => { setStaffDraft(blankStaff()); setStaffFile(null); setStaffIsNew(true); };
  const startEditStaff = (s: StaffMember) => { setStaffDraft({ ...s }); setStaffFile(null); setStaffIsNew(false); };
  const cancelStaff = () => { setStaffDraft(null); setStaffFile(null); setStaffIsNew(false); };

  const saveStaff = async () => {
    if (!staffDraft || !staffDraft.nama.trim()) return;
    
    const formData = new FormData();
    formData.append('nama', staffDraft.nama);
    formData.append('role', staffDraft.role);
    formData.append('spesialisasi', staffDraft.spesialisasi);
    formData.append('bio', staffDraft.bio);
    formData.append('foto_url_lama', staffDraft.foto);
    if (staffFile) formData.append('foto', staffFile);

    try {
      const method = staffIsNew ? 'POST' : 'PUT';
      const url = staffIsNew ? 'http://localhost:5000/api/admin/profil/staff' : `http://localhost:5000/api/admin/profil/staff/${staffDraft.id}`;
      
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();
      
      if (result.success) {
        if (staffIsNew) {
          setStaff((prev) => [...prev, { ...staffDraft, id: result.data.insertId, foto: result.data.foto_url }]);
        } else {
          setStaff((prev) => prev.map((s) => (s.id === staffDraft.id ? { ...staffDraft, foto: result.foto_url } : s)));
        }
        cancelStaff();
      }
    } catch (err) { console.error(err); }
  };

  const removeStaff = async (id: number) => {
    if (!confirm('Yakin ingin menghapus staff ini?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/profil/staff/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if ((await res.json()).success) setStaff((prev) => prev.filter((s) => s.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <DashboardLayout items={adminItems} title="Kelola Profil" subtitle="Atur Visi, Misi, Kepala, dan Struktur Organisasi" role="Admin" name="Admin UPA-BK">
      
      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-1 rounded-full w-fit" style={{ background: 'var(--surface-sunken)' }}>
        <button onClick={() => setTab('visi-misi')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === 'visi-misi' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-[var(--text-secondary)] bg-transparent'}`}>Visi, Misi & Tujuan</button>
        <button onClick={() => setTab('struktur')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === 'struktur' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-[var(--text-secondary)] bg-transparent'}`}>Struktur Organisasi</button>
      </div>

      {/* VISI & MISI */}
      {tab === 'visi-misi' && (
        <div className="card-soft p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div><h3 className="text-lg font-semibold">Visi, Misi & Tujuan</h3></div>
            {!vmEditing ? (
              <button className="btn-secondary inline-flex items-center gap-2" onClick={startEditVM}><Edit size={16} /> Edit</button>
            ) : (
              <div className="flex gap-2">
                <button className="btn-primary inline-flex items-center gap-2" onClick={saveVM}><Save size={16} /> Simpan</button>
                <button className="btn-ghost" onClick={cancelVM}>Batal</button>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 flex items-center gap-2"><Eye size={14} style={{ color: 'var(--primary)' }} /> Visi</label>
            {vmEditing ? <textarea rows={3} value={vmDraft.visi} onChange={(e) => setVmDraft({ ...vmDraft, visi: e.target.value })} className="input-field w-full" /> : <p className="text-[var(--text-secondary)] leading-relaxed">{visi || "-"}</p>}
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 flex items-center gap-2"><Target size={14} style={{ color: 'var(--primary)' }} /> Misi</label>
            {vmEditing ? (
              <div className="space-y-2">
                {vmDraft.misi.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs bg-gray-200">{i + 1}</span>
                    <input type="text" value={m} onChange={(e) => updateArr('misi', i, e.target.value)} className="input-field flex-1" />
                    <button className="p-2 btn-ghost text-red-600" onClick={() => removeArr('misi', i)}><Trash2 size={16} /></button>
                  </div>
                ))}
                <button className="btn-ghost inline-flex items-center gap-2 text-sm" onClick={() => addArr('misi')}><Plus size={14} /> Tambah Misi</button>
              </div>
            ) : (
              <ol className="space-y-3 pl-5 list-decimal text-[var(--text-secondary)]">
                {misi.map((m, i) => <li key={i}>{m}</li>)}
              </ol>
            )}
          </div>

          {/* TAMBAHAN TUJUAN */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2"><ListChecks size={14} style={{ color: 'var(--primary)' }} /> Tujuan</label>
            {vmEditing ? (
              <div className="space-y-2">
                {vmDraft.tujuan.map((t, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs bg-gray-200">{i + 1}</span>
                    <input type="text" value={t} onChange={(e) => updateArr('tujuan', i, e.target.value)} className="input-field flex-1" />
                    <button className="p-2 btn-ghost text-red-600" onClick={() => removeArr('tujuan', i)}><Trash2 size={16} /></button>
                  </div>
                ))}
                <button className="btn-ghost inline-flex items-center gap-2 text-sm" onClick={() => addArr('tujuan')}><Plus size={14} /> Tambah Tujuan</button>
              </div>
            ) : (
              <ol className="space-y-3 pl-5 list-decimal text-[var(--text-secondary)]">
                {tujuan.map((t, i) => <li key={i}>{t}</li>)}
              </ol>
            )}
          </div>
        </div>
      )}

      {/* STRUKTUR ORGANISASI */}
      {tab === 'struktur' && (
        <>
          <div className="card-soft p-6 mb-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h3 className="text-lg font-semibold">Kepala UPA-BK</h3>
              {!kepalaEditing ? (
                <button className="btn-secondary inline-flex items-center gap-2" onClick={startEditKepala}><Edit size={16} /> Edit</button>
              ) : (
                <div className="flex gap-2">
                  <button className="btn-primary inline-flex items-center gap-2" onClick={saveKepala}><Save size={16} /> Simpan</button>
                  <button className="btn-ghost" onClick={cancelKepala}>Batal</button>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div><label className="text-sm font-medium mb-2 block">Nama</label><input type="text" value={kepalaEditing ? kepalaDraft.nama : kepala.nama} onChange={(e) => setKepalaDraft({ ...kepalaDraft, nama: e.target.value })} disabled={!kepalaEditing} className="input-field w-full" /></div>
              <div><label className="text-sm font-medium mb-2 block">Spesialisasi</label><input type="text" value={kepalaEditing ? kepalaDraft.spesialisasi : kepala.spesialisasi} onChange={(e) => setKepalaDraft({ ...kepalaDraft, spesialisasi: e.target.value })} disabled={!kepalaEditing} className="input-field w-full" /></div>
              <div className="md:col-span-2"><label className="text-sm font-medium mb-2 block">Bio / Deskripsi</label><textarea rows={3} value={kepalaEditing ? kepalaDraft.bio : kepala.bio} onChange={(e) => setKepalaDraft({ ...kepalaDraft, bio: e.target.value })} disabled={!kepalaEditing} className="input-field w-full" /></div>
              
              {/* INPUT FILE UPLOAD KEPALA */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Upload Foto Profil Baru (Maks 2MB)</label>
                <input type="file" accept="image/*" disabled={!kepalaEditing} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" onChange={(e) => { if (e.target.files) setKepalaFile(e.target.files[0]) }} />
                {kepala.foto && !kepalaEditing && <img src={kepala.foto} alt="Foto Kepala" className="mt-3 w-20 h-20 object-cover rounded-full border" />}
              </div>
            </div>
          </div>

          {/* DAFTAR STAFF */}
          <div className="card-soft p-6 mb-5 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Daftar Konselor / Staff</h3>
            <button className="btn-primary inline-flex items-center gap-2" onClick={startAddStaff}><Plus size={16} /> Tambah Staff</button>
          </div>

          {staffDraft && (
            <div className="card-soft p-6 mb-5 border-l-4 border-[var(--primary)]">
              <div className="flex justify-between mb-4"><h3 className="text-lg font-semibold">{staffIsNew ? 'Tambah Staff Baru' : 'Edit Staff'}</h3><button onClick={cancelStaff}><X size={18} /></button></div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="text-sm mb-2 block">Nama</label><input type="text" value={staffDraft.nama} onChange={(e) => setStaffDraft({ ...staffDraft, nama: e.target.value })} className="input-field w-full" /></div>
                <div><label className="text-sm mb-2 block">Jabatan / Role</label><input type="text" value={staffDraft.role} onChange={(e) => setStaffDraft({ ...staffDraft, role: e.target.value })} className="input-field w-full" /></div>
                <div><label className="text-sm mb-2 block">Spesialisasi</label><input type="text" value={staffDraft.spesialisasi} onChange={(e) => setStaffDraft({ ...staffDraft, spesialisasi: e.target.value })} className="input-field w-full" /></div>
                
                {/* TAMBAHAN BIO STAFF */}
                <div className="md:col-span-2"><label className="text-sm mb-2 block">Bio Singkat</label><textarea rows={2} value={staffDraft.bio} onChange={(e) => setStaffDraft({ ...staffDraft, bio: e.target.value })} className="input-field w-full" /></div>
                
                {/* INPUT FILE UPLOAD STAFF */}
                <div className="md:col-span-2">
                  <label className="text-sm mb-2 block">Upload Foto Staff</label>
                  <input type="file" accept="image/*" className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" onChange={(e) => { if (e.target.files) setStaffFile(e.target.files[0]) }} />
                </div>
              </div>
              <div className="mt-5 flex gap-3"><button className="btn-primary inline-flex items-center gap-2" onClick={saveStaff}><Save size={16} /> Simpan</button><button className="btn-ghost" onClick={cancelStaff}>Batal</button></div>
            </div>
          )}

          <div className="card-soft p-0 overflow-hidden overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#F5F3FF]"><tr><th className="px-6 py-3">Foto</th><th className="px-6 py-3">Nama</th><th className="px-6 py-3">Jabatan</th><th className="px-6 py-3">Bio</th><th className="px-6 py-3 text-center">Aksi</th></tr></thead>
              <tbody className="divide-y divide-[var(--border)]">
                {staff.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{s.foto ? <img src={s.foto} alt="Staff" className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs">No img</div>}</td>
                    <td className="px-6 py-4 font-medium">{s.nama}</td>
                    <td className="px-6 py-4 text-gray-500">{s.role}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{s.bio || '-'}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" onClick={() => startEditStaff(s)}><Edit size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded" onClick={() => removeStaff(s.id)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}