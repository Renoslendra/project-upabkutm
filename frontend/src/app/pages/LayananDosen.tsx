import { ExternalLink, Shield, Clock, Briefcase } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';

export default function LayananDosen() {
  return (
    <>
      <HeroBanner
        eyebrow="Layanan"
        title="Konseling Dosen & Tendik"
        subtitle="Mendampingi Anda menjaga keseimbangan antara profesionalitas dan kesejahteraan diri."
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          {/* Intro persuasif */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>
              Kesehatan Mental Anda Sama Pentingnya
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sebagai pendidik dan tenaga kependidikan, Anda memberikan banyak untuk orang lain. Saatnya memberi ruang untuk diri sendiri. Konselor profesional kami siap mendengarkan tanpa menghakimi.
            </p>
          </div>

          {/* Keunggulan */}
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: Shield, title: 'Kerahasiaan Penuh', desc: 'Data dan isi sesi tidak akan diakses pihak manapun.' },
              { icon: Clock, title: 'Jadwal Fleksibel', desc: 'Sesi bisa disesuaikan dengan jam kerja Anda.' },
              { icon: Briefcase, title: 'Profesional', desc: 'Konselor bersertifikasi dengan pengalaman menangani burnout & stres kerja.' },
            ].map((item) => (
              <div key={item.title} className="card-soft p-5 text-center">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--primary-fixed)' }}>
                  <item.icon size={20} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--primary-dark)' }}>{item.title}</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>
              Isi formulir di bawah ini, dan tim kami akan menjadwalkan sesi sesuai ketersediaan Anda.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc58dmCxjulrFOBcpVfII0raU4NfXJagLqbJ90Ca88PQyClVg/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-base"
            >
              Daftar Konseling Sekarang <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
