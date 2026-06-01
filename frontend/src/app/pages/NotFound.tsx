import { Link } from 'react-router';
import { Blobs } from '../components/Blobs';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      <Blobs variant="hero" />
      <div className="container-x relative z-10 text-center max-w-md mx-auto py-20">
        <div className="gradient-text" style={{ fontWeight: 700, fontSize: 'clamp(5rem,12vw,9rem)', lineHeight: 1, letterSpacing: '-0.04em' }}>404</div>
        <h1 className="hero-headline mt-2 mb-4" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)' }}>Halaman tidak ditemukan</h1>
        <p className="mb-6">Sepertinya halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
        <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
      </div>
    </section>
  );
}
