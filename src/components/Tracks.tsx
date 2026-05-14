import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tracks } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

export function Tracks() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-track-card]', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      });

      gsap.from('[data-tracks-head] > *', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-tracks-head]',
          start: 'top 80%',
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="tracks"
      className="relative py-32 md:py-44 bg-navy-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <header
          data-tracks-head
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="mono-label mb-4">// 02 — Tracks</div>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,72px)] tracking-tightest text-white leading-[0.95]">
              Cuatro tracks.
              <br />
              <em className="not-italic text-cyan-300">Un día.</em> Tu stack.
            </h2>
          </div>
          <p className="max-w-[40ch] text-ink-300 text-[15px] leading-[1.7]">
            Pickea tu track el día del evento. No hay pre-requisitos, solo curiosidad —
            y una laptop que no se muera en una hora.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-4">
          {tracks.map((t, i) => (
            <TrackCard key={t.id} track={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackCard({ track, index }: { track: (typeof tracks)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  return (
    <a
      ref={ref}
      data-track-card
      href="#register"
      onMouseMove={onMove}
      className="group relative p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-cyan-400/40"
      style={
        {
          backgroundImage:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(0,191,240,0.10), transparent 50%)',
        } as React.CSSProperties
      }
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="absolute top-6 right-6 corner-label">
        T{String(index + 1).padStart(2, '0')} / 04
      </div>

      <div className="relative flex items-start justify-between gap-6 mb-10">
        <div className="space-y-3">
          <div className="mono-label text-cyan-300/90">{track.code}</div>
          <h3 className="font-display font-medium text-3xl md:text-4xl text-white tracking-tightest leading-[1.05]">
            {track.title}
          </h3>
        </div>
        <div className="shrink-0 relative">
          <div className="h-16 w-16 rounded-xl border border-white/10 bg-navy-900 flex items-center justify-center font-mono text-cyan-300 text-[11px] tracking-widest group-hover:border-cyan-400/50 transition-colors">
            {track.id}
          </div>
        </div>
      </div>

      <p className="relative text-ink-200 text-[15px] leading-[1.65] mb-8 max-w-[44ch]">
        {track.blurb}
      </p>

      <div className="relative flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
        <div className="flex flex-wrap gap-2">
          {track.topics.map((topic) => (
            <span key={topic} className="pill">
              {topic}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-300 opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
          Pick track <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}
