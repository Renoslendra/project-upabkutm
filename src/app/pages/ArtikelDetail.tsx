import { Link, useParams } from 'react-router';
import { Calendar, Share2, Download, Copy, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

export default function ArtikelDetail() {
  const { id } = useParams();
  return (
    <>
      <section className="relative">
        <div className="h-[40vh] md:h-[400px] overflow-hidden rounded-b-[2.5rem]">
          <ImageWithFallback src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&q=80" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(45,27,51,0.1) 30%, rgba(45,27,51,0.55))' }} />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 max-w-[720px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-neutral">Kecemasan</span>
              <span className="text-sm flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                <Calendar size={14} /> 24 Apr 2026
              </span>
            </div>
            <h1 className="hero-headline mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Cara Mengelola Kecemasan di Tengah Kesibukan Kuliah</h1>
            <div className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Oleh Tim UPA-BK UTM · 5 menit baca</div>
            <div className="space-y-5" style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              <p>Tugas yang menumpuk, deadline yang berdekatan, dan ekspektasi akademik bisa menjadi pemicu kecemasan yang signifikan. Artikel ini akan membahas strategi praktis untuk mengelola kecemasan tanpa mengorbankan performa akademik Anda.</p>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>1. Kenali Pemicu</h2>
              <p>Langkah pertama adalah mengenali kapan dan dalam situasi apa kecemasan muncul. Catatan harian sederhana dapat membantu Anda memetakan pola.</p>
              <blockquote className="border-l-4 pl-5 py-2 italic" style={{ borderColor: 'var(--primary-light)', background: 'var(--surface-sunken)', borderRadius: '0 1rem 1rem 0' }}>
                “Awareness adalah 50% dari penyembuhan. Sisanya adalah praktik konsisten.”
              </blockquote>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>2. Teknik Pernapasan 4-7-8</h2>
              <p>Tarik nafas 4 detik, tahan 7 detik, hembuskan 8 detik. Ulangi 4 siklus. Teknik ini terbukti menurunkan detak jantung dan menenangkan sistem saraf.</p>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>3. Pisahkan Tugas Besar</h2>
              <p>Pecah tugas besar menjadi langkah-langkah kecil yang bisa diselesaikan dalam 25 menit (teknik Pomodoro).</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Bagikan:</span>
              <button className="btn-ghost text-sm"><Share2 size={14} /> WhatsApp</button>
              <button className="btn-ghost text-sm"><Copy size={14} /> Copy Link</button>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-5">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="card-soft">
                <div className="eyebrow mb-3">Artikel Terkait</div>
                {[1, 2, 3].map((i) => (
                  <Link to={`/artikel/${i + 1}`} key={i} className="flex gap-3 py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="w-16 h-16 rounded-xl bg-[var(--surface-hover)] shrink-0" />
                    <div className="text-sm">
                      <div style={{ fontWeight: 500 }}>5 Ritual Pagi untuk Menenangkan Pikiran</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Self-Care · 5 min</div>
                    </div>
                  </Link>
                ))}
              </div>
              <button className="btn-secondary w-full"><Download size={16} /> Download PDF</button>
              <Link to="/booking" className="btn-primary w-full">Konsultasi Konselor <ArrowRight size={16} /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
