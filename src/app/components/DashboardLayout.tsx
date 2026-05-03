import { useState, ReactNode } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Bell, Menu, X, Search, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

export interface NavItem {
  to: string;
  label: string;
  Icon: any;
}

export function DashboardLayout({
  items, title, subtitle, role = 'Mahasiswa', name = 'Aulia Rahma',
  children,
}: {
  items: NavItem[]; title: string; subtitle?: string; role?: string; name?: string; children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      <aside className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 w-[260px] z-40 flex flex-col border-r transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: 'white', borderColor: 'var(--border)', height: '100vh' }}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <button className="lg:hidden btn-ghost p-2" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {items.map((i) => {
            const active = pathname === i.to;
            return (
              <NavLink key={i.to} to={i.to} end onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: active ? 'var(--surface-hover)' : 'transparent',
                  color: active ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 500,
                }}>
                <i.Icon size={17} />
                {i.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 m-4 rounded-2xl" style={{ background: 'var(--primary-gradient)', color: 'white' }}>
          <div className="text-sm" style={{ fontWeight: 600 }}>Butuh bantuan?</div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>Tim UPA-BK siap mendengarkan.</div>
          <Link to="/booking" className="block mt-3 text-center py-2 rounded-full text-xs" style={{ background: 'white', color: 'var(--primary-dark)', fontWeight: 500 }}>Konseling</Link>
        </div>
      </aside>
      {open && <div className="lg:hidden fixed inset-0 bg-[rgba(45,27,51,0.4)] z-30" onClick={() => setOpen(false)} />}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 glass-nav">
          <div className="flex items-center justify-between px-6 lg:px-10 h-16 lg:h-20 gap-4">
            <button className="lg:hidden btn-ghost p-2" onClick={() => setOpen(true)}><Menu size={20} /></button>
            <div className="hidden md:block flex-1 max-w-md relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
              <input className="input-field pl-10 py-2" placeholder="Cari…" />
            </div>
            <div className="flex items-center gap-3 ml-auto">

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: 'var(--primary-gradient)', color: 'white', fontWeight: 600 }}>
                  {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm" style={{ fontWeight: 500 }}>{name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{role}</div>
                </div>
                <ChevronDown size={14} style={{ color: 'var(--text-tertiary)' }} className="hidden sm:block" />
              </div>
            </div>
          </div>
        </header>
        <div className="px-6 lg:px-10 py-8 lg:py-10">
          <div className="mb-8">
            <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>{title}</h1>
            {subtitle && <p className="mt-1">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
