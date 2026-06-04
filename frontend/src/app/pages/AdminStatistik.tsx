import { useMemo, useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Search } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

const API_BASE_URL = 'http://localhost:5000/api/admin/statistik';

type ProdiRow = {
  id: number;
  prodi: string;
  total: number;
  konseling: number;
  selesai: number;
};

const blankRow = (): ProdiRow => ({
  id: Date.now(),
  prodi: '',
  total: 0,
  konseling: 0,
  selesai: 0,
});

export default function AdminStatistik() {
  const [data, setData] = useState<ProdiRow[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<ProdiRow | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Gagal memuat data');
      const result = await response.json();
      setData(result.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
      console.error('Error fetching statistik:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(
    () =>
      data.filter((r) =>
        r.prodi.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  const totals = useMemo(() => {
    return data.reduce(
      (acc, r) => {
        acc.total += r.total;
        acc.konseling += r.konseling;
        acc.selesai += r.selesai;
        return acc;
      },
      { total: 0, konseling: 0, selesai: 0 }
    );
  }, [data]);

  const startEdit = (row: ProdiRow) => {
    setEditing({ ...row });
    setIsNew(false);
  };

  const startAdd = () => {
    setEditing(blankRow());
    setIsNew(true);
  };

  const cancel = () => {
    setEditing(null);
    setIsNew(false);
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.prodi.trim()) {
      setError('Nama program studi tidak boleh kosong');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      const token = getToken();
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? API_BASE_URL : `${API_BASE_URL}/${editing.id}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          prodi: editing.prodi.trim(),
          total: editing.total,
          konseling: editing.konseling,
          selesai: editing.selesai,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menyimpan data');
      }

      const result = await response.json();
      
      if (isNew) {
        setData((prev) => [result.data, ...prev]);
      } else {
        setData((prev) =>
          prev.map((r) => (r.id === editing.id ? result.data : r))
        );
      }

      cancel();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
      console.error('Error saving statistik:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      setIsDeleting(id);
      setError(null);
      const token = getToken();

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal menghapus data');
      }

      setData((prev) => prev.filter((r) => r.id !== id));
      if (editing?.id === id) cancel();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
      console.error('Error deleting statistik:', err);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <DashboardLayout
      items={adminItems}
      title="Kelola Statistik Prodi"
      subtitle="Atur data statistik manual konseling berdasarkan program studi"
      role="Admin"
      name="Dr. Aminah"
    >
      {/* Error message */}
      {error && (
        <div className="card-soft border border-red-300 bg-red-50 p-4 mb-5">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="card-soft p-10 text-center">
          <p className="text-[var(--text-secondary)]">Memuat data...</p>
        </div>
      ) : (
        <>
      {/* Ringkasan angka */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { l: 'Jumlah Prodi', v: data.length.toString(), cls: 'badge-info' },
          { l: 'Total Permintaan', v: totals.total.toLocaleString('id-ID'), cls: 'badge-neutral' },
          { l: 'Dalam Konseling', v: totals.konseling.toLocaleString('id-ID'), cls: 'badge-warning' },
          { l: 'Selesai', v: totals.selesai.toLocaleString('id-ID'), cls: 'badge-success' },
        ].map((s) => (
          <div key={s.l} className="card-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow">{s.l}</div>
              <span className={`badge ${s.cls}`}>•</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.75rem', color: 'var(--primary-dark)' }}>
              {s.v}
            </div>
          </div>
        ))}
      </div>

      {/* Search + action */}
      <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            className="input-field pl-10 w-full"
            placeholder="Cari program studi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary inline-flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed" onClick={startAdd} disabled={isSaving || isDeleting !== null}>
          <Plus size={16} /> Tambah Prodi
        </button>
      </div>

      {/* Form edit/tambah */}
      {editing && (
        <div className="card-soft p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{isNew ? 'Tambah Data Prodi' : 'Edit Data Prodi'}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Isi kolom dengan angka yang akurat — hanya angka non-negatif.
              </p>
            </div>
            <button className="btn-ghost p-2" onClick={cancel} aria-label="Tutup form">
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Program Studi</label>
              <input
                type="text"
                value={editing.prodi}
                onChange={(e) => setEditing({ ...editing, prodi: e.target.value })}
                className="input-field w-full"
                placeholder="Contoh: Psikologi"
              />
            </div>
            {(['total', 'konseling', 'selesai'] as const).map((field) => (
              <div key={field}>
                <label className="text-sm font-medium mb-2 block capitalize">{field}</label>
                <input
                  type="number"
                  min={0}
                  value={editing[field]}
                  onChange={(e) =>
                    setEditing({ ...editing, [field]: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="input-field w-full"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button 
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={save}
              disabled={isSaving}
            >
              <Save size={16} /> {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button className="btn-ghost" onClick={cancel} disabled={isSaving}>
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="card-soft p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F9F2F4]">
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Program Studi</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Total</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Konseling</th>
                <th className="text-left px-6 py-3 eyebrow text-[var(--primary-dark)]">Selesai</th>
                <th className="text-center px-6 py-3 eyebrow text-[var(--primary-dark)]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--surface-hover)]">
                  <td className="px-6 py-4 font-medium">{row.prodi}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{row.total}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{row.konseling}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{row.selesai}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="p-2 btn-ghost rounded text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => startEdit(row)}
                      title="Edit"
                      disabled={isDeleting !== null || isSaving}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 btn-ghost rounded text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => remove(row.id)}
                      title="Hapus"
                      disabled={isDeleting === row.id || isSaving}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                    Tidak ada data ditemukan.
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
