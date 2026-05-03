import { useState } from 'react';
import { Eye, Target, ChevronDown, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

const services = [
  { title: 'Konseling Individu', desc: 'Sesi 1-on-1 dengan konselor profesional dalam ruang aman dan rahasia.' },
  { title: 'Konseling Kelompok', desc: 'Berbagi pengalaman bersama rekan dengan tantangan serupa.' },
  { title: 'Asesmen Kesehatan Mental', desc: 'Pengukuran DASS-21 untuk memetakan tingkat stres, kecemasan, depresi.' },
  { title: 'Artikel & Edukasi', desc: 'Konten edukatif untuk meningkatkan literasi kesehatan jiwa.' },
  { title: 'Kegiatan / Workshop', desc: 'Workshop dan seminar pengembangan diri rutin tiap bulan.' },
  { title: 'Evaluasi Pasca-Sesi', desc: 'Refleksi pasca-konseling untuk menjaga kualitas layanan.' },
];

const staff = [
  { name: 'Dr. Aminah, M.Psi', role: 'Kepala UPA-BK', spec: 'Psikologi Klinis' },
  { name: 'Rifqi Ardian, M.Psi', role: 'Konselor Senior', spec: 'Konseling Akademik' },
  { name: 'Sari Pratiwi, M.Psi', role: 'Konselor', spec: 'Anxiety & Depression' },
  { name: 'Bagus Wirawan, M.Psi', role: 'Konselor', spec: 'Career & Life Coaching' },
];

export default function Tentang() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHeader
        eyebrow="Tentang Kami"
        title="Unit Penunjang Akademik Bimbingan dan Konseling"
        subtitle="UPA-BK UTM hadir sebagai ruang aman untuk seluruh civitas akademika Universitas Trunojoyo Madura — mendukung kesehatan mental, akademik, dan pengembangan diri."
      />

      <section className="section">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <div className="card-soft">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'var(--primary-fixed)' }}>
              <Eye size={22} style={{ color: 'var(--primary-dark)' }} />
            </div>
            <div className="eyebrow mb-2">Visi</div>
            <h3 style={{ fontSize: '1.35rem' }} className="mb-3">Menjadi pusat layanan bimbingan dan konseling unggul yang adaptif terhadap kebutuhan mahasiswa.</h3>
            <p>Mewujudkan ekosistem akademik yang sehat secara psikologis, inklusif, dan berlandaskan empati profesional.</p>
          </div>
          <div className="card-soft">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'var(--primary-fixed)' }}>
              <Target size={22} style={{ color: 'var(--primary-dark)' }} />
            </div>
            <div className="eyebrow mb-2">Misi</div>
            <ol className="space-y-3">
              {[
                'Menyediakan layanan konseling individu & kelompok berkualitas.',
                'Melaksanakan asesmen kesehatan mental berkala.',
                'Mengedukasi mahasiswa melalui artikel & workshop.',
                'Berkolaborasi dengan unit kampus untuk lingkungan suportif.',
              ].map((m, i) => (
                <li key={m} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs"
                    style={{ background: 'var(--primary-gradient)', color: 'white', fontWeight: 600 }}>{i + 1}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x">
          <div className="eyebrow mb-3">Struktur Organisasi</div>
          <h2 className="mb-10" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Tim yang Mendampingi Anda</h2>
          <div className="card-soft p-8 mb-6 grid md:grid-cols-[180px_1fr] gap-6 items-center" style={{ background: 'white' }}>
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto" style={{ background: 'var(--primary-fixed)' }}>
              <ImageWithFallback src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" alt="Kepala" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="eyebrow mb-2">Kepala UPA-BK</div>
              <h3 style={{ fontSize: '1.5rem' }}>{staff[0].name}</h3>
              <p className="mt-2">Spesialisasi: {staff[0].spec}. Lebih dari 15 tahun pengalaman dalam layanan bimbingan dan konseling perguruan tinggi.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {staff.slice(1).map((s) => (
              <div key={s.name} className="card-soft text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4" style={{ background: 'var(--primary-fixed)' }}>
                  <ImageWithFallback src={`https://i.pravatar.cc/200?u=${s.name}`} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <h4>{s.name}</h4>
                <div className="text-sm mt-1" style={{ color: 'var(--primary)' }}>{s.role}</div>
                <div className="eyebrow mt-2">{s.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="eyebrow mb-3">Layanan Detail</div>
          <h2 className="mb-10" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Apa Yang Kami Tawarkan</h2>
          <div className="space-y-3">
            {services.map((s, i) => (
              <div key={s.title} className="card-soft cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
                <div className="flex items-center justify-between gap-4">
                  <h4 style={{ fontSize: '1.1rem' }}>{s.title}</h4>
                  <ChevronDown size={20} style={{ color: 'var(--primary)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
                {open === i && <p className="mt-3">{s.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x">
          <div className="card-soft max-w-3xl mx-auto p-10 text-center">
            <div className="eyebrow mb-3">Hubungi Kami</div>
            <h2 className="mb-8" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Kami siap mendengarkan</h2>
            <div className="grid sm:grid-cols-2 gap-5 text-left">
              {[
                { Icon: MapPin, label: 'Alamat', val: 'Jl. Raya Telang, Bangkalan, Madura' },
                { Icon: Phone, label: 'Telepon', val: '(031) 3011146' },
                { Icon: Mail, label: 'Email', val: 'upabk@trunojoyo.ac.id' },
                { Icon: Clock, label: 'Jam Operasional', val: 'Sen–Jum, 08.00–16.00' },
              ].map((c) => (
                <div key={c.label} className="flex gap-3 p-4 rounded-2xl" style={{ background: 'var(--surface-sunken)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--primary-fixed)' }}>
                    <c.Icon size={18} style={{ color: 'var(--primary-dark)' }} />
                  </div>
                  <div>
                    <div className="eyebrow mb-1">{c.label}</div>
                    <div style={{ fontWeight: 500 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
