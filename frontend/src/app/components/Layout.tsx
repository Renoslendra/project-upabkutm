import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

import bgMental1 from './image/bg-mental-1.png';
import bgMental2 from './image/bg-mental-2.png';
import bgMental3 from './image/bg-mental-3.png';

const backgroundImages = [bgMental1, bgMental2, bgMental3];

export function Layout() {
  const { pathname } = useLocation();
  const [bgIndex, setBgIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Parallax Effect for Background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dashboardRoutes = ['/admin'];
  const authRoutes = ['/admin-rahasia'];
  const isDash = dashboardRoutes.some((p) => pathname.startsWith(p));
  const isAuth = authRoutes.includes(pathname);
  // Beranda punya hero slideshow fullbleed sendiri, jadi background generic
  // tidak ditampilkan supaya tidak bentrok.
  const isBeranda = pathname === '/';

  if (isDash || isAuth) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background slideshow mental-health di semua halaman publik termasuk Beranda */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-10]">
        <div
          className="absolute inset-[-5%] w-[110%] h-[110%] transition-transform duration-200 ease-out"
          style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
        >
          {backgroundImages.map((bg, idx) => (
            <img
              key={idx}
              src={bg}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${idx === bgIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          {/* Overlay putih supaya konten tetap terbaca */}
          <div className="absolute inset-0 bg-white/85" />
        </div>
      </div>

      <Navbar />
      <main className="flex-1 relative z-0"><Outlet /></main>
      <Footer />
    </div>
  );
}
