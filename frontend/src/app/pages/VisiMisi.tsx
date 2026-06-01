import { Eye, Target, Flag } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';

export default function VisiMisi() {
  return (
    <>
      <HeroBanner
        eyebrow="Profil"
        title="Visi Misi Tujuan"
        subtitle="Arah dan tujuan UPA-BK Universitas Trunojoyo Madura."
      />

      <section className="section">
        <div className="container-x max-w-4xl">
          {/* Visi */}
          <div className="card-soft p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                <Eye size={20} style={{ color: 'var(--primary-dark)' }} />
              </div>
              <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Visi</h3>
            </div>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Menjadi pusat layanan bimbingan dan konseling unggul yang adaptif terhadap kebutuhan mahasiswa, serta mewujudkan ekosistem akademik yang sehat secara psikologis, inklusif, dan berlandaskan empati profesional.
            </p>
          </div>

          {/* Misi */}
          <div className="card-soft p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                <Target size={20} style={{ color: 'var(--primary-dark)' }} />
              </div>
              <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Misi</h3>
            </div>
            <div className="space-y-3">
              {[
                'Menyediakan layanan konseling individu & kelompok berkualitas.',
                'Melaksanakan asesmen kesehatan mental berkala.',
                'Mengedukasi melalui artikel & workshop.',
                'Berkolaborasi dengan unit kampus untuk lingkungan suportif.',
              ].map((m, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white" style={{ background: 'var(--primary)' }}>{i + 1}</span>
                  <p className="text-base leading-relaxed pt-1" style={{ color: 'var(--text-primary)' }}>{m}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tujuan */}
          <div className="card-soft p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                <Flag size={20} style={{ color: 'var(--primary-dark)' }} />
              </div>
              <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Tujuan</h3>
            </div>
            <div className="space-y-3">
              {[
                'Memberikan layanan konseling yang mudah diakses oleh seluruh civitas akademika UTM.',
                'Meningkatkan literasi kesehatan mental di lingkungan kampus.',
                'Mendukung mahasiswa dalam menghadapi tantangan akademik dan personal.',
                'Menjadi mitra strategis unit-unit kampus dalam menciptakan lingkungan belajar yang sehat.',
              ].map((t, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
