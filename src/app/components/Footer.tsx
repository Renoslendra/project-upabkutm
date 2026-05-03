import { Link } from 'react-router';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './Logo';
import { Blobs } from './Blobs';

export function Footer() {
  return (
    <footer className="relative overflow-hidden mt-16" style={{ background: 'var(--surface-dark)', color: 'var(--text-on-dark)' }}>
      <Blobs variant="footer" />
      <div className="container-x relative z-10 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p style={{ color: 'var(--text-on-dark)', opacity: 0.85 }} className="text-sm">
            Unit Penunjang Akademik Bimbingan dan Konseling — Universitas Trunodjoyo Madura. Ruang aman untuk cerita, tumbuh, dan pulih.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="mailto:upabk@trunojoyo.ac.id" aria-label="Email" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Mail size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-on-dark)' }}>
            <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">Beranda</Link></li>
            <li><Link to="/tentang" className="hover:text-white hover:translate-x-1 inline-block transition-all">Tentang Kami</Link></li>
            <li><Link to="/artikel" className="hover:text-white hover:translate-x-1 inline-block transition-all">Artikel & Edukasi</Link></li>
            <li><Link to="/bantuan" className="hover:text-white hover:translate-x-1 inline-block transition-all">Pusat Bantuan</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">Layanan</h4>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-on-dark)' }}>
            <li><Link to="/asesmen" className="hover:text-white hover:translate-x-1 inline-block transition-all">Asesmen Mental</Link></li>
            <li><Link to="/booking" className="hover:text-white hover:translate-x-1 inline-block transition-all">Pendaftaran Konseling</Link></li>
            <li><Link to="/kegiatan" className="hover:text-white hover:translate-x-1 inline-block transition-all">Berita Kegiatan</Link></li>
            <li><Link to="/evaluasi" className="hover:text-white hover:translate-x-1 inline-block transition-all">Evaluasi Sesi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">Kontak</h4>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--text-on-dark)' }}>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Jl. Raya Telang, Bangkalan, Madura</li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              <a href="tel:0313011146" className="hover:text-white transition-colors">(031) 3011146</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <a href="mailto:upabk@trunojoyo.ac.id" className="hover:text-white transition-colors">upabk@trunojoyo.ac.id</a>
            </li>
            <li className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0" /> Sen–Jum, 08.00–16.00</li>
          </ul>
        </div>
      </div>
      <div className="container-x relative z-10 pb-8 text-xs" style={{ color: 'rgba(232,213,224,0.65)' }}>
        © 2026 UPA-BK Universitas Trunodjoyo Madura. All rights reserved.
      </div>
    </footer>
  );
}
