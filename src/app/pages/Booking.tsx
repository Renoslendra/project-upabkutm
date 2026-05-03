import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ExternalLink, Lock, ArrowRight } from 'lucide-react';
import bgUtm from '../components/image/gambarutm2.webp';

export default function Booking() {
  const navigate = useNavigate();
  const [hasCompleted, setHasCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    // Mengecek apakah mahasiswa sudah mengisi asesmen dari localStorage
    const status = localStorage.getItem('hasCompletedAssessment') === 'true';
    setHasCompleted(status);
  }, []);

  // Jika belum mengisi asesmen, tampilkan layar diblokir
  if (hasCompleted === false) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative p-4 overflow-hidden">
        <div className="fixed inset-0 z-[-1]">
          <img src={bgUtm} alt="Background" className="w-full h-full object-cover blur-md scale-110" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="card-soft p-8 md:p-12 max-w-lg w-full relative z-10 text-center bg-white/95 backdrop-blur-3xl border-[1.5px] border-red-500/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-red-50 border-[6px] border-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Akses Diblokir!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed font-medium text-[15px]">
            Sistem mendeteksi Anda belum mengisi Asesmen DASS-21. Untuk melanjutkan ke pendaftaran konseling, setiap mahasiswa <strong>wajib</strong> mengisi asesmen terlebih dahulu agar konselor dapat memahami kondisi awal Anda.
          </p>
          <button
            onClick={() => navigate('/asesmen')}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-[16px] font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-full shadow-[0_10px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_15px_30px_rgba(239,68,68,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            Mulai Asesmen Sekarang <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Jika masih loading state
  if (hasCompleted === null) return null;

  // Jika SUDAH mengisi asesmen, tampilkan halaman Booking Google Form
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col">
      {/* Background Image & Overlay full page (fixed so it covers the footer gap too) */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src={bgUtm}
          alt="Pendaftaran Konseling"
          className="w-full h-full object-cover object-center fixed-bg"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col pt-32 md:pt-40 pb-20">
        {/* Content - Rata tengah */}
        <div className="container-x max-w-3xl text-center flex flex-col items-center mb-10 md:mb-16">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Booking
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
            Pendaftaran Konseling
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Pendaftaran jadwal konseling UPA-BK UTM saat ini diintegrasikan melalui Google Forms.
          </p>
        </div>

        <div className="container-x max-w-2xl text-center">
          <div className="card-soft p-10 bg-white/90 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Formulir Pendaftaran</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Terima kasih telah menyelesaikan asesmen awal. Silakan klik tombol di bawah ini untuk mengisi formulir pendaftaran konseling via Google Forms resmi UPA-BK UTM.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc58dmCxjulrFOBcpVfII0raU4NfXJagLqbJ90Ca88PQyClVg/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-[16px] font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Isi Formulir Sekarang <ExternalLink size={20} className="-mr-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
