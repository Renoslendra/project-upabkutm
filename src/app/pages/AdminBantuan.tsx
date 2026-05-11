import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Phone, Mail, Clock } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { adminItems } from './AdminDashboard';

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

const initialContact: ContactInfo = {
  phone: '(031) 3011146',
  email: 'upabk@trunojoyo.ac.id',
  jamLayanan: 'Senin–Jumat, 08.00–16.00 WIB',
};

const initialFaqs: Faq[] = [
  {
    id: 1,
    q: 'Apakah layanan konseling ini gratis untuk mahasiswa?',
    a: 'Ya, seluruh layanan bimbingan dan konseling di UPA-BK UTM 100% gratis untuk seluruh mahasiswa aktif Universitas Trunojoyo Madura.',
  },
  {
    id: 2,
    q: 'Bagaimana cara mendaftar sesi konseling?',
    a: 'Anda dapat mendaftar melalui menu "Daftar Konseling" di website ini. Anda akan diminta untuk memilih jadwal, mengisi data diri, dan mengisi kuesioner singkat (Asesmen) sebelum sesi dimulai.',
  },
  {
    id: 3,
    q: 'Apakah rahasia saya terjamin?',
    a: 'Tentu saja. UPA-BK UTM memegang teguh asas kerahasiaan sesuai kode etik psikologi.',
  },
];

const blankFaq = (): Faq => ({ id: Date.now(), q: '', a: '' });

type TabKey = 'contact' | 'faq';

export default function AdminBantuan() {
  const [tab, setTab] = useState<TabKey>('contact');

  // Contact
  const [contact, setContact] = useState<ContactInfo>(initialContact);
  const [contactDraft, setContactDraft] = useState<ContactInfo>(initialContact);
  const [contactEditing, setContactEditing] = useState(false);

  const saveContact = () => {
    setContact(contactDraft);
    setContactEditing(false);
  };

  const cancelContact = () => {
    setContactDraft(contact);
    setContactEditing(false);
  };

  // FAQ
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [faqDraft, setFaqDraft] = useState<Faq | null>(null);
  const [faqIsNew, setFaqIsNew] = useState(false);

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

  const saveFaq = () => {
    if (!faqDraft || !faqDraft.q.trim()) return;
    if (faqIsNew) {
      setFaqs((prev) => [{ ...faqDraft, id: Date.now() }, ...prev]);
    } else {
      setFaqs((prev) => prev.map((f) => (f.id === faqDraft.id ? faqDraft : f)));
    }
    cancelFaq();
  };

  const removeFaq = (id: number) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    if (faqDraft?.id === id) cancelFaq();
  };

  return (
    <DashboardLayout
      items={adminItems}
      title="Kelola Bantuan"
      subtitle="Atur Contact Person dan daftar FAQ yang tampil di halaman Bantuan"
      role="Admin"
      name="Dr. Aminah"
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
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
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
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
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
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
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
            {faqs.map((f) => (
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
            {faqs.length === 0 && (
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
