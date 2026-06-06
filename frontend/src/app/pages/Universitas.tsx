import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

import imgRektor from '../components/image/REKTOR__-1024x1536.png';
import imgWr1 from '../components/image/WR_I-1-1024x1536.png';
import imgWr2 from '../components/image/WR_2-1-1024x1536.png';
import imgWr3 from '../components/image/WR_3-1-1024x1536.png';

export default function Universitas() {
  const [informasiList, setInformasiList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInformasi = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/informasi-universitas');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) setInformasiList(json.data);
      } catch (e) {
        console.error('Gagal memuat informasi universitas', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInformasi();
  }, []);

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return d;
    }
  };

  return (
    <>
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="mb-6">
            <div className="eyebrow">Dokumen</div>
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Universitas</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Pusat informasi akademik dan administrasi mahasiswa.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-4xl">
          {isLoading ? (
            <div className="card-soft p-6">Memuat informasi...</div>
          ) : (
            <div className="space-y-4">
              {informasiList.length === 0 ? (
                <div className="card-soft p-6 text-center" style={{ color: 'var(--text-secondary)' }}>
                  Belum ada informasi akademik yang tersedia.
                </div>
              ) : (
                informasiList.map((item: any) => (
                  <div key={item.id} className="card-soft p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>{item.judul}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--primary-fixed)] text-[var(--primary-dark)]">{item.kategori}</span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.deskripsi?.slice(0, 220)}{item.deskripsi && item.deskripsi.length > 220 ? '...' : ''}</p>
                      {item.created_at && (
                        <div className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{formatDate(item.created_at)}</div>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-3">
                      {item.link_edaran ? (
                        <a href={item.link_edaran} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                          Lihat Edaran <ExternalLink size={14} />
                        </a>
                      ) : (
                        <button className="btn-ghost text-sm" disabled>Tidak ada edaran</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
