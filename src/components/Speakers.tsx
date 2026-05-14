import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakers, sponsors } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

const trackTint: Record<string, string> = {
  devops: 'from-fuchsia-500/40 to-navy-800',
  cloud: 'from-cyan-400/40 to-navy-800',
  ai: 'from-emerald-400/40 to-navy-800',
  security: 'from-amber-400/40 to-navy-800',
};

export function Speakers() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-speaker]', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-speakers-grid]',
          start: 'top 80%',
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="speakers"
      className="relative py-32 md:py-44 bg-navy-950 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="mono-label mb-4">// 04 — Speakers</div>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,72px)] tracking-tightest text-white leading-[0.95]">
              Quienes <em className="not-italic text-cyan-300">construyen</em>.
            </h2>
          </div>
          <p className="max-w-[40ch] text-ink-300 text-[15px] leading-[1.7]">
            Builders activos. AWS Community Builders, fundadores y senior engs que
            envían a producción la semana que viene.
          </p>
        </header>

        <div data-speakers-grid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {speakers.map((s, i) => (
            <article
              key={s.id}
              data-speaker
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-cyan-400/40 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${trackTint[s.track]} transition-transform duration-700 group-hover:scale-110`}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 14px)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-medium text-[clamp(64px,8vw,120px)] text-white/85 tracking-tightest leading-none">
                    {s.initials}
                  </span>
                </div>
                <div className="absolute top-4 left-4 corner-label">
                  {String(i + 1).padStart(2, '0')} / 04
                </div>
                <div className="absolute bottom-4 right-4 corner-label">{s.city}</div>
              </div>

              <div className="p-6 space-y-3 border-t border-white/5">
                <h3 className="font-display font-medium text-xl text-white tracking-tight leading-tight">
                  {s.name}
                </h3>
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan-300/80">
                  {s.role}
                </div>
                <p className="text-ink-300 text-[13px] leading-[1.55] pt-2 border-t border-white/5">
                  {s.talk}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Sponsors strip */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="mono-label">// Sponsors & partners</div>
            <span className="font-mono text-[11px] text-white/30">
              Powered by community
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {sponsors.map((sp) => (
              <div
                key={sp.name}
                className={`h-20 rounded-xl border flex items-center justify-center font-display font-medium text-sm tracking-tight transition-colors ${
                  sp.tier === 'host'
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-100'
                    : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-cyan-400/30 hover:text-white'
                }`}
              >
                {sp.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
