import { useEffect, useState } from 'react';
import { MapPin, ArrowRight, Search, ChevronDown, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { ImageWithFallback } from '../components/image/ImageWithFallback';
import bgUtm from '../components/image/gambarutm.webp';
import { ErrorNotice } from '../components/ErrorNotice';
import { Dialog, DialogContent } from '../components/ui/dialog';

const filters = ['Semua', 'Akan Datang', 'Selesai'];

export default function Kegiatan() {
  const [active, setActive] = useState('Semua');
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('Terbaru');
  const [events, setEvents] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const limit = 6;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(id);
  }, [q]);

  useEffect(() => {
    setPage(1);
  }, [active, debouncedQ, sortOrder]);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL(`${API_BASE_URL}/api/public/kegiatan`);
        url.searchParams.set('page', String(page));
        url.searchParams.set('limit', String(limit));
        url.searchParams.set('order', sortOrder === 'Terlama' ? 'asc' : 'desc');

        if (active !== 'Semua') {
          url.searchParams.set('status', active);
        }

        if (debouncedQ) {
          url.searchParams.set('q', debouncedQ);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Gagal memuat kegiatan dari server.');
        }
        const result = await response.json();

        if (result.success) {
          setEvents(result.data || []);
          setTotal(result.total || 0);
        } else {
          throw new Error(result.message || 'Gagal memuat kegiatan dari server.');
        }
      } catch (error) {
        console.error('Gagal mengambil kegiatan:', error);
        setEvents([]);
        setTotal(0);
        setError(error instanceof Error ? error.message : 'Gagal memuat kegiatan dari server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [active, debouncedQ, page, sortOrder]);

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center -mt-16 md:-mt-20">
        <div className="absolute inset-0">
          <img src={bgUtm} alt="Kampus UTM" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">Kegiatan & Workshop</div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-md">Ikuti Kegiatan Pengembangan Diri</h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow">Workshop, seminar, pelatihan, dan webinar rutin yang dirancang untuk pertumbuhan psikologis dan akademik Anda.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:max-w-[240px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  className="input-field pl-11 bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm focus:bg-white focus:border-purple-400 focus:shadow-[0_0_0_4px_rgba(18,6,50,0.1)]"
                  placeholder="Cari kegiatan…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:max-w-[160px]">
                <select
                  className="input-field appearance-none pr-10 bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 shadow-sm focus:bg-white focus:border-purple-400 focus:shadow-[0_0_0_4px_rgba(18,6,50,0.1)]"
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
            <div className="flex gap-2 flex-wrap md:justify-end items-center">
              {filters.map((f) => {
                const sel = active === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${sel ? 'bg-[var(--primary)] text-white border-transparent shadow-[0_8px_16px_rgba(18,6,50,0.3)]' : 'bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 text-gray-700 hover:bg-white shadow-sm'}`}
                    style={{ fontWeight: 500 }}
                  >
                    {f}
                  </button>
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
            <div className="py-12">
              <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : events.length === 0 ? (
            <div className="card-soft p-16 text-center max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: 'var(--surface-hover)' }}>
                <ArrowRight size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="mb-2">Tidak Ada Hasil</h3>
              <p className="mb-5">Belum ada kegiatan yang sesuai dengan pencarian atau filter ini.</p>
              <button className="btn-primary" onClick={() => { setActive('Semua'); setQ(''); setDebouncedQ(''); }}>Lihat Semua Kegiatan</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((e) => (
                <article key={e.id} className="card-soft p-0 overflow-hidden group bg-white/90 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                  <div className="grid sm:grid-cols-[160px_1fr]">
                    <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full overflow-hidden">
                      <ImageWithFallback src={e.image_url || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80'} alt={e.nama_kegiatan} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 px-3 py-2 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)' }}>{e.tanggal?.split(' ')[0] || '-'}</div>
                        <div className="text-xs" style={{ color: 'var(--primary)' }}>{e.tanggal?.split(' ')[1] || ''}</div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col">
                      <span className="badge badge-neutral mb-3 self-start">{e.status || 'Akan Datang'}</span>
                      <h3 className="mb-2" style={{ fontSize: '1.15rem' }}>{e.nama_kegiatan}</h3>
                      <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
                        <MapPin size={12} /> {e.lokasi}
                      </div>
                      <p className="text-sm mb-4">{e.deskripsi}</p>
                      <button onClick={() => setSelectedEvent(e)} className="btn-ghost text-sm self-start mt-auto cursor-pointer inline-flex items-center gap-1 hover:gap-2 transition-all">Lihat Detail <ArrowRight size={14} /></button>
                    </div>
                  </div>
                </article>
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

      {/* Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => { if (!open) setSelectedEvent(null); }}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selectedEvent && (
            <>
              <div className="relative h-56 sm:h-64 overflow-hidden" style={{ background: 'var(--primary-fixed)' }}>
                <ImageWithFallback
                  src={selectedEvent.image_url || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'}
                  alt={selectedEvent.nama_kegiatan}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-neutral">{selectedEvent.status || 'Akan Datang'}</span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--primary-dark)' }}>
                  {selectedEvent.nama_kegiatan}
                </h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Calendar size={16} style={{ color: 'var(--primary)' }} />
                    <span>{selectedEvent.tanggal || 'Belum ditentukan'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <MapPin size={16} style={{ color: 'var(--primary)' }} />
                    <span>{selectedEvent.lokasi || 'Belum ditentukan'}</span>
                  </div>
                </div>
                <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Deskripsi Kegiatan</h4>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                  {selectedEvent.deskripsi || 'Deskripsi kegiatan belum tersedia.'}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
