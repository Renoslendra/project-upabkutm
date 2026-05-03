import { Link } from 'react-router';
import { BookOpen, MessageCircle, Download, FileText, AlertTriangle, Info } from 'lucide-react';
import bgGerbang from '../components/image/gerbangutm.jpg';

function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const pct = Math.min(100, (value / 42) * 100); // 42 is max score for DASS-21 per scale
  const r = 55, c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-[140px] h-[140px]">
        <svg width="140" height="140" className="-rotate-90 absolute inset-0">
          <circle cx="70" cy="70" r={r} stroke="var(--surface-hover)" strokeWidth="10" fill="none" />
          <circle cx="70" cy="70" r={r} stroke={color} strokeWidth="10" fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s' }} />
        </svg>
        <div className="text-center relative z-10 flex flex-col items-center justify-center mt-1">
          <div style={{ fontWeight: 700, fontSize: '2rem', lineHeight: 1, color: 'var(--text-primary)' }}>{value}</div>
          <div className="eyebrow mt-1.5 opacity-80" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>SKOR</div>
        </div>
      </div>
    </div>
  );
}

export default function HasilAsesmen() {
  const printDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center print:hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src={bgGerbang}
            alt="Hasil Asesmen"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content - Rata tengah */}
        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Hasil Asesmen
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
            Laporan Hasil DASS-21
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Laporan terperinci mengenai tingkat stres, kecemasan, dan depresi Anda.
          </p>
        </div>
      </section>

      <section className="section pt-10 md:pt-14 print:pt-4">
        <div className="container-x max-w-4xl space-y-8">

          {/* Action Buttons (Hidden in Print) */}
          <div className="flex justify-end print:hidden mb-6">
            <button onClick={() => window.print()} className="btn-primary">
              <Download size={18} /> Simpan sebagai PDF
            </button>
          </div>

          {/* KOP DATA DIRI */}
          <div className="card-soft p-8 border-b-4 border-b-[var(--primary)] print:border-b-2 print:shadow-none print:mb-8">
            <div className="flex justify-between items-start mb-6 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', fontWeight: 700 }}>Laporan Asesmen Psikologis</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Instrumen: DASS-21 (Depression, Anxiety, Stress Scales)</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">Tanggal Asesmen</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{printDate}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px]">
              <div className="flex justify-between border-b border-dashed pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-tertiary)' }}>Nama Lengkap</span>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Andi Pratama</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-tertiary)' }}>NIM / NPM</span>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>210411100000</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-tertiary)' }}>Fakultas</span>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Fakultas Teknik</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-tertiary)' }}>Jenis Kelamin</span>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Laki-laki</span>
              </div>
            </div>
          </div>

          {/* HASIL PER DIMENSI */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: 'var(--primary-dark)' }}>Rincian Hasil Asesmen</h3>

            {/* Depresi */}
            <div className="card-soft p-6 flex flex-col md:flex-row gap-8 items-center md:items-start print:shadow-none print:border print:mb-4">
              <div className="shrink-0 text-center">
                <Gauge value={6} label="DEPRESI" color="var(--success)" />
                <span className="badge badge-success mt-4 px-4 py-1.5 text-sm">Normal</span>
              </div>
              <div className="pt-2">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <FileText size={20} style={{ color: 'var(--success)' }}/> Dimensi Depresi
                </h4>
                <p className="mb-3 leading-loose text-[15px] md:text-base" style={{ color: 'var(--text-primary)' }}>
                  Skor Anda berada dalam rentang <strong style={{ color: 'var(--success)' }}>Normal</strong> (0-9). Ini menunjukkan bahwa saat ini Anda tidak mengalami gejala depresi yang signifikan. Anda masih memiliki motivasi yang baik, mampu menikmati aktivitas sehari-hari, dan memiliki pandangan yang cukup positif terhadap masa depan.
                </p>
              </div>
            </div>

            {/* Kecemasan */}
            <div className="card-soft p-6 flex flex-col md:flex-row gap-8 items-center md:items-start print:shadow-none print:border print:mb-4">
              <div className="shrink-0 text-center">
                <Gauge value={12} label="KECEMASAN" color="var(--warning)" />
                <span className="badge badge-warning mt-4 px-4 py-1.5 text-sm">Sedang</span>
              </div>
              <div className="pt-2">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--warning)' }}/> Dimensi Kecemasan
                </h4>
                <p className="mb-3 leading-loose text-[15px] md:text-base" style={{ color: 'var(--text-primary)' }}>
                  Skor Anda berada dalam rentang <strong style={{ color: '#8A5E10' }}>Sedang</strong> (10-14). Anda mungkin sering kali merasa gelisah, jantung berdebar cepat tanpa alasan yang jelas, atau merasa panik dalam situasi tertentu. Tingkat kecemasan ini membutuhkan perhatian agar tidak mengganggu aktivitas akademik Anda.
                </p>
              </div>
            </div>

            {/* Stres */}
            <div className="card-soft p-6 flex flex-col md:flex-row gap-8 items-center md:items-start print:shadow-none print:border print:mb-4">
              <div className="shrink-0 text-center">
                <Gauge value={22} label="STRES" color="var(--primary-light)" />
                <span className="badge badge-warning mt-4 px-4 py-1.5 text-sm" style={{ background: 'var(--surface-hover)', color: 'var(--primary-dark)' }}>Sedang</span>
              </div>
              <div className="pt-2">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Info size={20} style={{ color: 'var(--primary)' }}/> Dimensi Stres
                </h4>
                <p className="mb-3 leading-loose text-[15px] md:text-base" style={{ color: 'var(--text-primary)' }}>
                  Skor Anda berada dalam rentang <strong style={{ color: 'var(--primary-dark)' }}>Sedang</strong> (19-25). Anda cenderung merasa sulit untuk rileks, mudah tersinggung, atau merasa tegang karena beban pikiran atau tugas. Sangat disarankan untuk mulai mengelola waktu dan mencari cara untuk bersantai.
                </p>
              </div>
            </div>
          </div>

          {/* PANDUAN SKORING */}
          <div className="card-soft p-8 print:shadow-none print:border print:mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Tabel Panduan Skoring DASS-21</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr style={{ background: 'var(--surface-hover)' }}>
                    <th className="p-3 border font-semibold">Tingkat Keparahan</th>
                    <th className="p-3 border font-semibold">Depresi</th>
                    <th className="p-3 border font-semibold">Kecemasan</th>
                    <th className="p-3 border font-semibold">Stres</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-medium text-green-700">Normal</td>
                    <td className="p-3 border">0 - 9</td>
                    <td className="p-3 border">0 - 7</td>
                    <td className="p-3 border">0 - 14</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium text-yellow-600">Ringan</td>
                    <td className="p-3 border">10 - 13</td>
                    <td className="p-3 border">8 - 9</td>
                    <td className="p-3 border">15 - 18</td>
                  </tr>
                  <tr style={{ background: 'rgba(240,198,116,0.1)' }}>
                    <td className="p-3 border font-medium text-orange-600">Sedang (Hasil Anda)</td>
                    <td className="p-3 border">14 - 20</td>
                    <td className="p-3 border font-bold">10 - 14</td>
                    <td className="p-3 border font-bold">19 - 25</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium text-red-500">Parah</td>
                    <td className="p-3 border">21 - 27</td>
                    <td className="p-3 border">15 - 19</td>
                    <td className="p-3 border">26 - 33</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium text-red-700">Sangat Parah</td>
                    <td className="p-3 border">28+</td>
                    <td className="p-3 border">20+</td>
                    <td className="p-3 border">34+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>*Skor di atas merupakan hasil konversi (Skor mentah x 2) sesuai standar DASS-21.</p>
          </div>

          {/* KESIMPULAN KESELURUHAN */}
          <div className="card-soft p-8 print:shadow-none print:border print:mb-8 flex flex-col md:flex-row items-center text-center md:text-left gap-8" style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border)' }}>
            <div className="shrink-0 flex flex-col items-center md:items-start">
              <div className="eyebrow mb-2 text-center md:text-left">Total Skor</div>
              <div className="gradient-text" style={{ fontWeight: 700, fontSize: '4.5rem', lineHeight: 1, letterSpacing: '-0.03em' }}>40</div>
            </div>
            
            <div className="w-full h-px md:w-px md:h-24 shrink-0" style={{ background: 'var(--border)' }}></div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary-dark)' }}>Kesimpulan Akhir</h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm" style={{ background: 'rgba(240,198,116,0.2)', color: '#8A5E10', fontWeight: 700 }}>
                <AlertTriangle size={16} /> Terdapat Indikasi Gejala Sedang
              </div>
              <p className="text-[15px] md:text-base leading-loose font-medium" style={{ color: 'var(--text-primary)' }}>
                Berdasarkan akumulasi skor Anda (Depresi: 6, Kecemasan: 12, Stres: 22), ditemukan <strong style={{ color: 'var(--primary-dark)' }}>indikasi gejala psikologis pada tingkat Sedang</strong>. Kondisi ini mungkin mulai mengganggu kenyamanan akademik atau aktivitas sehari-hari Anda, sehingga memerlukan perhatian lebih lanjut.
              </p>
            </div>
          </div>

          {/* REKOMENDASI TERTULIS */}
          <div className="card-soft p-8 print:shadow-none print:border print:mt-4" style={{ background: 'linear-gradient(135deg, #FFF8FA 0%, #FDF2F5 100%)' }}>
            <div className="eyebrow mb-3" style={{ fontSize: '0.8rem' }}>Rekomendasi Tindak Lanjut</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-dark)' }} className="mb-4">Penjadwalan Konseling Sangat Disarankan</h3>
            <p className="mb-8 text-[15px] md:text-base leading-loose font-medium" style={{ color: 'var(--text-primary)' }}>
              Mengingat skor kecemasan dan stres Anda berada pada tingkat <strong style={{ color: 'var(--primary-dark)' }}>Sedang</strong>, kami merekomendasikan Anda untuk melakukan pendaftaran konseling bersama konselor UPA-BK UTM. Sesi ini akan membantu Anda mengidentifikasi pemicu stres dan mempelajari teknik coping (penyelesaian masalah) yang tepat.
            </p>
            <div className="flex flex-wrap gap-3 print:hidden">
              <Link to="/booking" className="btn-primary"><MessageCircle size={16} /> Daftar Konseling Sekarang</Link>
              <Link to="/artikel" className="btn-secondary"><BookOpen size={16} /> Baca Panduan Self-Care</Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
