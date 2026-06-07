import { useState, useEffect } from 'react';
import { Eye, Target, ExternalLink, MapPin, Mail, Phone, GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { API_BASE_URL } from '../../config';

import { HeroBanner } from '../components/HeroBanner';
import { ImageWithFallback } from '../components/image/ImageWithFallback';
import { ErrorNotice } from '../components/ErrorNotice';
import bgUtm from '../components/image/trunojoyo-rektorat21.jpg';

// Gambar statis untuk fallback (jika database belum ada foto_url)
import imgRektor from '../components/image/REKTOR__-1024x1536.png';
import imgWr1 from '../components/image/WR_I-1-1024x1536.png';
import imgWr2 from '../components/image/WR_2-1-1024x1536.png';
import imgWr3 from '../components/image/WR_3-1-1024x1536.png';

const staticPimpinan = [
  { name: "Prof. Dr. Safi', S.H., M.H.", role: 'Rektor', img: imgRektor },
  { name: 'Prof. Dr. Achmad Amzeri, S.P., M.P.', role: 'Wakil Rektor I (Akademik)', img: imgWr1 },
  { name: 'Ir. Ari Basuki, S.T., M.T.', role: 'Wakil Rektor II (Keuangan & Umum)', img: imgWr2 },
  { name: 'Surokim, S.Sos., S.H., M.Si.', role: 'Wakil Rektor III (Kemahasiswaan)', img: imgWr3 },
];

const stats = [
  { icon: GraduationCap, label: 'Mahasiswa', value: '15.000+' },
  { icon: Users, label: 'Dosen & Tendik', value: '1.200+' },
  { icon: BookOpen, label: 'Program Studi', value: '45+' },
  { icon: Award, label: 'Fakultas', value: '8' },
];

export default function Universitas() {
  const [informasiList, setInformasiList] = useState<any[]>([]);
  const [pimpinanList, setPimpinanList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch Informasi Universitas
        const resInfo = await fetch(`${API_BASE_URL}/api/public/informasi-universitas`);
        if (!resInfo.ok) {
          throw new Error('Gagal memuat informasi universitas dari server.');
        }
        const jsonInfo = await resInfo.json();
        if (jsonInfo.success && Array.isArray(jsonInfo.data)) {
          setInformasiList(jsonInfo.data);
        } else {
          throw new Error(jsonInfo.message || 'Gagal memuat informasi universitas dari server.');
        }

        // Fetch Data Pimpinan
        const resPimpinan = await fetch(`${API_BASE_URL}/api/pimpinan/public`);
        if (!resPimpinan.ok) {
          throw new Error('Gagal memuat data pimpinan dari server.');
        }
        const jsonPimpinan = await resPimpinan.json();
        if (jsonPimpinan.success && Array.isArray(jsonPimpinan.data)) {
          setPimpinanList(jsonPimpinan.data);
        } else {
          throw new Error(jsonPimpinan.message || 'Gagal memuat data pimpinan dari server.');
        }
      } catch (e) {
        console.error('Gagal memuat data universitas', e);
        setInformasiList([]);
        setPimpinanList([]);
        setError(e instanceof Error ? e.message : 'Gagal memuat data universitas dari server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return d;
    }
  };

  return (
    <>
      <HeroBanner
        eyebrow="Dokumen"
        title="Universitas Trunojoyo Madura"
        subtitle="Unggul, Tangguh, Mandiri — Excellence Based On Local Wisdom."
        bgSrc={bgUtm}
      />

      {/* Tagline cards */}
      <section className="section">
        <div className="container-x max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Unggul', desc: 'Menyelenggarakan Tri Dharma Perguruan Tinggi yang bermutu dan mampu bersaing di tingkat nasional dan internasional.' },
              { title: 'Tangguh', desc: 'Mampu menghadapi perkembangan teknologi dan inovasi maupun kebijakan pemerintah di bidang pendidikan.' },
              { title: 'Mandiri', desc: 'Mandiri dalam keilmuan dan keuangan untuk mendukung kemajuan institusi secara berkelanjutan.' },
            ].map((item) => (
              <div key={item.title} className="card-soft p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-12" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x max-w-4xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--primary-fixed)' }}>
                  <s.icon size={22} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <ImageWithFallback
                src={bgUtm}
                alt="Kampus UTM"
                className="w-full h-[260px] object-cover"
              />
            </div>
            <div>
              <div className="eyebrow mb-3">Tentang UTM</div>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>Sejak 2001</h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                Universitas Trunojoyo Madura resmi menjadi perguruan tinggi negeri berdasarkan Keputusan Presiden tanggal 5 Juli 2001. UTM berkomitmen memberikan pendidikan tinggi inklusif dan layanan pendukung mahasiswa yang holistik.
              </p>
              <a
                href="https://www.trunojoyo.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Website Resmi UTM <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-12" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x max-w-4xl">
          <div className="text-center mb-8">
            <div className="eyebrow mb-2">Visi & Misi</div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Arah Universitas</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-soft p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                  <Eye size={18} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Visi</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                Pada tahun 2030 menjadi institusi yang mampu mewujudkan lulusan yang cerdas, berdaya saing, berakhlakul karimah dan unggul dalam pendidikan serta riset berdasarkan potensi Madura.
              </p>
            </div>
            <div className="card-soft p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-fixed)' }}>
                  <Target size={18} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Misi</h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />Menyelenggarakan pendidikan tinggi yang bermutu dan berdaya saing.</li>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />Melaksanakan penelitian yang inovatif berbasis potensi lokal.</li>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />Melaksanakan pengabdian kepada masyarakat yang bermanfaat.</li>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />Menyelenggarakan tata kelola universitas yang baik dan akuntabel.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Informasi & Edaran (Dynamic Fetch) */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Informasi</div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Edaran & Pengumuman Terbaru</h2>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Pusat informasi akademik dan administrasi mahasiswa.</p>
          </div>

          {error ? (
            <ErrorNotice message={error} className="mb-8" />
          ) : isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {informasiList.length === 0 ? (
                <div className="card-soft p-10 text-center" style={{ color: 'var(--text-secondary)' }}>
                  Belum ada informasi akademik yang tersedia.
                </div>
              ) : (
                informasiList.map((item: any) => (
                  <div key={item.id} className="card-soft p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg" style={{ color: 'var(--primary-dark)' }}>{item.judul}</h3>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary-fixed)] text-[var(--primary-dark)]">{item.kategori}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {item.deskripsi?.slice(0, 220)}{item.deskripsi && item.deskripsi.length > 220 ? '...' : ''}
                      </p>
                      {item.created_at && (
                        <div className="text-xs mt-3 font-medium" style={{ color: 'var(--text-tertiary)' }}>
                          Dipublikasikan: {formatDate(item.created_at)}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {item.link_edaran ? (
                        <a href={item.link_edaran} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm whitespace-nowrap">
                          Lihat Edaran <ExternalLink size={14} />
                        </a>
                      ) : (
                        <button className="btn-ghost text-sm whitespace-nowrap opacity-50 cursor-not-allowed" disabled>Tidak ada edaran</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pimpinan (Dynamic Fetch dengan Static Fallback) */}
      <section className="py-12" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x max-w-5xl">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Pimpinan</div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Pimpinan Universitas Trunojoyo Madura</h2>
          </div>

          {pimpinanList.length > 0 ? (
            <>
              {/* Rektor — Mengambil data pertama (urutan 1) */}
              <div className="card-soft p-0 overflow-hidden mb-8 bg-white">
                <div className="grid md:grid-cols-[240px_1fr]">
                  <div className="h-[240px] md:h-auto bg-slate-100">
                    <ImageWithFallback 
                      src={pimpinanList[0].foto_url || imgRektor} 
                      alt={pimpinanList[0].nama} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="eyebrow mb-2">{pimpinanList[0].role}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>{pimpinanList[0].nama}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Memimpin Universitas Trunojoyo Madura dalam mewujudkan visi institusi yang unggul, tangguh, dan mandiri.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wakil Rektor (Sisanya) */}
              <div className="grid sm:grid-cols-3 gap-6">
                {pimpinanList.slice(1).map((p, index) => {
                  const fallbackImg = [imgWr1, imgWr2, imgWr3][index] || imgWr1;
                  return (
                    <div key={p.id} className="card-soft p-0 overflow-hidden text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white">
                      <div className="h-[200px] overflow-hidden bg-slate-100">
                        <ImageWithFallback 
                          src={p.foto_url || fallbackImg} 
                          alt={p.nama} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--primary-dark)' }}>{p.nama}</h4>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{p.role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* FALLBACK STATIS: Ditampilkan jika database pimpinan belum diisi atau error fetching */
            <>
              <div className="card-soft p-0 overflow-hidden mb-8 bg-white">
                <div className="grid md:grid-cols-[240px_1fr]">
                  <div className="h-[240px] md:h-auto">
                    <ImageWithFallback src={staticPimpinan[0].img} alt={staticPimpinan[0].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="eyebrow mb-2">Rektor</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>{staticPimpinan[0].name}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Memimpin Universitas Trunojoyo Madura dalam mewujudkan visi institusi yang unggul, tangguh, dan mandiri.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {staticPimpinan.slice(1).map((p) => (
                  <div key={p.name} className="card-soft p-0 overflow-hidden text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white">
                    <div className="h-[200px] overflow-hidden">
                      <ImageWithFallback src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--primary-dark)' }}>{p.name}</h4>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Kontak */}
      <section className="py-10">
        <div className="container-x max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-5 text-center text-sm">
            <a href="https://www.google.com/maps/dir//Universitas+Trunodjoyo+Madura" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <MapPin size={20} style={{ color: 'var(--primary)' }} />
              <span>Jl. Raya Telang PO BOX 2, Kamal – Bangkalan</span>
            </a>
            <a href="mailto:humas@trunojoyo.ac.id" className="flex flex-col items-center gap-2 hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <Mail size={20} style={{ color: 'var(--primary)' }} />
              <span>humas@trunojoyo.ac.id</span>
            </a>
            <a href="tel:+62313011146" className="flex flex-col items-center gap-2 hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <Phone size={20} style={{ color: 'var(--primary)' }} />
              <span>031-3011146</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
