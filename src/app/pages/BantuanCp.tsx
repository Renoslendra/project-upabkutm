import { PageHeader } from '../components/PageHeader';

export default function BantuanCp() {
  return (
    <>
      <PageHeader
        eyebrow="Bantuan"
        title="Contact Person UPA-BK"
        subtitle="Hubungi tim UPA-BK Universitas Trunojoyo Madura untuk dukungan konseling dan informasi layanan."
      />
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="card-soft p-8">
            <div className="eyebrow mb-3">Contact Person</div>
            <h2 className="mb-6">Informasi Kontak Resmi</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-[var(--primary)] mb-2">Konsultasi Umum</div>
                <div className="text-lg font-semibold">(031) 3011146</div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Layanan informasi, pendaftaran, dan rujukan.</p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-[var(--primary)] mb-2">Email Resmi</div>
                <div className="text-lg font-semibold">upabk@trunojoyo.ac.id</div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Gunakan email ini untuk pertanyaan administratif dan layanan.</p>
              </div>
            </div>
            <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-sunken)] p-6">
              <h3 className="mb-3 text-lg font-semibold">Jam Layanan</h3>
              <p className="text-[var(--text-secondary)]">Senin–Jumat, 08.00–16.00 WIB. Di luar jam ini, silakan tinggalkan pesan melalui email atau formulir kontak.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
