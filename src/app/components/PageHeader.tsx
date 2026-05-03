import { Blobs } from './Blobs';

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--surface-sunken)' }}>
      <Blobs variant="header" />
      <div className="container-x relative z-10 py-20 md:py-28 max-w-3xl">
        <div className="eyebrow mb-4">{eyebrow}</div>
        <h1 className="hero-headline mb-5">{title}</h1>
        {subtitle && <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
    </section>
  );
}
