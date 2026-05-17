import { useEffect, useState } from 'react';
import { Search, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import bgUtm from '../components/image/utm.jpg';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

const filters = ['Semua', 'Depresi', 'Kecemasan', 'Stres', 'Self-Care', 'Akademik', 'Tips'];
const articles = [
  { id: 1, cat: 'Kecemasan', title: 'Cara Mengelola Kecemasan di Tengah Kesibukan Kuliah', excerpt: 'Strategi praktis untuk menenangkan pikiran saat tugas menumpuk.', date: '24 Apr 2026', img: 'photo-1499209974431-9dddcece7f88', url: 'https://www.alodokter.com/cara-mengatasi-kecemasan' },
  { id: 2, cat: 'Self-Care', title: '5 Ritual Pagi untuk Menenangkan Pikiran', excerpt: 'Rutinitas sederhana yang bisa Anda mulai dari hari ini.', date: '20 Apr 2026', img: 'photo-1499728603263-13726abce5fd', url: 'https://www.halodoc.com/artikel/self-care-yang-bisa-dilakukan-setiap-hari' },
  { id: 3, cat: 'Akademik', title: 'Mengatasi Burnout di Akhir Semester', excerpt: 'Tanda burnout dan langkah pemulihan yang efektif.', date: '15 Apr 2026', img: 'photo-1517842645767-c639042777db', url: 'https://www.alodokter.com/mengenal-burnout-dan-cara-mengatasinya' },
  { id: 4, cat: 'Depresi', title: 'Mengenali Tanda-Tanda Depresi pada Diri Sendiri', excerpt: 'Awareness adalah langkah pertama menuju pemulihan.', date: '10 Apr 2026', img: 'photo-1494790108377-be9c29b29330', url: 'https://www.alodokter.com/depresi' },
  { id: 5, cat: 'Stres', title: 'Teknik Pernapasan untuk Mengurangi Stres', excerpt: 'Latihan 5 menit yang bisa Anda lakukan kapan saja.', date: '5 Apr 2026', img: 'photo-1506905925346-21bda4d32df4', url: 'https://www.halodoc.com/artikel/teknik-pernapasan-untuk-meredakan-stres' },
  { id: 6, cat: 'Tips', title: 'Membangun Rutinitas Tidur yang Sehat', excerpt: 'Tidur berkualitas adalah fondasi kesehatan mental.', date: '1 Apr 2026', img: 'photo-1455642305367-5295bdd5e8e1', url: 'https://www.alodokter.com/tips-tidur-nyenyak' },
];

export default function Artikel() {
  const [active, setActive] = useState('Semua');
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(id);
  }, [q]);

  const list = articles.filter((a) => (active === 'Semua' || a.cat === active) && a.title.toLowerCase().includes(debouncedQ.toLowerCase()));

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 380);
    return () => window.clearTimeout(timer);
  }, [active, debouncedQ]);

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center -mt-16 md:-mt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src={bgUtm}
            alt="Artikel dan Edukasi"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content - Rata tengah */}
        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Artikel & Edukasi
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
            Baca untuk Kesehatan Mentalmu
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Konten edukasi yang ditulis oleh tim UPA-BK UTM untuk meningkatkan literasi kesehatan jiwa di lingkungan kampus.
          </p>
        </div>
      </section>
      <section className="section pt-10 md:pt-14">
        <div className="container-x">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
              <input
                className="input-field pl-11 bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm focus:bg-white focus:border-purple-400 focus:shadow-[0_0_0_4px_rgba(18,6,50,0.1)]"
                placeholder="Cari artikel…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              {filters.map((f) => {
                const sel = active === f;
                return (
                  <button key={f} onClick={() => setActive(f)} className={`px-4 py-2 rounded-full text-sm transition-all border ${sel ? 'bg-[var(--primary)] text-white border-transparent shadow-[0_8px_16px_rgba(18,6,50,0.3)]' : 'bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 text-gray-700 hover:bg-white shadow-sm'}`}
                    style={{ fontWeight: 500 }}>{f}</button>
                );
              })}
              {active !== 'Semua' && (
                <div className="ml-2 px-3 py-2 rounded-full bg-white/90 text-sm font-medium" style={{ color: 'var(--primary)' }}>{active}</div>
              )}
              {(active !== 'Semua' || debouncedQ) && (
                <button onClick={() => { setActive('Semua'); setQ(''); setDebouncedQ(''); }} className="px-3 py-2 rounded-full text-sm bg-white/60 text-gray-700 border border-white/80 ml-2">Clear</button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="py-12">
              <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : list.length === 0 ? (
            <div className="card-soft p-16 text-center max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: 'var(--surface-hover)' }}>
                <BookOpen size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="mb-2">Tidak Ada Hasil</h3>
              <p className="mb-5">Coba kata kunci atau kategori lain.</p>
              <button className="btn-primary" onClick={() => { setActive('Semua'); setQ(''); }}>Lihat Semua Artikel</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((a) => (
                <a href={a.url} target="_blank" rel="noopener noreferrer" key={a.id} className="card-soft p-0 overflow-hidden group bg-white/90 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={`https://images.unsplash.com/${a.img}?w=600&q=80`} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="badge badge-neutral mb-3">{a.cat}</span>
                    <h3 style={{ fontSize: '1.1rem' }} className="mb-2">{a.title}</h3>
                    <p className="text-sm mb-3">{a.excerpt}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: 'var(--text-tertiary)' }}>{a.date}</span>
                      <span className="inline-flex items-center gap-1" style={{ color: 'var(--primary)' }}>Baca <ArrowRight size={12} /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {list.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all hover:bg-white bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm" style={{ color: 'var(--text-secondary)' }}>
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-10 h-10 rounded-full text-sm transition-all border ${p === 1 ? 'bg-[var(--primary)] text-white border-transparent shadow-[0_8px_16px_rgba(18,6,50,0.3)]' : 'bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-sm'}`} style={{ fontWeight: 500 }}>{p}</button>
              ))}
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all hover:bg-white bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm" style={{ color: 'var(--text-secondary)' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
