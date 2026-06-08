import logoUtm from './image/logoutm.png?url';
import logoUpabk from './image/logoupabk.png?url';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoUtm} alt="Logo UTM" className="w-9 h-9 object-contain shrink-0 drop-shadow-sm" />
      <img src={logoUpabk} alt="Logo UPA-BK" className="w-9 h-9 object-contain shrink-0 drop-shadow-sm" />
      <div className="flex flex-col leading-tight">
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: light ? 'white' : 'var(--primary-dark)', letterSpacing: '-0.01em' }}>
          UPA-BK <span style={{ color: light ? 'rgba(255,255,255,0.9)' : 'var(--primary)' }}>UTM</span>
        </span>
        <span style={{ fontSize: '0.6rem', color: light ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
          Universitas Trunojoyo Madura
        </span>
      </div>
    </div>
  );
}
