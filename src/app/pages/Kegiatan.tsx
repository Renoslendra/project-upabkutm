import { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Users, Search, ChevronDown } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/image/ImageWithFallback';
import bgUtm from '../components/image/gambarutm.webp';

const filters = ['Semua', 'Workshop', 'Seminar', 'Pelatihan', 'Webinar'];
const events = [
  { id: 1, type: 'Workshop', title: 'Mindfulness untuk Mahasiswa', date: '28 APR', loc: 'Auditorium UTM', desc: 'Workshop praktis tentang teknik mindfulness sehari-hari.', img: 'photo-1544027993-37dbfe43562a' },
  { id: 2, type: 'Seminar', title: 'Mengelola Stres Akademik', date: '02 MEI', loc: 'Online (Zoom)', desc: 'Seminar dari psikolog klinis tentang manajemen stres.', img: 'photo-1559223607-a43c990c692c' },
  { id: 3, type: 'Pelatihan', title: 'Public Speaking & Anxiety', date: '10 MEI', loc: 'Gedung Cakra', desc: 'Pelatihan mengatasi kecemasan saat berbicara di depan umum.', img: 'photo-1505373877841-8d25f7d46678' },
  { id: 4, type: 'Webinar', title: 'Self-Compassion 101', date: '18 MEI', loc: 'Online (YouTube Live)', desc: 'Diskusi mendalam tentang welas asih pada diri sendiri.', img: 'photo-1523580494863-6f3031224c94' },
];

export default function Kegiatan() {
  const [active, setActive] = useState('Semua');
  const [q, setQ] = useState('');
  const [sortOrder, setSortOrder] = useState('Terbaru');
  
  const filtered = events.filter((e) => (active === 'Semua' || e.type === active) && e.title.toLowerCase().includes(q.toLowerCase()));
  const list = filtered.sort((a, b) => sortOrder === 'Terbaru' ? a.id - b.id : b.id - a.id);

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={bgUtm} 
            alt="Kampus UTM" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient redup merata di seluruh layar untuk teks di tengah */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content - Rata tengah */}
        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Kegiatan & Workshop
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-md">
            Ikuti Kegiatan Pengembangan Diri
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow">
            Workshop, seminar, pelatihan, dan webinar rutin yang dirancang untuk pertumbuhan psikologis dan akademik Anda.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:max-w-[240px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
                <input className="input-field pl-11 bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm focus:bg-white focus:border-pink-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]" placeholder="Cari kegiatan…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <div className="relative w-full sm:max-w-[160px]">
                <select 
                  className="input-field appearance-none pr-10 bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm focus:bg-white focus:border-pink-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]" 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="Terbaru">Terbaru</option>
                  <option value="Terlama">Terlama</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" style={{ color: 'var(--text-tertiary)' }} />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap md:justify-end">
              {filters.map((f) => {
                const sel = active === f;
                return (
                  <button key={f} onClick={() => setActive(f)} className={`px-4 py-2 rounded-full text-sm transition-all border ${sel ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-transparent shadow-[0_8px_16px_rgba(236,72,153,0.3)]' : 'bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 text-gray-700 hover:bg-white shadow-sm'}`}
                    style={{ fontWeight: 500 }}>{f}</button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {list.map((e) => (
              <article key={e.title} className="card-soft p-0 overflow-hidden group bg-white/90 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                <div className="grid sm:grid-cols-[160px_1fr]">
                  <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full overflow-hidden">
                    <ImageWithFallback src={`https://images.unsplash.com/${e.img}?w=400&q=80`} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 px-3 py-2 rounded-2xl text-center"
                      style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)' }}>{e.date.split(' ')[0]}</div>
                      <div className="text-xs" style={{ color: 'var(--primary)' }}>{e.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <span className="badge badge-neutral mb-3 self-start">{e.type}</span>
                    <h3 className="mb-2" style={{ fontSize: '1.15rem' }}>{e.title}</h3>
                    <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      <MapPin size={12} /> {e.loc}
                    </div>
                    <p className="text-sm mb-4">{e.desc}</p>
                    <button className="btn-ghost text-sm self-start mt-auto">Lihat Detail <ArrowRight size={14} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detail preview */}
      <section className="section relative">
        <div className="container-x relative z-10">
          <div className="eyebrow mb-3">Featured</div>
          <h2 className="mb-8" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Mindfulness untuk Mahasiswa</h2>
          <div className="card-soft p-0 overflow-hidden grid lg:grid-cols-2 bg-white/90 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-300">
            <div className="aspect-[4/3] lg:aspect-auto">
              <ImageWithFallback src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=900&q=80" alt="Featured" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-10 space-y-4">
              <span className="badge badge-info">Workshop</span>
              <h3 style={{ fontSize: '1.5rem' }}>Mindfulness untuk Mahasiswa</h3>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1"><Calendar size={14} /> 28 April 2026, 09:00</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> Auditorium UTM</span>
                <span className="flex items-center gap-1"><Users size={14} /> 50 peserta</span>
              </div>
              <p>Workshop interaktif bersama Dr. Aminah, M.Psi tentang penerapan mindfulness dalam keseharian mahasiswa untuk mengurangi stres akademik dan meningkatkan fokus.</p>
              <button className="btn-primary">Daftar Kegiatan <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
