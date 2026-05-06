import { PageHeader } from '../components/PageHeader';

export default function Universitas() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumen"
        title="Universitas Trunojoyo Madura"
        subtitle="Informasi singkat mengenai identitas dan peran Universitas Trunojoyo Madura."
      />
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="card-soft p-8">
            <h2 className="mb-4">Tentang Universitas</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Universitas Trunojoyo Madura adalah perguruan tinggi negeri yang berkomitmen memberikan pendidikan tinggi inklusif dan layanan pendukung mahasiswa yang holistik.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border)] p-5 bg-[var(--surface-sunken)]">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2">Visi</p>
                <p>Mencetak lulusan berdaya saing global dan sehat secara psikologis.</p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] p-5 bg-[var(--surface-sunken)]">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2">Misi</p>
                <p>Menjadi pusat akademik yang unggul, inklusif, dan berorientasi pada kemanfaatan masyarakat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
