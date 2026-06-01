import { useState } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import bgUtmku from '../components/image/utmku.jpg';
export default function Evaluasi() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <>
        <PageHeader eyebrow="Terima Kasih" title="Feedback Anda diterima" />
        <section className="section">
          <div className="container-x max-w-xl text-center card-soft p-10">
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5" style={{ background: 'rgba(123,198,126,0.18)' }}>
              <CheckCircle2 size={40} style={{ color: '#2F7B33' }} />
            </div>
            <h2 className="mb-3">Terima kasih atas feedback Anda!</h2>
            <p>Masukan Anda membantu kami meningkatkan kualitas layanan UPA-BK.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center -mt-16 md:-mt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={bgUtmku} 
            alt="Evaluasi Sesi" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content - Rata tengah */}
        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Evaluasi Pasca-Sesi
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
            Bagaimana Pengalaman Konseling Anda?
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Bagikan pengalaman Anda — feedback Anda sangat berarti.
          </p>
        </div>
      </section>
      <section className="section pt-10 md:pt-14">
        <div className="container-x max-w-2xl">
          <form className="card-soft p-8 md:p-10 space-y-6" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <div>
              <div className="eyebrow mb-3">Rating</div>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((n) => {
                  const filled = (hover || rating) >= n;
                  return (
                    <button key={n} type="button" onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)}
                      className="p-2 transition-transform hover:scale-110">
                      <Star size={36} fill={filled ? '#F0C674' : 'transparent'} stroke={filled ? '#F0C674' : 'var(--text-tertiary)'} strokeWidth={1.5} />
                    </button>
                  );
                })}
              </div>
              {rating > 0 && <div className="text-center text-sm mt-2" style={{ color: 'var(--primary)', fontWeight: 500 }}>
                {['Kurang', 'Cukup', 'Baik', 'Sangat Baik', 'Luar Biasa'][rating - 1]}
              </div>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm">Cerita pengalaman Anda</label>
              <textarea rows={6} className="input-field" placeholder="Ceritakan pengalaman Anda…" />
            </div>

            <div className="space-y-3">
              <div className="text-sm" style={{ fontWeight: 500 }}>Aspek yang dinilai</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {['Empati Konselor', 'Kenyamanan Ruang', 'Ketepatan Waktu', 'Manfaat Sesi'].map((a) => (
                  <label key={a} className="flex items-center gap-2 p-3 rounded-xl cursor-pointer" style={{ background: 'var(--surface-sunken)' }}>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--primary)]" />
                    <span className="text-sm">{a}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={rating === 0}>Kirim Evaluasi</button>
          </form>
        </div>
      </section>
    </>
  );
}
