import { Heart, Shield, Users, BookOpen } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';
import { ImageWithFallback } from '../components/image/ImageWithFallback';
import bgKonseling from '../components/image/konseling.jpg';

const highlights = [
  { icon: Heart, title: 'Ruang Aman', desc: 'Tempat bercerita tanpa penghakiman.' },
  { icon: Shield, title: '100% Rahasia', desc: 'Dilindungi kode etik psikologi.' },
  { icon: Users, title: 'Untuk Semua', desc: 'Mahasiswa, dosen, tendik, & umum.' },
  { icon: BookOpen, title: 'Gratis', desc: 'Tanpa biaya untuk civitas UTM.' },
];

export default function Tentang() {
  return (
    <>
      <HeroBanner
        eyebrow="Profil"
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Unit Penunjang Akademik Bimbingan dan Konseling Universitas Trunojoyo Madura."
      />

      {/* Intro dengan foto */}
      <section className="section">
        <div className="container-x max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={bgKonseling}
                alt="Layanan Konseling UPA-BK"
                className="w-full h-[320px] object-cover"
              />
            </div>
            <div>
              <div className="eyebrow mb-3">Siapa Kami</div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-5" style={{ color: 'var(--primary-dark)' }}>
                Unit Penunjang Akademik Bimbingan dan Konseling
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  UPA-BK UTM hadir sebagai ruang aman bagi seluruh civitas akademika Universitas Trunojoyo Madura untuk bercerita, tumbuh, dan pulih.
                </p>
                <p>
                  Kami menyediakan konseling individu, konseling kelompok, serta berbagai kegiatan edukasi dan workshop untuk meningkatkan kesejahteraan psikologis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight cards */}
      <section className="py-12" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((h) => (
              <div key={h.title} className="card-soft p-5 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--primary-fixed)' }}>
                  <h.icon size={22} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--primary-dark)' }}>{h.title}</h4>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="section">
        <div className="container-x max-w-3xl text-center">
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Seluruh layanan bersifat rahasia, gratis untuk civitas akademika UTM, dan ditangani oleh konselor bersertifikasi dengan pengalaman di bidang psikologi klinis dan konseling akademik. Kami berkomitmen menciptakan lingkungan kampus yang sehat secara psikologis dan inklusif.
          </p>
        </div>
      </section>
    </>
  );
}
