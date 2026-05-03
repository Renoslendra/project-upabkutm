import { useState } from 'react';
import { Link } from 'react-router';
import { Check, ShieldCheck, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Blobs } from '../components/Blobs';
import bgUtm from '../components/image/bg-utm.jpg';

const steps = ['Info', 'Data Diri', 'Depresi', 'Kecemasan', 'Stres'];
const options = [
  { v: 0, l: 'Tidak pernah' },
  { v: 1, l: 'Kadang-kadang' },
  { v: 2, l: 'Sering' },
  { v: 3, l: 'Hampir selalu' },
];
const sampleQuestions = [
  'Saya merasa sulit bersantai',
  'Saya merasa mulut saya terasa kering',
  'Saya tidak merasakan perasaan positif',
  'Saya mengalami kesulitan bernafas',
  'Saya merasa sulit untuk memulai sesuatu',
  'Saya cenderung bereaksi berlebihan',
  'Saya merasa gemetar (mis. tangan)',
];

export default function Asesmen() {
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    fakultas: '',
    gender: ''
  });
  const totalQuestions = 21;
  const answeredCount = Object.keys(answers).length;

  return (
    <>
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={bgUtm} 
            alt="Gedung UTM" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content - Rata tengah */}
        <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
            Asesmen 
          </div>
          <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
            Asesmen Kesehatan Mental
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            Jawab beberapa pertanyaan singkat untuk memahami kondisi stres, kecemasan, dan suasana hati Anda.
          </p>
        </div>
      </section>

      <section className="section pt-10 md:pt-14">
        <div className="container-x max-w-3xl">
          {/* Stepper */}
          <div className="flex justify-between mb-12 relative z-10">
            {steps.map((s, i) => (
              <div key={s} className={`flex items-start ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex flex-col items-center gap-2 w-16 -ml-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all shrink-0 border ${i <= step ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-transparent shadow-[0_8px_16px_rgba(236,72,153,0.3)]' : 'bg-white/90 backdrop-blur-xl border-[1.5px] border-white/80 text-gray-700 shadow-sm'}`} style={{ fontWeight: 600 }}>
                    {i < step ? <Check size={18} /> : i + 1}
                  </div>
                  <span className={`text-[0.8rem] hidden sm:block font-medium whitespace-nowrap px-3 py-1 rounded-full transition-all ${i <= step ? 'bg-white/90 backdrop-blur-md text-pink-600 shadow-sm border border-white/60' : 'bg-white/70 backdrop-blur-sm text-gray-700 border border-white/40 shadow-sm'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-2 rounded-full mx-2 mt-4 transition-all ${i < step ? 'bg-gradient-to-r from-pink-500 to-rose-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-white/70 backdrop-blur-md border border-white/40 shadow-sm'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Progress */}
          {step > 1 && (
            <div className="mb-6 bg-white/90 backdrop-blur-xl p-4 md:p-5 rounded-2xl border-[1.5px] border-white/80 shadow-sm relative z-10">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600 font-medium">Pertanyaan {Math.min(answeredCount + 1, totalQuestions)} dari {totalQuestions}</span>
                <span className="text-pink-600 font-bold">{Math.round((answeredCount / totalQuestions) * 100)}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden bg-gray-100 border border-white/50 shadow-inner">
                <div className="h-full rounded-full transition-all bg-gradient-to-r from-pink-500 to-rose-400" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Card */}
          <div className="card-soft p-8 md:p-10 bg-white/95 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative z-10">
            {step === 0 && (
              <div className="space-y-5">
                <h2 style={{ fontSize: '1.5rem' }}>Tentang Asesmen DASS-21</h2>
                <p>DASS-21 adalah instrumen pengukuran tingkat depresi, kecemasan, dan stres yang banyak digunakan secara klinis. Hasil bersifat indikatif dan tidak menggantikan konsultasi klinis profesional.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-sm">
                    <Clock size={20} style={{ color: 'var(--primary)' }} />
                    <div><div style={{ fontWeight: 600 }}>Estimasi 10 menit</div><div className="text-sm" style={{ color: 'var(--text-secondary)' }}>21 pertanyaan singkat</div></div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-sm">
                    <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
                    <div><div style={{ fontWeight: 600 }}>Privasi terjaga</div><div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Data hanya untuk Anda</div></div>
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer pt-3">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-[3px] w-4 h-4 accent-[var(--primary)] shrink-0" />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Saya bersedia menjawab dengan jujur dan memahami bahwa hasil ini bersifat indikatif.</span>
                </label>
              </div>
            )}
            
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', fontWeight: 700 }} className="mb-2">Data Diri</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Silakan isi data diri Anda dengan lengkap dan akurat</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary-dark)' }}>Nama Lengkap</label>
                    <input type="text" className="input-field w-full bg-white/80 backdrop-blur-md border-[1.5px] border-white/60 shadow-sm focus:bg-white focus:border-pink-300" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary-dark)' }}>NIM/NPM</label>
                    <input type="text" className="input-field w-full bg-white/80 backdrop-blur-md border-[1.5px] border-white/60 shadow-sm focus:bg-white focus:border-pink-300" placeholder="Contoh: 1234567890" value={formData.nim} onChange={(e) => setFormData({...formData, nim: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary-dark)' }}>Email</label>
                    <input type="email" className="input-field w-full bg-white/80 backdrop-blur-md border-[1.5px] border-white/60 shadow-sm focus:bg-white focus:border-pink-300" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary-dark)' }}>Unit/Fakultas</label>
                      <select className="input-field w-full bg-white/80 backdrop-blur-md border-[1.5px] border-white/60 shadow-sm focus:bg-white focus:border-pink-300" value={formData.fakultas} onChange={(e) => setFormData({...formData, fakultas: e.target.value})}>
                        <option value="">Pilih Unit/Fakultas</option>
                        <option value="FT">Fakultas Teknik</option>
                        <option value="FE">Fakultas Ekonomi dan Bisnis</option>
                        <option value="FH">Fakultas Hukum</option>
                        <option value="FP">Fakultas Pertanian</option>
                        <option value="FIP">Fakultas Ilmu Pendidikan</option>
                        <option value="FISIB">Fakultas Ilmu Sosial dan Ilmu Budaya</option>
                        <option value="FKIS">Fakultas Keislaman</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary-dark)' }}>Jenis Kelamin</label>
                      <select className="input-field w-full bg-white/80 backdrop-blur-md border-[1.5px] border-white/60 shadow-sm focus:bg-white focus:border-pink-300" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step > 1 && (
              <div className="space-y-7">
                <div>
                  <div className="eyebrow mb-2">{steps[step]}</div>
                  <h2 style={{ fontSize: '1.4rem' }}>Pilih jawaban yang paling sesuai dengan keadaan Anda satu minggu terakhir.</h2>
                </div>
                {sampleQuestions.slice(0, 3).map((q, qi) => {
                  const key = `${step}-${qi}`;
                  return (
                    <div key={key} className="space-y-3 pb-6 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                      <div style={{ fontWeight: 500 }}>{q}</div>
                      <div className="grid sm:grid-cols-4 gap-2">
                        {options.map((o) => {
                          const sel = answers[key] === o.v;
                          return (
                            <button key={o.v} type="button" onClick={() => setAnswers({ ...answers, [key]: o.v })}
                              className={`flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-all border ${sel ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-transparent shadow-[0_8px_16px_rgba(236,72,153,0.3)]' : 'bg-white/80 backdrop-blur-md border-[1.5px] border-white/60 text-gray-700 hover:bg-white shadow-sm'}`}>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${sel ? 'border-white bg-white' : 'border-gray-300 bg-transparent'}`}>
                                {sel && <Check size={12} className="text-pink-500" />}
                              </div>
                              <div><div style={{ fontWeight: 600 }}>{o.v}</div>{o.l}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between gap-3 mt-8">
              <button type="button" className="btn-ghost flex-1 justify-center sm:flex-none" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                style={{ border: '1px solid var(--border)', background: 'transparent' }}>
                <ArrowLeft size={16} /> Kembali
              </button>
              {step < steps.length - 1 ? (
                <button type="button" className="btn-primary flex-1 justify-center sm:flex-none" 
                  disabled={
                    (step === 0 && !consent) || 
                    (step === 1 && (!formData.nama || !formData.nim || !formData.email || !formData.fakultas || !formData.gender))
                  } 
                  onClick={() => setStep(step + 1)}>
                  Lanjut <ArrowRight size={16} />
                </button>
              ) : (
                <Link 
                  to="/hasil-asesmen" 
                  className="btn-primary" 
                  onClick={() => localStorage.setItem('hasCompletedAssessment', 'true')}
                >
                  Lihat Hasil <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
