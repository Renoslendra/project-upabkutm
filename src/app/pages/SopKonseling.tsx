import { PageHeader } from '../components/PageHeader';

const steps = [
  'Pelayanan konseling di UPA-BK bersifat rahasia dan tersedia gratis untuk civitas akademika UTM.',
  'Daftar dengan mengisi formulir asesmen awal, lalu lanjutkan ke formulir booking jika sudah selesai.',
  'Konseling dapat dilakukan secara tatap muka atau daring sesuai kebutuhan dan ketersediaan konselor.',
  'Setiap sesi akan didokumentasikan secara profesional dan ditindaklanjuti oleh tim konseling. ',
];

export default function SopKonseling() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumen"
        title="SOP Konseling"
        subtitle="Prosedur operasional standar untuk layanan konseling UPA-BK UTM."
      />
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="card-soft p-8">
            <div className="eyebrow mb-4">Rangkaian SOP</div>
            <ol className="space-y-4 text-[var(--text-secondary)]">
              {steps.map((step, index) => (
                <li key={step} className="rounded-3xl border border-[var(--border)] bg-[var(--surface-sunken)] p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-fixed)] text-white font-semibold mr-3">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
