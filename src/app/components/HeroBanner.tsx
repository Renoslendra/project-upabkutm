import bgDefault from './image/gerbangutm.jpg';

interface HeroBannerProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bgSrc?: string;
}

/**
 * Hero banner full-width — tampilan sama seperti halaman Artikel & Kegiatan:
 * tinggi, teks di tengah layar, chip eyebrow di atas, overlay gelap.
 */
export function HeroBanner({ eyebrow, title, subtitle, bgSrc }: HeroBannerProps) {
  const bg = bgSrc || bgDefault;

  return (
    <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden flex items-center justify-center -mt-16 md:-mt-20">
      {/* Background */}
      <div className="absolute inset-0">
        {bg && (
          <img
            src={bg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content — centered like Artikel & Kegiatan */}
      <div className="container-x relative z-10 max-w-3xl text-center flex flex-col items-center">
        <div className="inline-block px-3 py-1 mb-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20">
          {eyebrow}
        </div>
        <h1 className="hero-headline mb-6 text-white drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
