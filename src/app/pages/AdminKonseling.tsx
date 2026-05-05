import { useState } from 'react';
import { Search, Plus, Save, Trash2, Edit } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

type KonselingRecord = {
  id: number;
  nama: string;
  identitas: {
    usia: string;
    tanggalSesi: string;
    konselor: string;
    catatan: string;
  };
  permasalahan: {
    deskripsi: string;
    kategori: string[];
  };
  latarBelakang: string;
  observasi: {
    ekspresi: string;
    bahasaTubuh: string;
    polaPikir: string;
  };
  analisis: string;
  intervensi: string[];
  hasil: string;
  tindakLanjut: {
    jadwal: string;
    tugas: string;
    saran: string;
  };
  catatan: string;
};

const initialRecords: KonselingRecord[] = [
  {
    id: 1,
    nama: 'Aulia Rahma',
    identitas: {
      usia: '20 tahun',
      tanggalSesi: '04 Mei 2026',
      konselor: 'Dr. Aminah',
      catatan: 'Inisial digunakan untuk menjaga privasi',
    },
    permasalahan: {
      deskripsi: 'Klien datang karena kecemasan terkait beban tugas dan tekanan akademik tinggi.',
      kategori: ['Stres Akademik', 'Perfeksionisme'],
    },
    latarBelakang: 'Masalah muncul sejak awal semester ketika jadwal tugas menumpuk dan klien merasa tidak punya jeda istirahat. Keluarga juga memberi tekanan nilai tinggi.',
    observasi: {
      ekspresi: 'Cemas, suara cepat',
      bahasaTubuh: 'Kaku, sering melipat tangan',
      polaPikir: 'Berpikir hitam-putih dan mudah merasa gagal',
    },
    analisis: 'Konselor menilai ada pola coping avoidant dan kecenderungan menginternalisasi kegagalan sebagai bentuk diri.',
    intervensi: ['Teknik tanya jawab', 'Cognitive restructuring', 'Relaksasi pernapasan', 'Problem solving'],
    hasil: 'Klien lebih lega, mulai menerima progres kecil, dan setuju membuat prioritas tugas yang lebih realistis.',
    tindakLanjut: {
      jadwal: 'Sesi berikutnya 11 Mei 2026',
      tugas: 'Journaling pemicu stres dan evaluasi sikap perfeksionis',
      saran: 'Coba latihan pernapasan setiap pagi dan batasi waktu belajar tanpa jeda.',
    },
    catatan: 'Perhatikan jika klien kembali membandingkan diri dengan teman sekelas.',
  },
  {
    id: 2,
    nama: 'Bagas Pratama',
    identitas: {
      usia: '21 tahun',
      tanggalSesi: '02 Mei 2026',
      konselor: 'Dr. Aminah',
      catatan: 'Nama lengkap hanya untuk administrasi internal.',
    },
    permasalahan: {
      deskripsi: 'Klien mengalami konflik keluarga yang memengaruhi fokus kuliah dan suasana hati.',
      kategori: ['Konflik Keluarga', 'Konsentrasi'],
    },
    latarBelakang: 'Permasalahan intens sejak bulan lalu ketika ayah dan ibu mulai menuntut pilihan jurusan berbeda.',
    observasi: {
      ekspresi: 'Sedih, terkadang datar',
      bahasaTubuh: 'Melihat ke bawah, tangan sering bermain pulpen',
      polaPikir: 'Ragu-ragu dan takut mengecewakan keluarga',
    },
    analisis: 'Konselor menilai klien terjebak antara kebutuhan diri dan harapan keluarga, menghasilkan kecemasan interpersonal.',
    intervensi: ['Teknik tanya jawab', 'Problem solving', 'Relaksasi', 'Checking nilai dukungan sosial'],
    hasil: 'Klien mulai menyadari batasannya dan merencanakan percakapan keluarga yang lebih tenang.',
    tindakLanjut: {
      jadwal: 'Sesi berikutnya 09 Mei 2026',
      tugas: 'Tuliskan harapan keluarga dan harapan diri secara terpisah',
      saran: 'Praktik asertif sederhana saat berdiskusi dengan orang tua.',
    },
    catatan: 'Catat perubahan komunikasi keluarga sebelum sesi berikutnya.',
  },
];

const createBlankRecord = (): KonselingRecord => ({
  id: Date.now(),
  nama: '',
  identitas: {
    usia: '',
    tanggalSesi: '',
    konselor: '',
    catatan: '',
  },
  permasalahan: {
    deskripsi: '',
    kategori: [],
  },
  latarBelakang: '',
  observasi: {
    ekspresi: '',
    bahasaTubuh: '',
    polaPikir: '',
  },
  analisis: '',
  intervensi: [],
  hasil: '',
  tindakLanjut: {
    jadwal: '',
    tugas: '',
    saran: '',
  },
  catatan: '',
});

