import { CheckCircle2, FileText, Calendar, MessageCircle, ClipboardCheck } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';

const steps = [
  { icon: FileText, title: 'Pendaftaran', desc: 'Isi formulir pendaftaran konseling melalui Google Form yang tersedia di halaman Layanan.' },
  { icon: Calendar, title: 'Penjadwalan', desc: 'Tim UPA-BK akan menghubungi Anda untuk menentukan jadwal sesi konseling sesuai ketersediaan.' },
  { icon: MessageCircle, title: 'Sesi Konseling', desc: 'Konseling dilakukan secara tatap muka atau daring bersama konselor profesional. Seluruh sesi bersifat rahasia.' },
  { icon: ClipboardCheck, title: 'Tindak Lanjut', desc: 'Setiap sesi didokumentasikan secara profesional dan ditindaklanjuti sesuai kebutuhan klien.' },
];

const notes = [
  'Layanan konseling bersifat rahasia dan gratis untuk civitas akademika UTM.',
  'Konseling tersedia untuk mahasiswa, dosen, tenaga kependidikan, dan masyarakat umum.',
  'Sesi dapat dilakukan tatap muka di Gedung Rektorat lt. 7 atau secara daring.',
  'Pembatalan jadwal harap dilakukan minimal 24 jam sebelum sesi.',
];

export default function SopKonseling() {
  return (
    <>
      <HeroBanner
        eyebrow="Dokumen"
        title="SOP Konseling"
        subtitle="Prosedur operasional standar untuk layanan konseling UPA-BK UTM."
      />

      {/* Alur Konseling */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Alur Layanan</div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Langkah-Langkah Konseling</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="card-soft p-6 relative overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="absolute top-4 right-4 text-4xl font-bold opacity-5" style={{ color: 'var(--primary)' }}>{i + 1}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--primary-fixed)' }}>
                  <step.icon size={22} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--primary-dark)' }}>{step.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ketentuan */}
      <section className="py-12" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x max-w-3xl">
          <div className="text-center mb-8">
            <div className="eyebrow mb-3">Ketentuan</div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Hal yang Perlu Diketahui</h3>
          </div>
          <div className="space-y-3">
            {notes.map((note, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
