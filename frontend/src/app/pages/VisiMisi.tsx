import { useEffect, useState } from 'react';
import { Eye, Target, Flag } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { HeroBanner } from '../components/HeroBanner';
import { ErrorNotice } from '../components/ErrorNotice';

export default function VisiMisi() {
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState<string[]>([]);
  const [tujuan, setTujuan] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/public/visi-misi`);
        if (!response.ok) {
          throw new Error('Gagal memuat visi misi dari server.');
        }
        const result = await response.json();

        if (result.success) {
          const rows = result.data || [];
          const visiRow = rows.find((item: any) => item.kategori === 'visi');
          setVisi(visiRow?.konten || '');
          setMisi(rows.filter((item: any) => item.kategori === 'misi').map((item: any) => item.konten));
          setTujuan(rows.filter((item: any) => item.kategori === 'tujuan').map((item: any) => item.konten));
        } else {
          throw new Error(result.message || 'Gagal memuat visi misi dari server.');
        }
      } catch (error) {
        console.error('Gagal mengambil data visi misi:', error);
        setError(error instanceof Error ? error.message : 'Gagal memuat visi misi dari server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  return (
    <>
      <HeroBanner
        eyebrow="Profil"
        title="Visi Misi Tujuan"
        subtitle="Arah dan tujuan UPA-BK Universitas Trunojoyo Madura."
      />

      <section className="section">
        <div className="container-x max-w-4xl">
          {error ? (
            <ErrorNotice message={error} className="mb-8" />
          ) : isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="card-soft p-8 md:p-10 mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                    <Eye size={20} style={{ color: 'var(--primary-dark)' }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Visi</h3>
                </div>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {visi || 'Data visi belum tersedia.'}
                </p>
              </div>

              <div className="card-soft p-8 md:p-10 mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                    <Target size={20} style={{ color: 'var(--primary-dark)' }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Misi</h3>
                </div>
                <div className="space-y-3">
                  {misi.length > 0 ? misi.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white" style={{ background: 'var(--primary)' }}>{i + 1}</span>
                      <p className="text-base leading-relaxed pt-1" style={{ color: 'var(--text-primary)' }}>{item}</p>
                    </div>
                  )) : (
                    <p style={{ color: 'var(--text-secondary)' }}>Data misi belum tersedia.</p>
                  )}
                </div>
              </div>

              <div className="card-soft p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                    <Flag size={20} style={{ color: 'var(--primary-dark)' }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Tujuan</h3>
                </div>
                <div className="space-y-3">
                  {tujuan.length > 0 ? tujuan.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>{item}</p>
                    </div>
                  )) : (
                    <p style={{ color: 'var(--text-secondary)' }}>Data tujuan belum tersedia.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
