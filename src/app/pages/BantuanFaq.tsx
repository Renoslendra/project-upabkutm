import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import bgUtm from '../components/image/utmjaya.webp';

const faqs = [
  {
    q: 'Apakah layanan konseling ini gratis untuk mahasiswa?',
    a: 'Ya, seluruh layanan bimbingan dan konseling di UPA-BK UTM 100% gratis untuk seluruh mahasiswa aktif Universitas Trunojoyo Madura.',
  },
  {
    q: 'Bagaimana cara mendaftar sesi konseling?',
    a: 'Anda dapat mendaftar melalui menu "Daftar Konseling" di website ini. Anda akan diminta untuk memilih jadwal, mengisi data diri, dan mengisi kuesioner singkat (Asesmen) sebelum sesi dimulai.',
  },
  {
    q: 'Apakah rahasia saya terjamin?',
    a: 'Tentu saja. UPA-BK UTM memegang teguh asas kerahasiaan sesuai kode etik psikologi. Data dan cerita Anda tidak akan dibagikan kepada pihak mana pun tanpa persetujuan tertulis dari Anda, kecuali dalam kondisi yang membahayakan nyawa.',
  },
  {
    q: 'Berapa lama durasi satu sesi konseling?',
    a: 'Satu sesi konseling biasanya berlangsung sekitar 45 hingga 60 menit. Konselor akan menyesuaikan durasi berdasarkan kebutuhan dan kondisi Anda saat sesi berlangsung.',
  },
  {
    q: 'Siapa saja konselor yang ada di UPA-BK UTM?',
    a: 'Konselor kami terdiri dari Psikolog Klinis dan Dosen Bimbingan Konseling yang bersertifikasi dan berpengalaman dalam menangani permasalahan akademik maupun psikologis mahasiswa.',
  },
  {
    q: 'Apakah saya bisa membatalkan jadwal yang sudah dipesan?',
    a: 'Bisa. Harap hubungi admin kami melalui WhatsApp atau menu pembatalan di akun Anda maksimal 24 jam sebelum jadwal sesi dimulai, agar jadwal tersebut dapat digunakan oleh mahasiswa lain yang membutuhkan.',
  },
];

export default function BantuanFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center -mt-16 md:-mt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={bgUtm} 
            alt="FAQ UPA-BK UTM" 
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
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Temukan jawaban atas pertanyaan-pertanyaan yang sering diajukan mengenai layanan UPA-BK UTM.
          </p>
        </div>
      </section>

      <section className="section pt-10 md:pt-14">
        <div className="container-x max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="card-soft overflow-hidden transition-all duration-300" style={{ padding: 0 }}>
                  <button 
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <span className="font-semibold text-lg" style={{ color: 'var(--primary-dark)' }}>
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300" 
                      style={{ 
                        background: isOpen ? 'var(--primary-gradient)' : 'var(--surface-input)', 
                        color: isOpen ? 'white' : 'var(--text-tertiary)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'
                      }}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  <div 
                    className="transition-all duration-300 ease-in-out"
                    style={{ 
                      maxHeight: isOpen ? '500px' : '0', 
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="p-6 pt-0 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center card-soft p-10" style={{ background: 'var(--surface-sunken)' }}>
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 shadow-md" style={{ background: 'white' }}>
              <MessageCircle size={28} style={{ color: 'var(--primary)' }} />
            </div>
            <h2 className="mb-3 text-xl" style={{ color: 'var(--primary-dark)' }}>Masih Punya Pertanyaan?</h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi tim UPA-BK UTM.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/bantuan/cp" className="btn-primary">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
