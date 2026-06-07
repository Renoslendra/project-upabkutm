import { useEffect, useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { API_BASE_URL } from '../../config';
import { ErrorNotice } from '../components/ErrorNotice';

export default function StatistikProdi() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistik = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/public/statistik`);
        if (!response.ok) {
          throw new Error('Gagal memuat statistik dari server.');
        }
        const result = await response.json();

        if (result.success) {
          setData(result.data || []);
        } else {
          throw new Error(result.message || 'Gagal memuat statistik dari server.');
        }
      } catch (error) {
        console.error('Gagal mengambil statistik prodi:', error);
        setData([]);
        setError(error instanceof Error ? error.message : 'Gagal memuat statistik dari server.');
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
            {error ? (
              <ErrorNotice message={error} />
            ) : isLoading ? (
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
