import React from 'react';
import { ArrowDown, LogIn, ClipboardList, Stethoscope, Star, FileText, PieChart } from 'lucide-react';
import bgUtm from '../components/image/konseling.jpg';

const steps = [
  {
    icon: <ClipboardList size={28} />,
    title: '1. Asesmen Awal',
    desc: 'Langkah pertama adalah melakukan asesmen kesehatan mental secara mandiri melalui website untuk mendeteksi tingkat stres, kecemasan, atau depresi.',
  },
  {
    icon: <FileText size={28} />,
    title: '2. Pengisian Data Diri',
    desc: 'Isi formulir data diri Anda dengan lengkap dan akurat sebelum melihat hasil asesmen.',
  },
  {
    icon: <PieChart size={28} />,
    title: '3. Hasil Asesmen',
    desc: 'Sistem akan menampilkan hasil asesmen. Jika terdapat indikasi gejala parah, Anda akan diarahkan untuk mendaftar konseling. Jika dalam batas normal, Anda akan diberikan nasihat edukasi, namun tetap diperbolehkan mendaftar jika merasa perlu.',
  },
  {
    icon: <LogIn size={28} />,
    title: '4. Pendaftaran (Booking)',
    desc: 'Pilih jadwal konselor yang tersedia melalui website atau datang langsung ke ruang UPA-BK UTM.',
  },
  {
    icon: <Stethoscope size={28} />,
    title: '5. Sesi Konseling',
    desc: 'Lakukan sesi tatap muka atau online bersama psikolog atau konselor profesional kami dalam ruang yang rahasia dan aman.',
  },
  {
    icon: <Star size={28} />,
    title: '6. Tindak Lanjut & Evaluasi',
    desc: 'Selesaikan sesi dengan evaluasi singkat. Jika diperlukan, konselor akan merekomendasikan sesi lanjutan atau rujukan.',
  },
];

export default function BantuanAlur() {
  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={bgUtm} 
            alt="Alur Layanan" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Pusat Bantuan
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
            Alur Layanan Konseling
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Panduan langkah demi langkah dari pendaftaran hingga selesainya sesi konseling Anda di UPA-BK UTM.
          </p>
        </div>
      </section>

      <section className="section pt-10 md:pt-14">
        <div className="container-x max-w-4xl">
          
          {/* VIDEO TUTORIAL SECTION */}
          <div className="card-soft p-8 md:p-12 mb-10 text-center">
            <h2 className="mb-2" style={{ fontSize: '2rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
              Panduan Asesmen
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>Lihat panduan singkat dalam video ini</p>
            
            {/* Video Player Wrapper */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md aspect-video bg-black/5" style={{ border: '1px solid var(--border)' }}>
              {/* Dummy iframe for tutorial - using a standard YouTube embed structure */}
              <iframe 
                className="absolute inset-0 w-full h-full" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1" 
                title="Panduan Asesmen UPA-BK UTM" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* TIMELINE SECTION */}
          <div className="card-soft p-8 md:p-12">
            <h2 className="mb-10 text-center" style={{ fontSize: '1.75rem', color: 'var(--primary-dark)' }}>
              Bagaimana Prosesnya?
            </h2>
            <div className="relative">
              {/* Garis Vertikal Timeline */}
              <div className="absolute left-8 md:left-10 top-10 bottom-10 w-0.5" style={{ background: 'var(--surface-hover)' }}></div>
              
              <div className="space-y-10 relative">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6 md:gap-8 group">
                    <div className="relative z-10 w-16 h-16 shrink-0 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300" 
                      style={{ background: 'var(--primary-gradient)', color: 'white' }}>
                      {step.icon}
                    </div>
                    <div className="pt-2">
                      <h3 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--primary-dark)' }}>{step.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center p-6 rounded-2xl" style={{ background: 'var(--surface-sunken)' }}>
              <p className="font-medium mb-4" style={{ color: 'var(--primary-dark)' }}>Punya pertanyaan lebih lanjut mengenai alur ini?</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/bantuan/faq" className="btn-ghost" style={{ border: '1px solid var(--border)' }}>Baca FAQ</a>
                <a href="/booking" className="btn-primary">Mulai Pendaftaran</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
