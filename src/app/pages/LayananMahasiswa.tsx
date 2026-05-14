import { ExternalLink, Shield, Clock, Heart } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';

export default function LayananMahasiswa() {
  return (
    <>
      <HeroBanner
        eyebrow="Layanan"
        title="Konseling Mahasiswa"
        subtitle="Ruang aman untuk bercerita, dipahami, dan didampingi tanpa penghakiman."
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          {/* Intro persuasif */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>
              Kamu Tidak Harus Menghadapinya Sendiri
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Tekanan akademik, masalah relasi, kecemasan akan masa depan — semua itu valid. UPA-BK UTM hadir untuk mendampingi perjalananmu dengan sesi konseling yang 100% rahasia dan gratis.
            </p>
          </div>

          {/* Keunggulan */}
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: Shield, title: 'Rahasia Terjamin', desc: 'Seluruh sesi dilindungi kode etik psikologi.' },
              { icon: Clock, title: 'Fleksibel', desc: 'Pilih jadwal yang sesuai — tatap muka atau daring.' },
              { icon: Heart, title: 'Gratis', desc: 'Tidak ada biaya apapun untuk mahasiswa aktif UTM.' },
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
              Langkah pertama dimulai dari sini. Isi formulir, dan konselor kami akan menghubungimu.
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
