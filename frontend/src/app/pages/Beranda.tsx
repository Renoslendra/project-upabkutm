import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { Brain, MessageCircle, BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

import heroImg1 from '../components/image/utm.jpg';
import heroImg2 from '../components/image/utmjaya.webp';
import heroImg3 from '../components/image/utmku.jpg';
import heroImg4 from '../components/image/gambarutm.webp';
import heroImg5 from '../components/image/gerbangutm.jpg';

const heroSlides = [
  { src: heroImg1, alt: 'Kampus Universitas Trunojoyo Madura' },
  { src: heroImg2, alt: 'Gedung Universitas Trunojoyo Madura' },
  { src: heroImg3, alt: 'Lingkungan UTM' },
  { src: heroImg4, alt: 'Suasana UTM' },
  { src: heroImg5, alt: 'Gerbang UTM' },
];

export default function Beranda() {
  const [slide, setSlide] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((p) => (p + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Overlay ungu muncul perlahan saat scroll — easeOutCubic untuk transisi lebih smooth
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const t = Math.min(window.scrollY / 500, 1);
        // easeOutCubic: mulai lambat, makin cepat di akhir — terasa lebih natural
        const eased = 1 - Math.pow(1 - t, 3);
        setOverlayOpacity(eased * 0.7);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* HERO — fullbleed slideshow, extends behind transparent navbar */}
      <section
        className="relative overflow-hidden -mt-16 md:-mt-20 min-h-[100vh] flex items-center"
      >
        {/* Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === slide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ transitionProperty: 'opacity, transform' }}
            />
          ))}
          {/* Dark overlay for legibility — no color tint, pure dark */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
          {/* Purple overlay — appears smoothly on scroll */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(59, 7, 100, 0.85)',
              opacity: overlayOpacity,
              transition: 'opacity 0.15s ease-out',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="container-x relative z-10 pt-28 md:pt-32 pb-24 md:pb-28 text-center text-white" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' }}>
          <h1
            className="font-semibold mx-auto max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Ruang Aman untuk{' '}
            <span style={{ color: '#E9D5FF' }}>
              Cerita
            </span>
            , Tumbuh, dan Pulih.
          </h1>
          <p className="mt-5 max-w-md mx-auto text-base md:text-lg leading-relaxed font-medium text-white">
            Layanan konseling & kesehatan mental untuk seluruh civitas akademika UTM.
          </p>

          {/* Slide indicators */}
          <div className="mt-12 flex justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Pindah ke slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator — klik untuk scroll ke bawah */}
        <button
          onClick={() => {
            const target = document.getElementById('content-start');
            if (!target) return;
            const start = window.scrollY;
            const end = target.getBoundingClientRect().top + start;
            const distance = end - start;
            const duration = 800; // ms — cukup cepat tapi terasa smooth
            let startTime: number | null = null;

            function step(timestamp: number) {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeInOutCubic — mulai lambat, cepat di tengah, lambat di akhir
              const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              window.scrollTo(0, start + distance * ease);
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll ke bawah"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </section>

      {/* SAMBUTAN KEPALA UPA-BK */}
      <section id="content-start" className="section">
        <div className="container-x">
          <div className="card-soft p-8 md:p-12 grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto shrink-0" style={{ background: 'var(--primary-fixed)' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"
                alt="Kepala UPA-BK"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="eyebrow mb-3">Sambutan Kepala</div>
              <blockquote className="text-lg md:text-xl leading-relaxed italic mb-4" style={{ color: 'var(--text-primary)' }}>
                "UPA-BK UTM hadir sebagai ruang aman bagi seluruh civitas akademika untuk bercerita, tumbuh, dan pulih. Kami percaya bahwa kesehatan mental adalah fondasi keberhasilan akademik dan kehidupan."
              </blockquote>
              <div>
                <div className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Dr. Aminah, M.Psi</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Kepala UPA-BK Universitas Trunojoyo Madura</div>
              </div>
              <Link to="/tentang" className="btn-ghost mt-4 inline-flex items-center gap-2">
                Selengkapnya <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="section relative" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">Layanan Kami</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Dukungan yang Bisa Anda Akses</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6">
            {[
              { icon: Brain, title: 'Konseling Dosen & Tendik', desc: 'Layanan konseling untuk dosen dan tenaga kependidikan UTM.', span: 'lg:col-span-4', to: '/booking' },
              { icon: MessageCircle, title: 'Konseling Mahasiswa', desc: 'Sesi tatap muka maupun daring bersama konselor profesional kampus.', span: 'lg:col-span-4', to: '/booking' },
              { icon: BookOpen, title: 'Artikel & Edukasi', desc: 'Bacaan ringan tentang self-care, akademik, dan kesehatan jiwa.', span: 'lg:col-span-4 lg:row-span-1', to: '/artikel' },
            ].map((c) => (
              <Link key={c.title} to={c.to} className={`card-soft group ${c.span}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'var(--primary-fixed)' }}>
                  <c.icon size={22} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }} className="mb-2">{c.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{c.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm" style={{ color: 'var(--primary)' }}>
                  Pelajari lebih <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO PROFIL */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Video Profil</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Kenali UPA-BK Lebih Dekat</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video Profil UPA-BK UTM"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-center mt-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Video singkat tentang layanan UPA-BK Universitas Trunojoyo Madura.
          </p>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="section">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: '500+', l: 'Mahasiswa Terbantu' },
            { n: '200+', l: 'Sesi Konseling' },
            { n: '50+', l: 'Artikel Edukasi' },
            { n: '30+', l: 'Kegiatan' },
          ].map((s) => (
            <div key={s.l} className="card-soft text-center">
              <div className="gradient-text" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem,3vw,2.5rem)', letterSpacing: '-0.02em' }}>{s.n}</div>
              <div className="eyebrow mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TENTANG SINGKAT */}
      <section className="section" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative">
            <div className="rounded-[2rem] overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=80"
                alt="Tim UPA-BK"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <div className="eyebrow">Tentang UPA-BK</div>
            <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Mendampingi Mahasiswa dengan Empati dan Profesionalitas</h2>
            <p>Kami percaya bahwa setiap mahasiswa berhak atas ruang aman untuk bercerita, dipahami, dan didampingi tanpa penghakiman. UPA-BK UTM hadir sebagai sahabat akademik dan psikologis Anda.</p>
            <Link to="/tentang" className="btn-ghost">Kenali Kami <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ARTIKEL TERBARU */}
      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="eyebrow mb-3">Artikel Terbaru</div>
              <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Bacaan untuk Hari Ini</h2>
            </div>
            <Link to="/artikel" className="btn-ghost">Lihat semua <ArrowRight size={16} /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
              {[
              { cat: 'Kecemasan', title: 'Cara Mengelola Kecemasan di Tengah Kesibukan Kuliah', date: '24 Apr 2026', img: 'photo-1499209974431-9dddcece7f88' },
              { cat: 'Self-Care', title: '5 Ritual Pagi untuk Menenangkan Pikiran', date: '20 Apr 2026', img: 'photo-1499728603263-13726abce5fd' },
              { cat: 'Akademik', title: 'Mengatasi Burnout di Akhir Semester', date: '15 Apr 2026', img: 'photo-1517842645767-c639042777db' },
            ].map((a) => (
              <Link to="/artikel" key={a.title} className="card-soft p-0 overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/${a.img}?w=600&q=80`}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="badge badge-neutral mb-3">{a.cat}</span>
                  <h3 style={{ fontSize: '1.15rem' }} className="mb-2">{a.title}</h3>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{a.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center" style={{ background: 'var(--primary-gradient)' }}>
            <div className="blob" style={{ width: 400, height: 400, background: '#C084FC', top: -100, right: -80, opacity: 0.4 }} />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-white">
              <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', color: 'white', fontWeight: 300 }}>
                Mulai langkah kecil untuk memahami kondisi diri Anda.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>Sesi konseling rahasia, artikel edukasi, dan komunitas yang mendengarkan.</p>
              <Link to="/booking" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white" style={{ color: 'var(--primary-dark)', fontWeight: 500 }}>
                Mulai Sekarang <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
