import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/asesmen', label: 'Asesmen' },
  { 
    label: 'Tentang', 
    to: '/tentang',
    children: [
      { to: '/tentang', label: 'Profil UPA BK' },
      { to: '/kegiatan', label: 'Kegiatan & Workshop' },
    ]
  },
  { to: '/artikel', label: 'Artikel' },
  { 
    label: 'Bantuan', 
    to: '/bantuan',
    children: [
      { to: '/bantuan/alur', label: 'Alur Layanan' },
      { to: '/bantuan/faq', label: 'FAQ' },
      { to: '/bantuan/chatbot', label: 'Chatbot' },
    ]
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/"><Logo /></Link>
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((i) => (
            i.children ? (
              <div key={i.label} className="relative group">
                <button className="px-4 py-2 rounded-full text-sm font-medium text-[var(--text-primary)] hover:text-[var(--primary)] flex items-center gap-1 transition-colors">
                  {i.label} 
                  <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-2xl border border-[var(--border)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top">
                  {i.children.map(child => (
                    <Link 
                      key={child.label} 
                      to={child.to} 
                      className="block px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)] rounded-xl transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={i.to}
                to={i.to!}
                end={i.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'text-[var(--primary)] bg-[var(--surface-hover)]' : 'text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--surface-hover)]'}`
                }
              >
                {i.label}
              </NavLink>
            )
          ))}
        </nav>
      <div className="hidden md:flex items-center gap-2">
          <Link to="/booking" className="btn-primary text-sm">Mulai Konseling</Link>
        </div>
        <button className="lg:hidden btn-ghost p-2" onClick={() => setOpen(true)} aria-label="Menu">
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[rgba(45,27,51,0.4)] backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Logo />
              <button className="btn-ghost p-2" onClick={() => setOpen(false)}><X size={20} /></button>
            </div>
            <nav className="flex flex-col gap-1 mt-2 overflow-y-auto pb-4">
              {navItems.map((i) => (
                i.children ? (
                  <div key={i.label} className="flex flex-col">
                    <div className="px-4 py-3 text-[var(--text-primary)] font-semibold flex items-center justify-between">
                      {i.label}
                    </div>
                    <div className="flex flex-col pl-4 mb-2">
                      {i.children.map(child => (
                        <Link 
                          key={child.label} 
                          to={child.to} 
                          onClick={() => setOpen(false)}
                          className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--surface-hover)] rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={i.to}
                    to={i.to!}
                    end={i.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-[var(--surface-hover)] text-[var(--primary)]' : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]'}`
                    }
                  >
                    {i.label}
                  </NavLink>
                )
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2">
              <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary">Mulai Konseling</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
