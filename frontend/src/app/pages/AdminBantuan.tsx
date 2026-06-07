import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Phone, Mail, Clock } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';
import { ErrorNotice } from '../components/ErrorNotice';

type ContactInfo = {
  phone: string;
  email: string;
  jamLayanan: string;
};

type Faq = {
  id: number;
  q: string;
  a: string;
};

type TabKey = 'contact' | 'faq';

export default function AdminBantuan() {
  const [tab, setTab] = useState<TabKey>('contact');
  
  // Contact States
  const [contact, setContact] = useState<ContactInfo>({ phone: '', email: '', jamLayanan: '' });
  const [contactDraft, setContactDraft] = useState<ContactInfo>({ phone: '', email: '', jamLayanan: '' });
  const [contactEditing, setContactEditing] = useState(false);
  
  // FAQ States
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [faqDraft, setFaqDraft] = useState<Faq | null>(null);
  const [faqIsNew, setFaqIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');
  const API_FAQ_URL = `${API_BASE_URL}/api/admin/bantuan`;
  const API_KONTAK_URL = `${API_BASE_URL}/api/admin/bantuan/kontak`;

  // 1. Fetch data dari database saat pertama kali load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch Kontak
        const resKontak = await fetch(API_KONTAK_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resKontak.ok) {
          throw new Error('Gagal memuat data kontak.');
        }
        const resultKontak = await resKontak.json();
        if (resultKontak.success && resultKontak.data) {
          const mappedContact = {
            phone: resultKontak.data.telepon || '',
            email: resultKontak.data.email || '',
            jamLayanan: resultKontak.data.jam_layanan || '',
          };
          setContact(mappedContact);
          setContactDraft(mappedContact);
        }

        // Fetch FAQ
        const resFaq = await fetch(API_FAQ_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resFaq.ok) {
          throw new Error('Gagal memuat FAQ.');
        }
        const resultFaq = await resFaq.json();
        if (resultFaq.success) {
          const mappedFaqs = resultFaq.data.map((item: any) => ({
            id: item.id,
            q: item.pertanyaan,
            a: item.jawaban,
          }));
          setFaqs(mappedFaqs);
        }
      } catch (err) {
        console.error('Error fetching bantuan data:', err);
        setError(err instanceof Error ? err.message : 'Gagal memuat data bantuan.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Contact Actions
  const saveContact = async () => {
    try {
      setError(null);
      const res = await fetch(API_KONTAK_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          telepon: contactDraft.phone,
          email: contactDraft.email,
          jam_layanan: contactDraft.jamLayanan,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setContact(contactDraft);
        setContactEditing(false);
      } else {
        setError(result.message || 'Gagal menyimpan kontak');
        alert(result.message || 'Gagal menyimpan kontak');
      }
    } catch (err) {
      console.error('Error saving contact:', err);
      setError('Terjadi kesalahan jaringan saat menyimpan kontak');
      alert('Terjadi kesalahan jaringan');
    }
  };

  const cancelContact = () => {
    setContactDraft(contact);
    setContactEditing(false);
  };

  // FAQ Actions
  const blankFaq = (): Faq => ({ id: 0, q: '', a: '' });

  const startAddFaq = () => {
    setFaqDraft(blankFaq());
    setFaqIsNew(true);
  };

  const startEditFaq = (f: Faq) => {
    setFaqDraft({ ...f });
    setFaqIsNew(false);
  };

  const cancelFaq = () => {
    setFaqDraft(null);
    setFaqIsNew(false);
  };

  const saveFaq = async () => {
    if (!faqDraft || !faqDraft.q.trim() || !faqDraft.a.trim()) {
      alert('Pertanyaan dan jawaban harus diisi');
      return;
    }
    try {
      setError(null);
      const method = faqIsNew ? 'POST' : 'PUT';
      const url = faqIsNew ? API_FAQ_URL : `${API_FAQ_URL}/${faqDraft.id}`;
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pertanyaan: faqDraft.q,
          jawaban: faqDraft.a,
        }),
      });
      const result = await res.json();
      
      if (result.success) {
        const savedFaq = {
          id: result.data.id || faqDraft.id,
          q: result.data.pertanyaan || faqDraft.q,
          a: result.data.jawaban || faqDraft.a,
        };

        if (faqIsNew) {
          setFaqs((prev) => [savedFaq, ...prev]);
        } else {
          setFaqs((prev) => prev.map((f) => (f.id === savedFaq.id ? savedFaq : f)));
        }
        cancelFaq();
      } else {
        setError(result.message || 'Gagal menyimpan FAQ');
        alert(result.message || 'Gagal menyimpan FAQ');
      }
    } catch (err) {
      console.error('Error saving faq:', err);
      setError('Terjadi kesalahan jaringan saat menyimpan FAQ');
      alert('Terjadi kesalahan jaringan');
    }
  };

  const removeFaq = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) return;
    try {
      setError(null);
      const res = await fetch(`${API_FAQ_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        if (faqDraft?.id === id) cancelFaq();
      } else {
        setError(result.message || 'Gagal menghapus FAQ');
        alert(result.message || 'Gagal menghapus FAQ');
      }
    } catch (err) {
      console.error('Error deleting faq:', err);
      setError('Terjadi kesalahan jaringan saat menghapus FAQ');
      alert('Terjadi kesalahan jaringan');
    }
  };

  return (
    <DashboardLayout
      items={adminItems}
      title="Kelola Bantuan"
      subtitle="Atur Contact Person dan daftar FAQ yang tampil di halaman Bantuan"
      role="Admin"
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-1 rounded-full w-fit" style={{ background: 'var(--surface-sunken)' }}>
        {([
          { k: 'contact', label: 'Contact Person' },
          { k: 'faq', label: 'FAQ' },
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

      {error && <ErrorNotice message={error} className="mb-5" />}

      {/* Contact Person */}
      {tab === 'contact' && (
        <div className="card-soft p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-semibold">Informasi Kontak Resmi</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Tampil di halaman <strong>/bantuan/cp</strong>.
              </p>
            </div>
            {!contactEditing ? (
              <button
                className="btn-secondary inline-flex items-center gap-2"
                onClick={() => {
                  setContactDraft(contact);
                  setContactEditing(true);
                }}
              >
                <Edit size={16} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button className="btn-primary inline-flex items-center gap-2" onClick={saveContact}>
                  <Save size={16} /> Simpan
                </button>
                <button className="btn-ghost" onClick={cancelContact}>
                  Batal
                </button>
              </div>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Telepon */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={14} style={{ color: 'var(--primary)' }} /> Telepon
              </label>
              <input
                type="text"
                value={contactEditing ? contactDraft.phone : contact.phone}
                onChange={(e) => setContactDraft({ ...contactDraft, phone: e.target.value })}
                className="input-field w-full"
                disabled={!contactEditing}
              />
            </div>
            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={14} style={{ color: 'var(--primary)' }} /> Email
              </label>
              <input
                type="email"
                value={contactEditing ? contactDraft.email : contact.email}
                onChange={(e) => setContactDraft({ ...contactDraft, email: e.target.value })}
                className="input-field w-full"
                disabled={!contactEditing}
              />
            </div>
            {/* Jam Layanan */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={14} style={{ color: 'var(--primary)' }} /> Jam Layanan
              </label>
              <input
                type="text"
                value={contactEditing ? contactDraft.jamLayanan : contact.jamLayanan}
                onChange={(e) => setContactDraft({ ...contactDraft, jamLayanan: e.target.value })}
                className="input-field w-full"
                disabled={!contactEditing}
              />
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {tab === 'faq' && (
        <>
          <div className="card-soft p-6 mb-5 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            <div>
              <h3 className="text-lg font-semibold">Daftar FAQ</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Total: <strong>{faqs.length}</strong> pertanyaan.
              </p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 justify-center" onClick={startAddFaq}>
              <Plus size={16} /> Tambah FAQ
            </button>
          </div>

          {faqDraft && (
            <div className="card-soft p-6 mb-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {faqIsNew ? 'Tambah Pertanyaan' : 'Edit Pertanyaan'}
                </h3>
                <button className="btn-ghost p-2" onClick={cancelFaq} aria-label="Tutup form">
                  <X size={18} />
                </button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Pertanyaan</label>
                  <input
                    type="text"
                    value={faqDraft.q}
                    onChange={(e) => setFaqDraft({ ...faqDraft, q: e.target.value })}
                    className="input-field w-full"
                    placeholder="Contoh: Apakah layanan konseling ini gratis?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Jawaban</label>
                  <textarea
                    rows={4}
                    value={faqDraft.a}
                    onChange={(e) => setFaqDraft({ ...faqDraft, a: e.target.value })}
                    className="input-field w-full"
                    placeholder="Tuliskan jawaban yang jelas dan singkat"
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="btn-primary inline-flex items-center gap-2" onClick={saveFaq}>
                  <Save size={16} /> Simpan
                </button>
                <button className="btn-ghost" onClick={cancelFaq}>
                  Batal
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {loading ? (
              <div className="card-soft p-10 text-center text-[var(--text-secondary)] animate-pulse">
                Memuat data dari database...
              </div>
            ) : faqs.map((f) => (
              <div key={f.id} className="card-soft p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>
                      {f.q}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {f.a}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      className="p-2 btn-ghost rounded text-blue-600"
                      onClick={() => startEditFaq(f)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 btn-ghost rounded text-red-600"
                      onClick={() => removeFaq(f.id)}
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!loading && faqs.length === 0 && (
              <div className="card-soft p-10 text-center text-[var(--text-secondary)]">
                Belum ada FAQ. Tambahkan pertanyaan pertama.
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
