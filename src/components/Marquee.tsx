import { marqueeWords } from '@/data/event';

export function Marquee() {
  const repeated = [...marqueeWords, ...marqueeWords];
  return (
    <section
      aria-hidden
      className="relative py-8 border-y border-white/5 bg-navy-950 overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee gap-12 will-change-transform">
        {repeated.map((word, i) => (
          <span
            key={i}
            className="font-display text-[clamp(28px,4vw,56px)] font-medium tracking-tight text-white/90 flex items-center gap-12"
          >
            {word}
            <span className="text-cyan-300 text-2xl">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
