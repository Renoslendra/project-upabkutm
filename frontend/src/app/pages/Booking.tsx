import { useState } from 'react';
import { ExternalLink, GraduationCap, Briefcase, Users, ArrowLeft } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';

type LayananKey = 'mahasiswa' | 'dosen' | 'eksternal';

const layanan: Record<LayananKey, { icon: typeof GraduationCap; title: string; desc: string; link: string }> = {
  mahasiswa: {
    icon: GraduationCap,
    title: 'Konseling Mahasiswa',
    desc: 'Layanan ini ditujukan untuk mahasiswa aktif Universitas Trunojoyo Madura. Anda dapat berkonsultasi mengenai permasalahan akademik, personal, relasi, maupun perencanaan karier. Seluruh sesi bersifat rahasia dan gratis.',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSc58dmCxjulrFOBcpVfII0raU4NfXJagLqbJ90Ca88PQyClVg/viewform?pli=1',
  },
  dosen: {
    icon: Briefcase,
    title: 'Konseling Dosen & Tendik',
    desc: 'Layanan ini ditujukan untuk dosen dan tenaga kependidikan UTM. Kami siap mendampingi Anda dalam menghadapi tekanan kerja, manajemen stres, maupun permasalahan personal yang memengaruhi produktivitas.',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSc58dmCxjulrFOBcpVfII0raU4NfXJagLqbJ90Ca88PQyClVg/viewform?pli=1',
  },
  eksternal: {
    icon: Users,
    title: 'Konseling External',
    desc: 'Layanan ini terbuka untuk masyarakat umum di luar civitas akademika UTM yang membutuhkan pendampingan konseling profesional. Silakan isi formulir untuk menjadwalkan sesi.',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSc58dmCxjulrFOBcpVfII0raU4NfXJagLqbJ90Ca88PQyClVg/viewform?pli=1',
  },
};

const pilihan: { key: LayananKey; icon: typeof GraduationCap; label: string }[] = [
  { key: 'mahasiswa', icon: GraduationCap, label: 'Mahasiswa' },
  { key: 'dosen', icon: Briefcase, label: 'Dosen & Tendik' },
  { key: 'eksternal', icon: Users, label: 'External' },
];

export default function Booking() {
  const [selected, setSelected] = useState<LayananKey | null>(null);

  return (
    <>
      <HeroBanner
        eyebrow="Layanan"
        title="Pendaftaran Konseling"
        subtitle="Pilih jenis layanan konseling sesuai kebutuhan Anda."
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          {/* Pilihan awal */}
          {!selected && (
            <div className="grid gap-4 sm:grid-cols-3">
              {pilihan.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setSelected(p.key)}
                  className="card-soft p-6 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'var(--primary-fixed)' }}
                  >
                    <p.icon size={26} style={{ color: 'var(--primary-dark)' }} />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: 'var(--primary-dark)' }}>
                    {p.label}
                  </h3>
                </button>
              ))}
            </div>
          )}

          {/* Detail setelah dipilih */}
          {selected && (
            <div className="card-soft p-8 max-w-xl mx-auto text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'var(--primary-fixed)' }}
              >
                {(() => {
                  const Icon = layanan[selected].icon;
                  return <Icon size={30} style={{ color: 'var(--primary-dark)' }} />;
                })()}
              </div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--primary-dark)' }}>
                {layanan[selected].title}
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                {layanan[selected].desc}
              </p>
              <a
                href={layanan[selected].link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Isi Formulir <ExternalLink size={16} />
              </a>
              <div className="mt-6">
                <button
                  onClick={() => setSelected(null)}
                  className="btn-ghost inline-flex items-center gap-2 text-sm"
                >
                  <ArrowLeft size={14} /> Kembali pilih layanan
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
