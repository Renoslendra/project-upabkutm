import { Link } from 'react-router';
import { Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { Blobs } from './Blobs';

const Tiktok = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const WhatsappIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative overflow-hidden mt-16" style={{ background: 'var(--surface-dark)', color: 'var(--text-on-dark)' }}>
      <Blobs variant="footer" />
      <div className="container-x relative z-10 py-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + Sosmed */}
        <div className="space-y-4">
          <Logo light />
          <p style={{ color: 'var(--text-on-dark)', opacity: 0.85 }} className="text-sm leading-relaxed">
            Unit Penunjang Akademik Bimbingan dan Konseling — Universitas Trunodjoyo Madura. Ruang aman untuk cerita, tumbuh, dan pulih.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="https://www.instagram.com/konseling_utm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=upakonselingutm@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Mail size={18} />
            </a>
            <a href="https://www.tiktok.com/@konseling_utm?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Tiktok size={18} />
            </a>
            <a href="https://x.com/UPAKONSELINGUTM" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <XIcon size={18} />
            </a>
          </div>
        </div>

        {/* Navigasi (top-level dari Navbar) */}
        <div>
          <h4 className="text-white mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-on-dark)' }}>
            <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">Beranda</Link></li>
            <li><Link to="/tentang" className="hover:text-white hover:translate-x-1 inline-block transition-all">Profil</Link></li>
            <li><Link to="/booking" className="hover:text-white hover:translate-x-1 inline-block transition-all">Layanan</Link></li>
            <li><Link to="/dokumen/sop-konseling" className="hover:text-white hover:translate-x-1 inline-block transition-all">Dokumen</Link></li>
            <li><Link to="/statistik/prodi" className="hover:text-white hover:translate-x-1 inline-block transition-all">Statistik</Link></li>
            <li><Link to="/bantuan/faq" className="hover:text-white hover:translate-x-1 inline-block transition-all">Bantuan</Link></li>
          </ul>
        </div>

        {/* Layanan & Dokumen penting */}
        <div>
          <h4 className="text-white mb-4">Layanan</h4>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-on-dark)' }}>
            <li><Link to="/booking" className="hover:text-white hover:translate-x-1 inline-block transition-all">Konseling Mahasiswa</Link></li>
            <li><Link to="/booking" className="hover:text-white hover:translate-x-1 inline-block transition-all">Konseling Dosen &amp; Tendik</Link></li>
            <li><Link to="/booking" className="hover:text-white hover:translate-x-1 inline-block transition-all">Konseling External</Link></li>
            <li><Link to="/dokumen/sop-konseling" className="hover:text-white hover:translate-x-1 inline-block transition-all">SOP Konseling</Link></li>
            <li><Link to="/artikel" className="hover:text-white hover:translate-x-1 inline-block transition-all">Artikel</Link></li>
            <li><Link to="/bantuan/faq" className="hover:text-white hover:translate-x-1 inline-block transition-all">FAQ</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-white mb-4">Kontak</h4>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--text-on-dark)' }}>
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <a href="https://www.google.com/maps/dir//Universitas+Trunodjoyo+Madura,+Jl.+Raya+Telang,+Perumahan+Telang+Inda,+Telang,+Kec.+Kamal,+Kabupaten+Bangkalan,+Jawa+Timur+69162/@-7.242522,112.6317837,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd803dd886bbff5:0x9777ca139b28195d!2m2!1d112.7230807!2d-7.1277548?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">
                Gedung Rektorat lt. 7,<br />Jl. Raya Telang, PO BOX 2,<br />Kamal, Bangkalan, Jatim 69162
              </a>
            </li>
            <li className="flex gap-2">
              <WhatsappIcon size={16} className="mt-0.5 shrink-0" />
              <a href="https://wa.me/6281339959223" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(+62) 813-3995-9223</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=upabk@trunojoyo.ac.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">upabk@trunojoyo.ac.id</a>
            </li>
            <li className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0" /> Senin–Jumat, 08.00–16.00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="container-x relative z-10 pb-8 text-xs" style={{ color: 'rgba(232,213,224,0.65)' }}>
        © 2026 UPA-BK Universitas Trunodjoyo Madura. All rights reserved.
      </div>
    </footer>
  );
}
