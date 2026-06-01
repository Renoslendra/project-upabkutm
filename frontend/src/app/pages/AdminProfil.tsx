import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, Target } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

type Kepala = {
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
  foto: string;
};

const initialKepala: Kepala = {
  nama: 'Dr. Aminah, M.Psi',
  spesialisasi: 'Psikologi Klinis',
  bio: 'Lebih dari 15 tahun pengalaman dalam layanan bimbingan dan konseling perguruan tinggi.',
  foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
};

const initialStaff: StaffMember[] = [
  { id: 1, nama: 'Rifqi Ardian, M.Psi', role: 'Konselor Senior', spesialisasi: 'Konseling Akademik', foto: '' },
  { id: 2, nama: 'Sari Pratiwi, M.Psi', role: 'Konselor', spesialisasi: 'Anxiety & Depression', foto: '' },
  { id: 3, nama: 'Bagus Wirawan, M.Psi', role: 'Konselor', spesialisasi: 'Career & Life Coaching', foto: '' },
];

const initialVisi =
  'Menjadi pusat layanan bimbingan dan konseling unggul yang adaptif terhadap kebutuhan mahasiswa.';

const initialMisi = [
  'Menyediakan layanan konseling individu & kelompok berkualitas.',
  'Melaksanakan asesmen kesehatan mental berkala.',
  'Mengedukasi mahasiswa melalui artikel & workshop.',
  'Berkolaborasi dengan unit kampus untuk lingkungan suportif.',
];

type TabKey = 'visi-misi' | 'struktur';

const blankStaff = (): StaffMember => ({
  id: Date.now(),
  nama: '',
  role: '',
  spesialisasi: '',
  foto: '',
});

