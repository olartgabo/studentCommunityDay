import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { schedule } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

const trackColor: Record<string, string> = {
  keynote: 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
  cloud: 'text-cyan-200 border-cyan-300/30 bg-cyan-300/10',
  ai: 'text-emerald-300 border-emerald-300/30 bg-emerald-300/10',
  security: 'text-amber-300 border-amber-300/30 bg-amber-300/10',
  open: 'text-white/60 border-white/10 bg-white/5',
};

export function Schedule() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-sched-row]', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-sched-list]',
          start: 'top 75%',
        },
      });

      gsap.to('[data-sched-line]', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-sched-list]',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="schedule"
      className="relative py-32 md:py-44 bg-navy-900 overflow-hidden"
    >
      <div className="absolute inset-0 dot-field opacity-30" />

      <div
        data-scroll-skew
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="mono-label mb-4">// 03 — Schedule</div>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,72px)] tracking-tightest text-white leading-[0.95]">
              Sábado <em className="not-italic text-cyan-300">17.10</em>
              <br />
              09 → 18.
            </h2>
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50 space-y-1">
            <div>UPB · Campus Principal</div>
            <div className="text-cyan-300">7 sesiones · 9 horas</div>
          </div>
        </header>

        <ol data-sched-list className="relative pl-10 md:pl-16">
          <div className="absolute left-3 md:left-6 top-2 bottom-2 w-px bg-white/10" />
          <div
            data-sched-line
            className="absolute left-3 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-300 via-cyan-400 to-transparent origin-top scale-y-0"
          />

          {schedule.map((item, i) => (
            <li
              key={i}
              data-sched-row
              className="relative grid md:grid-cols-[140px_1fr_180px] gap-4 md:gap-8 py-7 border-b border-white/5 group"
            >
              <span className="absolute -left-[34px] md:-left-[51px] top-9 h-3 w-3 rounded-full border-2 border-cyan-300 bg-navy-900 group-hover:bg-cyan-300 transition-colors" />

              <div>
                <div className="font-display font-medium text-3xl text-white tabular-nums leading-none">
                  {item.time}
                </div>
                <div className="mono-label mt-2 text-white/40">{item.length}</div>
              </div>

              <div>
                <h3 className="font-display font-medium text-xl text-white tracking-tight">
                  {item.title}
                </h3>
                <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/40 mt-1">
                  <span className="text-cyan-300/80">{item.venue}</span>
                </div>
              </div>

              <div className="md:text-right">
                <span
                  className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-1 rounded-full border ${
                    trackColor[item.track]
                  }`}
                >
                  {item.track}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
