import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import bgUtm from '../components/image/utmjaya.webp';

export default function BantuanFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/public/faq');
        const result = await response.json();

        if (result.success) {
          setFaqs(result.data || []);
          setOpenIndex((result.data || []).length > 0 ? 0 : null);
        }
      } catch (error) {
        console.error('Gagal mengambil FAQ:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, []);

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
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={faq.id} className="card-soft overflow-hidden transition-all duration-300" style={{ padding: 0 }}>
                    <button 
                      className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                    >
                      <span className="font-semibold text-lg" style={{ color: 'var(--primary-dark)' }}>
                        {faq.pertanyaan}
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
                        {faq.jawaban}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