const cloneRecord = (record: KonselingRecord): KonselingRecord => ({
  ...record,
  identitas: { ...record.identitas },
  permasalahan: { ...record.permasalahan, kategori: [...record.permasalahan.kategori] },
  observasi: { ...record.observasi },
  tindakLanjut: { ...record.tindakLanjut },
  intervensi: [...record.intervensi],
});

export default function AdminKonseling() {
  const [records, setRecords] = useState<KonselingRecord[]>(initialRecords);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [editRecord, setEditRecord] = useState<KonselingRecord>(() => cloneRecord(initialRecords[0]));
  const [isNew, setIsNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter((record) => record.nama.toLowerCase().includes(searchQuery.toLowerCase()));

  const selectRecord = (index: number) => {
    setSelectedIndex(index);
    setEditRecord(cloneRecord(records[index]));
    setIsNew(false);
  };

  const startNewRecord = () => {
    setSelectedIndex(null);
    setEditRecord(createBlankRecord());
    setIsNew(true);
  };

  const handleSave = () => {
    if (isNew) {
      const nextRecord = { ...editRecord, id: Date.now() };
      setRecords((prev) => [nextRecord, ...prev]);
      setSelectedIndex(0);
      setEditRecord(cloneRecord(nextRecord));
      setIsNew(false);
      return;
    }

    if (selectedIndex === null) return;

    setRecords((prev) => prev.map((item, index) => (index === selectedIndex ? cloneRecord(editRecord) : item)));
  };

  const handleDelete = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);

    if (selectedIndex === index) {
      if (updatedRecords.length === 0) {
        setSelectedIndex(null);
        setEditRecord(createBlankRecord());
        setIsNew(true);
      } else {
        const nextIndex = index >= updatedRecords.length ? updatedRecords.length - 1 : index;
        setSelectedIndex(nextIndex);
        setEditRecord(cloneRecord(updatedRecords[nextIndex]));
        setIsNew(false);
      }
    } else if (selectedIndex !== null && selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const updateField = (field: Partial<KonselingRecord>) => {
    setEditRecord((prev) => ({ ...prev, ...field }));
  };

  return (
    <DashboardLayout items={adminItems} title="Data Konseling" subtitle="Kelola rekam data konseling per mahasiswa" role="Admin" name="Dr. Aminah">
      <div className="grid gap-6">
        <div className="card-soft p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Data Konseling</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Tambah, edit, atau hapus rekam konseling mahasiswa secara cepat.</p>
          </div>
          <button className="btn-primary inline-flex items-center gap-2" onClick={startNewRecord}>
            <Plus size={16} /> Tambah Baru
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="card-soft p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="relative w-full max-w-sm">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 w-full"
                  placeholder="Cari mahasiswa..."
                />
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                Total rekam: <strong>{records.length}</strong>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9F2F4]">
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Nama</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Usia</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Tanggal</th>
                    <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Konselor</th>
                    <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredRecords.map((item) => {
                    const recordIndex = records.findIndex((record) => record.id === item.id);
                    const active = selectedIndex === recordIndex;
                    return (
                      <tr key={item.id} className={`hover:bg-[var(--surface-hover)] ${active ? 'bg-[var(--surface)]' : ''}`}>
                        <td className="px-6 py-4 font-medium">{item.nama}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{item.identitas.usia}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{item.identitas.tanggalSesi}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{item.identitas.konselor}</td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <button className="p-2 btn-ghost rounded text-blue-600" onClick={() => selectRecord(recordIndex)} title="Pilih">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 btn-ghost rounded text-red-600" onClick={() => handleDelete(recordIndex)} title="Hapus">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-[var(--text-secondary)]">Tidak ada data ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-soft p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold">Form Konseling</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">Simpan data baru atau perbarui data mahasiswa.</p>
              </div>
              <div className="space-y-2 text-sm">
                <div>{isNew ? 'Mode tambah' : 'Mode edit'}</div>
                <div>Nama: <strong>{editRecord.nama || 'Belum diisi'}</strong></div>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nama Mahasiswa</label>
                <input
                  type="text"
                  value={editRecord.nama}
                  onChange={(e) => updateField({ nama: e.target.value })}
                  className="input-field w-full"
                  placeholder="Masukkan nama atau inisial"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Usia</label>
                  <input
                    type="text"
                    value={editRecord.identitas.usia}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      identitas: { ...prev.identitas, usia: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: 20 tahun"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tanggal Sesi</label>
                  <input
                    type="text"
                    value={editRecord.identitas.tanggalSesi}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      identitas: { ...prev.identitas, tanggalSesi: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: 04 Mei 2026"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Konselor</label>
                  <input
                    type="text"
                    value={editRecord.identitas.konselor}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      identitas: { ...prev.identitas, konselor: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Dr. Aminah"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Catatan Privasi</label>
                  <input
                    type="text"
                    value={editRecord.identitas.catatan}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      identitas: { ...prev.identitas, catatan: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Opsional"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Permasalahan Utama</label>
                <textarea
                  rows={3}
                  value={editRecord.permasalahan.deskripsi}
                  onChange={(e) => setEditRecord((prev) => ({
                    ...prev,
                    permasalahan: { ...prev.permasalahan, deskripsi: e.target.value },
                  }))}
                  className="input-field w-full"
                  placeholder="Tuliskan alasan klien datang konseling"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Kategori Permasalahan</label>
                <input
                  type="text"
                  value={editRecord.permasalahan.kategori.join(', ')}
                  onChange={(e) => setEditRecord((prev) => ({
                    ...prev,
                    permasalahan: {
                      ...prev.permasalahan,
                      kategori: e.target.value.split(',').map((item) => item.trim()).filter(Boolean),
                    },
                  }))}
                  className="input-field w-full"
                  placeholder="Contoh: Stres Akademik, Overthinking"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Latar Belakang Masalah</label>
                <textarea
                  rows={3}
                  value={editRecord.latarBelakang}
                  onChange={(e) => updateField({ latarBelakang: e.target.value })}
                  className="input-field w-full"
                  placeholder="Tuliskan sejak kapan dan pemicu masalah"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ekspresi Emosi</label>
                  <input
                    type="text"
                    value={editRecord.observasi.ekspresi}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      observasi: { ...prev.observasi, ekspresi: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: cemas, sedih"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Bahasa Tubuh</label>
                  <input
                    type="text"
                    value={editRecord.observasi.bahasaTubuh}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      observasi: { ...prev.observasi, bahasaTubuh: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: duduk membungkuk"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Cara Berpikir</label>
                  <input
                    type="text"
                    value={editRecord.observasi.polaPikir}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      observasi: { ...prev.observasi, polaPikir: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: overthinking"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Analisis / Assessment</label>
                <textarea
                  rows={3}
                  value={editRecord.analisis}
                  onChange={(e) => updateField({ analisis: e.target.value })}
                  className="input-field w-full"
                  placeholder="Interpretasi konselor terhadap kondisi klien"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Intervensi / Teknik</label>
                <input
                  type="text"
                  value={editRecord.intervensi.join(', ')}
                  onChange={(e) => setEditRecord((prev) => ({
                    ...prev,
                    intervensi: e.target.value.split(',').map((item) => item.trim()).filter(Boolean),
                  }))}
                  className="input-field w-full"
                  placeholder="Contoh: Cognitive restructuring, relaksasi"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Hasil / Perkembangan</label>
                <textarea
                  rows={3}
                  value={editRecord.hasil}
                  onChange={(e) => updateField({ hasil: e.target.value })}
                  className="input-field w-full"
                  placeholder="Jelaskan perkembangan setelah sesi"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Jadwal Tindak Lanjut</label>
                  <input
                    type="text"
                    value={editRecord.tindakLanjut.jadwal}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      tindakLanjut: { ...prev.tindakLanjut, jadwal: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: 11 Mei 2026"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tugas Klien</label>
                  <input
                    type="text"
                    value={editRecord.tindakLanjut.tugas}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      tindakLanjut: { ...prev.tindakLanjut, tugas: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: journaling harian"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Saran Praktis</label>
                  <input
                    type="text"
                    value={editRecord.tindakLanjut.saran}
                    onChange={(e) => setEditRecord((prev) => ({
                      ...prev,
                      tindakLanjut: { ...prev.tindakLanjut, saran: e.target.value },
                    }))}
                    className="input-field w-full"
                    placeholder="Contoh: relaksasi sebelum tidur"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Catatan Tambahan</label>
                <textarea
                  rows={3}
                  value={editRecord.catatan}
                  onChange={(e) => updateField({ catatan: e.target.value })}
                  className="input-field w-full"
                  placeholder="Catatan penting untuk sesi berikutnya"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary inline-flex items-center gap-2" onClick={handleSave}>
                <Save size={16} /> Simpan
              </button>
              {selectedIndex !== null && !isNew && (
                <button className="btn-secondary inline-flex items-center gap-2" onClick={() => selectedIndex !== null && handleDelete(selectedIndex)}>
                  <Trash2 size={16} /> Hapus
                </button>
              )}
              <button className="btn-ghost inline-flex items-center gap-2" onClick={startNewRecord}>
                <Plus size={16} /> Baru
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
