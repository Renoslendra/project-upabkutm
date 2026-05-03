import { Link } from 'react-router';
import { Brain, MessageCircle, BookOpen, ArrowRight, Eye, Heart, Sparkles } from 'lucide-react';
import { Blobs } from '../components/Blobs';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

export default function Beranda() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Blobs variant="hero" />
        <div className="container-x relative z-10 py-16 md:py-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-7">
            <div className="eyebrow">UPA-BK UTM</div>
            <h1 className="hero-headline">
              Ruang Aman untuk <span className="gradient-text" style={{ fontWeight: 600 }}>Cerita</span>, Tumbuh, dan Pulih.
            </h1>
            <p className="text-lg max-w-xl">
              Akses layanan bimbingan dan konseling, asesmen kesehatan mental, artikel edukasi, dan kegiatan pengembangan diri dari UPA-BK Universitas Trunojoyo Madura.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/asesmen" className="btn-primary"><Sparkles size={16} /> Mulai Asesmen</Link>
              <Link to="/booking" className="btn-secondary">Daftar Konseling</Link>
            </div>
            <div className="flex gap-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              {[
                { n: '500+', l: 'Mahasiswa' },
                { n: '12', l: 'Konselor' },
                { n: '4.9', l: 'Rating' },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontWeight: 600, fontSize: '1.5rem', color: 'var(--primary-dark)' }}>{s.n}</div>
                  <div className="eyebrow">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=800&q=80"
                alt="Counseling session"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(94,45,85,0.45))' }} />
            </div>
            <div className="absolute -bottom-6 -left-6 card-soft max-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(123,198,126,0.2)' }}>
                  <Heart size={18} style={{ color: '#2F7B33' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sesi Aman</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>100% Confidential</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-4 card-soft max-w-[200px]">
              <div className="eyebrow mb-1">Hari Ini</div>
              <div style={{ fontWeight: 600 }}>14 sesi tersedia</div>
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
              { icon: Brain, title: 'Asesmen Kesehatan Mental', desc: 'DASS-21 untuk mengenali tingkat stres, kecemasan, dan suasana hati Anda.', span: 'lg:col-span-4', to: '/asesmen' },
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
            ].map((a, i) => (
              <Link to={`/artikel/${i + 1}`} key={a.title} className="card-soft p-0 overflow-hidden group">
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
            <div className="blob" style={{ width: 400, height: 400, background: '#FFD7F3', top: -100, right: -80, opacity: 0.4 }} />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-white">
              <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', color: 'white', fontWeight: 300 }}>
                Mulai langkah kecil untuk memahami kondisi diri Anda.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>Asesmen gratis, sesi konseling rahasia, dan komunitas yang mendengarkan.</p>
              <Link to="/asesmen" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white" style={{ color: 'var(--primary-dark)', fontWeight: 500 }}>
                Mulai Sekarang <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
