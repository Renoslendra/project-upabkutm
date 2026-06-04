import { useEffect, useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

export default function StrukturOrganisasi() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStruktur = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/public/struktur-organisasi');
        const result = await response.json();

        if (result.success) {
          setStaff(result.data || []);
        }
      } catch (error) {
        console.error('Gagal mengambil struktur organisasi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  const kepala = staff.find((item) => item.kategori === 'kepala') || null;
  const anggota = staff.filter((item) => item.kategori !== 'kepala');

  return (
    <>
      <HeroBanner
        eyebrow="Profil"
        title="Struktur Organisasi"
        subtitle="Tim profesional yang mendampingi Anda di UPA-BK UTM."
      />

      <section className="section">
        <div className="container-x max-w-5xl">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : kepala ? (
            <>
              <div className="card-soft p-0 overflow-hidden mb-10">
                <div className="grid md:grid-cols-[280px_1fr]">
                  <div className="h-[250px] md:h-auto">
                    <ImageWithFallback
                      src={kepala.foto_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80'}
                      alt={kepala.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="eyebrow mb-2">Kepala UPA-BK</div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>{kepala.nama}</h2>
                    <div className="text-sm font-medium mb-4" style={{ color: 'var(--primary)' }}>{kepala.spesialisasi || kepala.role}</div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {kepala.bio || 'Data biografi belum tersedia.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="eyebrow mb-2">Tim Konselor</div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Konselor Profesional Kami</h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {anggota.map((s) => (
                  <div key={s.id} className="card-soft p-6 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-[var(--primary-fixed)] group-hover:ring-[var(--primary)] transition-colors" style={{ background: 'var(--primary-fixed)' }}>
                      <ImageWithFallback src={s.foto_url || `https://i.pravatar.cc/200?u=${s.nama}`} alt={s.nama} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--primary-dark)' }}>{s.nama}</h4>
                    <div className="text-xs font-medium mb-2" style={{ color: 'var(--primary)' }}>{s.role}</div>
                    <div className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{s.spesialisasi || '-'}</div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.bio || 'Data biografi belum tersedia.'}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card-soft p-10 text-center" style={{ color: 'var(--text-secondary)' }}>
              Data struktur organisasi belum tersedia.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
