import { HeroBanner } from '../components/HeroBanner';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

const staff = [
  { name: 'Dr. Aminah, M.Psi', role: 'Kepala UPA-BK', spec: 'Psikologi Klinis', bio: 'Lebih dari 15 tahun pengalaman dalam layanan bimbingan dan konseling perguruan tinggi.' },
  { name: 'Rifqi Ardian, M.Psi', role: 'Konselor Senior', spec: 'Konseling Akademik', bio: 'Spesialis pendampingan mahasiswa dalam permasalahan akademik dan perencanaan karier.' },
  { name: 'Sari Pratiwi, M.Psi', role: 'Konselor', spec: 'Anxiety & Depression', bio: 'Berpengalaman menangani kecemasan dan gangguan mood pada usia dewasa muda.' },
  { name: 'Bagus Wirawan, M.Psi', role: 'Konselor', spec: 'Career & Life Coaching', bio: 'Membantu mahasiswa menemukan arah hidup dan mengembangkan potensi diri.' },
];

export default function StrukturOrganisasi() {
  return (
    <>
      <HeroBanner
        eyebrow="Profil"
        title="Struktur Organisasi"
        subtitle="Tim profesional yang mendampingi Anda di UPA-BK UTM."
      />

      <section className="section">
        <div className="container-x max-w-5xl">
          {/* Kepala — card besar */}
          <div className="card-soft p-0 overflow-hidden mb-10">
            <div className="grid md:grid-cols-[280px_1fr]">
              <div className="h-[250px] md:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
                  alt="Kepala UPA-BK"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="eyebrow mb-2">Kepala UPA-BK</div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>{staff[0].name}</h2>
                <div className="text-sm font-medium mb-4" style={{ color: 'var(--primary)' }}>{staff[0].spec}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {staff[0].bio}
                </p>
              </div>
            </div>
          </div>

          {/* Tim Konselor */}
          <div className="text-center mb-8">
            <div className="eyebrow mb-2">Tim Konselor</div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Konselor Profesional Kami</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {staff.slice(1).map((s) => (
              <div key={s.name} className="card-soft p-6 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-[var(--primary-fixed)] group-hover:ring-[var(--primary)] transition-colors" style={{ background: 'var(--primary-fixed)' }}>
                  <ImageWithFallback src={`https://i.pravatar.cc/200?u=${s.name}`} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--primary-dark)' }}>{s.name}</h4>
                <div className="text-xs font-medium mb-2" style={{ color: 'var(--primary)' }}>{s.role}</div>
                <div className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{s.spec}</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
