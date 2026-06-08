import { useEffect, useState } from 'react';
import { MapPin, Mail, Clock, Phone, ExternalLink, Instagram } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import { HeroBanner } from '../components/HeroBanner';
import { ErrorNotice } from '../components/ErrorNotice';

const WhatsappIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const contacts = [
  {
    icon: WhatsappIcon,
    label: 'WhatsApp',
    value: '(+62) 813-3995-9223',
    desc: 'Chat langsung dengan tim UPA-BK',
    href: 'https://wa.me/6281339959223',
    action: 'Chat Sekarang',
    color: '#25D366',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'upabk@trunojoyo.ac.id',
    desc: 'Pertanyaan administratif & layanan',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=upabk@trunojoyo.ac.id',
    action: 'Kirim Email',
    color: 'var(--primary-light)',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '(031) 3011146',
    desc: 'Layanan informasi & pendaftaran',
    href: 'tel:+62313011146',
    action: 'Hubungi',
    color: 'var(--primary-light)',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@konseling_utm',
    desc: 'Update kegiatan & tips kesehatan mental',
    href: 'https://www.instagram.com/konseling_utm/',
    action: 'Follow',
    color: '#E1306C',
  },
];

export default function BantuanCp() {
  const [contact, setContact] = useState<{ telepon?: string; email?: string; jam_layanan?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/public/kontak`);
        if (!response.ok) {
          throw new Error('Gagal memuat kontak dari server.');
        }
        const result = await response.json();

        if (result.success) {
          setContact(result.data);
        } else {
          throw new Error(result.message || 'Gagal memuat kontak dari server.');
        }
      } catch (error) {
        console.error('Gagal mengambil kontak:', error);
        setError(error instanceof Error ? error.message : 'Gagal memuat kontak dari server.');
      }
    };

    fetchContact();
  }, []);

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: contact?.email || 'upabk@trunojoyo.ac.id',
      desc: 'Pertanyaan administratif & layanan',
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact?.email || 'upabk@trunojoyo.ac.id'}`,
      action: 'Kirim Email',
      color: 'var(--primary-light)',
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: contact?.telepon || '(031) 3011146',
      desc: 'Layanan informasi & pendaftaran',
      href: `tel:${(contact?.telepon || '(031) 3011146').replace(/[^\d+]/g, '')}`,
      action: 'Hubungi',
      color: 'var(--primary-light)',
    },
    {
      icon: Clock,
      label: 'Jam Layanan',
      value: contact?.jam_layanan || 'Senin - Jumat, 08.00 - 16.00 WIB',
      desc: 'Waktu layanan operasional',
      href: '#',
      action: 'Lihat Jam',
      color: 'var(--primary-light)',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@konseling_utm',
      desc: 'Update kegiatan & tips kesehatan mental',
      href: 'https://www.instagram.com/konseling_utm/',
      action: 'Follow',
      color: '#E1306C',
    },
  ];

  return (
    <>
      <HeroBanner
        eyebrow="Bantuan"
        title="Hubungi Kami"
        subtitle="Tim UPA-BK UTM siap membantu Anda. Pilih cara yang paling nyaman untuk menghubungi kami."
      />

      {/* Maps + Alamat — dalam container, tidak full screen */}
      <section className="section">
        <div className="container-x max-w-5xl">
          <div className="card-soft p-0 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="h-[280px] lg:h-[320px]">
                <iframe
                  title="Lokasi UPA-BK UTM"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.123456789!2d112.7230807!3d-7.1277548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd803dd886bbff5%3A0x9777ca139b28195d!2sUniversitas%20Trunojoyo%20Madura!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-8 flex flex-col justify-center" style={{ background: 'var(--surface-sunken)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--primary-fixed)' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-dark)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary-dark)' }}>
                  Kantor UPA-BK UTM
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Gedung Rektorat lt. 7, Jl. Raya Telang,<br />
                  PO BOX 2, Kec. Kamal, Bangkalan, Jatim 69162
                </p>
                <div className="flex items-center gap-2 text-xs mb-5" style={{ color: 'var(--text-tertiary)' }}>
                  <Clock size={13} /> Senin–Jumat, 08.00–16.00 WIB
                </div>
                <a
                  href="https://www.google.com/maps/dir//Universitas+Trunojoyo+Madura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 self-start text-sm"
                >
                  Petunjuk Arah <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact cards — full width background */}
      <section className="py-16" style={{ background: 'var(--surface-sunken)' }}>
        <div className="container-x">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Kontak Kami</div>
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--primary-dark)' }}>
              Cara Menghubungi UPA-BK
            </h2>
          </div>
          {error && <ErrorNotice message={error} className="mb-8" />}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((c) => {
              const CardTag = c.href === '#' ? 'div' : 'a';
              return (
                <CardTag
                  key={c.label}
                  href={c.href === '#' ? undefined : c.href}
                  target={c.href === '#' ? undefined : '_blank'}
                  rel={c.href === '#' ? undefined : 'noopener noreferrer'}
                  className="card-soft p-6 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center bg-white"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: `${c.color}12` }}
                  >
                    <c.icon size={28} style={{ color: c.color }} />
                  </div>
                  <div className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                    {c.value}
                  </div>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>{c.desc}</p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all px-4 py-2 rounded-full"
                    style={{ color: c.color, background: `${c.color}10` }}
                  >
                    {c.action} <ExternalLink size={13} />
                  </span>
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
