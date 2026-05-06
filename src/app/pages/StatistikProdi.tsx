import { PageHeader } from '../components/PageHeader';

const data = [
  { prodi: 'Psikologi', total: 124, konseling: 84, selesai: 70 },
  { prodi: 'Teknik Informatika', total: 98, konseling: 57, selesai: 48 },
  { prodi: 'Manajemen', total: 76, konseling: 35, selesai: 28 },
  { prodi: 'Akuntansi', total: 63, konseling: 29, selesai: 22 },
];

export default function StatistikProdi() {
  return (
    <>
      <PageHeader
        eyebrow="Statistik"
        title="Tabel Per Prodi"
        subtitle="Lihat ringkasan data manual konseling berdasarkan program studi."
      />
      <section className="section">
        <div className="container-x max-w-5xl">
          <div className="card-soft overflow-x-auto p-6">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-sm uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                  <th className="pb-4">Program Studi</th>
                  <th className="pb-4">Total Permintaan</th>
                  <th className="pb-4">Dalam Konseling</th>
                  <th className="pb-4">Selesai</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.prodi} className="border-t border-[var(--border)]">
                    <td className="py-4 font-medium">{row.prodi}</td>
                    <td className="py-4">{row.total}</td>
                    <td className="py-4">{row.konseling}</td>
                    <td className="py-4">{row.selesai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
