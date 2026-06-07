import { useEffect, useState } from 'react';
import { Search, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import bgUtm from '../components/image/utm.jpg';
import { ImageWithFallback } from '../components/image/ImageWithFallback';
import { ErrorNotice } from '../components/ErrorNotice';

// Daftar filter kategori bisa disesuaikan dengan yang ada di databasemu
const filters = ['Semua', 'Depresi', 'Kecemasan', 'Stres', 'Self-Care', 'Akademik', 'Tips'];

export default function Artikel() {
  const [active, setActive] = useState('Semua');
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [page, setPage] = useState(1);
  
  // 1. STATE UNTUK MENAMPUNG DATA DARI DATABASE
  const [articles, setArticles] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 6;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // 2. FETCH DATA DARI API (Tanpa Token karena ini halaman publik)
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL(`${API_BASE_URL}/api/public/artikel`);
        url.searchParams.set('page', String(page));
        url.searchParams.set('limit', String(limit));

        if (debouncedQ) {
          url.searchParams.set('q', debouncedQ);
        }

        if (active !== 'Semua') {
          url.searchParams.set('kategori', active);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Gagal memuat artikel dari server.');
        }
        const result = await response.json();

        if (result.success) {
          setArticles(result.data || []);
          setTotal(result.total || 0);
        } else {
          throw new Error(result.message || 'Gagal memuat artikel dari server.');
        }
      } catch (error) {
        console.error("Gagal mengambil artikel:", error);
        setArticles([]);
        setTotal(0);
        setError(error instanceof Error ? error.message : 'Gagal memuat artikel dari server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [active, debouncedQ, page]);

  // Fitur Debounce untuk pencarian
  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(id);
  }, [q]);

  useEffect(() => {
    setPage(1);
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

          {error ? (
            <ErrorNotice message={error} className="mb-8" />
          ) : isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="card-soft p-16 text-center max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: 'var(--surface-hover)' }}>
                <BookOpen size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="mb-2">Tidak Ada Hasil</h3>
              <p className="mb-5">Belum ada artikel yang sesuai dengan pencarian atau kategori ini.</p>
              <button className="btn-primary" onClick={() => { setActive('Semua'); setQ(''); }}>Lihat Semua Artikel</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 4. TAMPILKAN DATA ASLI DARI DATABASE */}
              {articles.map((a) => (
                <div key={a.id} className="card-soft p-0 overflow-hidden group bg-white/90 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* Menggunakan image_url dari database, dengan gambar default jika kosong */}
                    <ImageWithFallback 
                      src={a.image_url || `https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80`} 
                      alt={a.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <span className="badge badge-neutral mb-3">{a.kategori || "Umum"}</span>
                      <h3 style={{ fontSize: '1.1rem' }} className="mb-2 line-clamp-2">{a.judul}</h3>
                      <p className="text-sm mb-3 line-clamp-2 text-gray-600">{a.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-gray-100">
                      <span style={{ color: 'var(--text-tertiary)' }}>
                        {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {(() => {
                        // Cek apakah data pada kolom 'konten' adalah link URL yang valid
                        const isUrl = typeof a.konten === 'string' && /^https?:\/\//i.test(a.konten);
                        if (isUrl) {
                          return (
                            <a href={a.konten} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-[var(--primary)] hover:underline">
                              Baca <ArrowRight size={12} />
                            </a>
                          );
                        }

                        // Jika kolom `konten` bukan URL (atau kosong)
                        return <span className="inline-flex items-center gap-1 font-medium text-[var(--text-secondary)] opacity-60 cursor-not-allowed">Baca <ArrowRight size={12} /></span>;
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all hover:bg-white bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full text-sm transition-all border ${p === page ? 'bg-[var(--primary)] text-white border-transparent shadow-[0_8px_16px_rgba(18,6,50,0.3)]' : 'bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 text-gray-700 hover:bg-white hover:scale-105 shadow-sm'}`}
                  style={{ fontWeight: 500 }}
                >
                  {p}
                </button>
              ))}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all hover:bg-white bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