export default function AdminProfil() {
  const [tab, setTab] = useState<TabKey>('visi-misi');

  // Visi & Misi
  const [visi, setVisi] = useState(initialVisi);
  const [misi, setMisi] = useState<string[]>(initialMisi);
  const [vmEditing, setVmEditing] = useState(false);
  const [vmDraft, setVmDraft] = useState({ visi, misi: [...misi] });

  const startEditVM = () => {
    setVmDraft({ visi, misi: [...misi] });
    setVmEditing(true);
  };
  const cancelVM = () => setVmEditing(false);
  const saveVM = () => {
    setVisi(vmDraft.visi);
    setMisi(vmDraft.misi.filter((m) => m.trim()));
    setVmEditing(false);
  };
  const updateMisi = (idx: number, val: string) => {
    setVmDraft((prev) => ({
      ...prev,
      misi: prev.misi.map((m, i) => (i === idx ? val : m)),
    }));
  };
  const addMisi = () => setVmDraft((prev) => ({ ...prev, misi: [...prev.misi, ''] }));
  const removeMisi = (idx: number) =>
    setVmDraft((prev) => ({ ...prev, misi: prev.misi.filter((_, i) => i !== idx) }));

  // Kepala
  const [kepala, setKepala] = useState<Kepala>(initialKepala);
  const [kepalaEditing, setKepalaEditing] = useState(false);
  const [kepalaDraft, setKepalaDraft] = useState<Kepala>(initialKepala);

  const startEditKepala = () => {
    setKepalaDraft(kepala);
    setKepalaEditing(true);
  };
  const cancelKepala = () => setKepalaEditing(false);
  const saveKepala = () => {
    setKepala(kepalaDraft);
    setKepalaEditing(false);
  };

  // Staff
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [staffDraft, setStaffDraft] = useState<StaffMember | null>(null);
  const [staffIsNew, setStaffIsNew] = useState(false);

  const startAddStaff = () => {
    setStaffDraft(blankStaff());
    setStaffIsNew(true);
  };
  const startEditStaff = (s: StaffMember) => {
    setStaffDraft({ ...s });
    setStaffIsNew(false);
  };
  const cancelStaff = () => {
    setStaffDraft(null);
    setStaffIsNew(false);
  };
  const saveStaff = () => {
    if (!staffDraft || !staffDraft.nama.trim()) return;
    if (staffIsNew) {
      setStaff((prev) => [...prev, { ...staffDraft, id: Date.now() }]);
    } else {
      setStaff((prev) => prev.map((s) => (s.id === staffDraft.id ? staffDraft : s)));
    }
    cancelStaff();
  };
  const removeStaff = (id: number) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    if (staffDraft?.id === id) cancelStaff();
  };

  return (
    <DashboardLayout
      items={adminItems}
      title="Kelola Profil"
      subtitle="Atur Visi, Misi, Kepala, dan Struktur Organisasi UPA-BK"
      role="Admin"
      name="Dr. Aminah"
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-1 rounded-full w-fit" style={{ background: 'var(--surface-sunken)' }}>
        {([
          { k: 'visi-misi', label: 'Visi & Misi' },
          { k: 'struktur', label: 'Struktur Organisasi' },
        ] as { k: TabKey; label: string }[]).map((t) => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: active ? 'white' : 'transparent',
                color: active ? 'var(--primary)' : 'var(--text-secondary)',
                boxShadow: active ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* VISI & MISI */}
      {tab === 'visi-misi' && (
        <div className="card-soft p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-semibold">Visi & Misi</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Tampil di halaman <strong>/tentang</strong> bagian Visi-Misi.
              </p>
            </div>
            {!vmEditing ? (
              <button className="btn-secondary inline-flex items-center gap-2" onClick={startEditVM}>
                <Edit size={16} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button className="btn-primary inline-flex items-center gap-2" onClick={saveVM}>
                  <Save size={16} /> Simpan
                </button>
                <button className="btn-ghost" onClick={cancelVM}>
                  Batal
                </button>
              </div>
            )}
          </div>

          {/* Visi */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Eye size={14} style={{ color: 'var(--primary)' }} /> Visi
            </label>
            {vmEditing ? (
              <textarea
                rows={3}
                value={vmDraft.visi}
                onChange={(e) => setVmDraft({ ...vmDraft, visi: e.target.value })}
                className="input-field w-full"
              />
            ) : (
              <p className="text-[var(--text-secondary)] leading-relaxed">{visi}</p>
            )}
          </div>

          {/* Misi */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Target size={14} style={{ color: 'var(--primary)' }} /> Misi
            </label>
            {vmEditing ? (
              <div className="space-y-2">
                {vmDraft.misi.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs"
                      style={{ background: 'var(--primary-gradient)', color: 'white', fontWeight: 600 }}
                    >
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      value={m}
                      onChange={(e) => updateMisi(i, e.target.value)}
                      className="input-field flex-1"
                      placeholder="Tuliskan poin misi"
                    />
                    <button
                      className="p-2 btn-ghost rounded text-red-600"
                      onClick={() => removeMisi(i)}
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button className="btn-ghost inline-flex items-center gap-2 text-sm" onClick={addMisi}>
                  <Plus size={14} /> Tambah poin misi
                </button>
              </div>
            ) : (
              <ol className="space-y-3">
                {misi.map((m, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs"
                      style={{ background: 'var(--primary-gradient)', color: 'white', fontWeight: 600 }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{m}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}

      {/* STRUKTUR ORGANISASI */}
      {tab === 'struktur' && (
        <>
          {/* Kepala UPA-BK */}
          <div className="card-soft p-6 mb-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-semibold">Kepala UPA-BK</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Profil kepala unit yang tampil di halaman Tentang.
                </p>
              </div>
              {!kepalaEditing ? (
                <button className="btn-secondary inline-flex items-center gap-2" onClick={startEditKepala}>
                  <Edit size={16} /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button className="btn-primary inline-flex items-center gap-2" onClick={saveKepala}>
                    <Save size={16} /> Simpan
                  </button>
                  <button className="btn-ghost" onClick={cancelKepala}>
                    Batal
                  </button>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Nama</label>
                <input
                  type="text"
                  value={kepalaEditing ? kepalaDraft.nama : kepala.nama}
                  onChange={(e) => setKepalaDraft({ ...kepalaDraft, nama: e.target.value })}
                  disabled={!kepalaEditing}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Spesialisasi</label>
                <input
                  type="text"
                  value={kepalaEditing ? kepalaDraft.spesialisasi : kepala.spesialisasi}
                  onChange={(e) => setKepalaDraft({ ...kepalaDraft, spesialisasi: e.target.value })}
                  disabled={!kepalaEditing}
                  className="input-field w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Bio / Deskripsi</label>
                <textarea
                  rows={3}
                  value={kepalaEditing ? kepalaDraft.bio : kepala.bio}
                  onChange={(e) => setKepalaDraft({ ...kepalaDraft, bio: e.target.value })}
                  disabled={!kepalaEditing}
                  className="input-field w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">URL Foto (opsional)</label>
                <input
                  type="text"
                  value={kepalaEditing ? kepalaDraft.foto : kepala.foto}
                  onChange={(e) => setKepalaDraft({ ...kepalaDraft, foto: e.target.value })}
                  disabled={!kepalaEditing}
                  className="input-field w-full"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Daftar Staff */}
          <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            <div>
              <h3 className="text-lg font-semibold">Daftar Konselor / Staff</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Total: <strong>{staff.length}</strong> anggota.
              </p>
            </div>
            <button
              className="btn-primary inline-flex items-center gap-2 justify-center"
              onClick={startAddStaff}
            >
              <Plus size={16} /> Tambah Staff
            </button>
          </div>

          {staffDraft && (
            <div className="card-soft p-6 mb-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {staffIsNew ? 'Tambah Staff Baru' : 'Edit Staff'}
                </h3>
                <button className="btn-ghost p-2" onClick={cancelStaff} aria-label="Tutup form">
                  <X size={18} />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nama</label>
                  <input
                    type="text"
                    value={staffDraft.nama}
                    onChange={(e) => setStaffDraft({ ...staffDraft, nama: e.target.value })}
                    className="input-field w-full"
                    placeholder="Contoh: Dr. Budi, M.Psi"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Jabatan / Role</label>
                  <input
                    type="text"
                    value={staffDraft.role}
                    onChange={(e) => setStaffDraft({ ...staffDraft, role: e.target.value })}
                    className="input-field w-full"
                    placeholder="Contoh: Konselor Senior"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Spesialisasi</label>
                  <input
                    type="text"
                    value={staffDraft.spesialisasi}
                    onChange={(e) => setStaffDraft({ ...staffDraft, spesialisasi: e.target.value })}
                    className="input-field w-full"
                    placeholder="Contoh: Anxiety & Depression"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">URL Foto (opsional)</label>
                  <input
                    type="text"
                    value={staffDraft.foto}
                    onChange={(e) => setStaffDraft({ ...staffDraft, foto: e.target.value })}
                    className="input-field w-full"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="btn-primary inline-flex items-center gap-2" onClick={saveStaff}>
                  <Save size={16} /> Simpan
                </button>
                <button className="btn-ghost" onClick={cancelStaff}>
                  Batal
                </button>
              </div>
            </div>
          )}

          <div className="card-soft p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9F2F4]">
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Nama</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Jabatan</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Spesialisasi</th>
                    <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {staff.map((s) => (
                    <tr key={s.id} className="hover:bg-[var(--surface-hover)]">
                      <td className="px-6 py-4 font-medium">{s.nama}</td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{s.role}</td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{s.spesialisasi}</td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          className="p-2 btn-ghost rounded text-blue-600"
                          onClick={() => startEditStaff(s)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 btn-ghost rounded text-red-600"
                          onClick={() => removeStaff(s.id)}
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {staff.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                        Belum ada staff terdaftar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
