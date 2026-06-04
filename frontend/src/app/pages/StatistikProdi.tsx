import { useEffect, useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';

export default function StatistikProdi() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistik = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/public/statistik');
        const result = await response.json();

        if (result.success) {
          setData(result.data || []);
        }
      } catch (error) {
        console.error('Gagal mengambil statistik prodi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistik();
  }, []);

  return (
    <>
      <HeroBanner
        eyebrow="Statistik"
        title="Tabel Per Prodi"
        subtitle="Lihat ringkasan data konseling berdasarkan program studi dari database."
      />
      <section className="section">
        <div className="container-x max-w-5xl">
          <div className="card-soft overflow-x-auto p-6">
            {isLoading ? (
              <div className="py-12 flex justify-center">
                <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
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
                    <tr key={row.id ?? row.prodi} className="border-t border-[var(--border)]">
                      <td className="py-4 font-medium">{row.prodi}</td>
                      <td className="py-4">{row.total}</td>
                      <td className="py-4">{row.konseling}</td>
                      <td className="py-4">{row.selesai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
