import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tracks } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

export function Tracks() {
  const root = useRef<HTMLElement | null>(null);
  const trackRowRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Section heading reveal
      gsap.from('[data-tracks-head] > *', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-tracks-head]', start: 'top 80%' },
      });

      // Horizontal scroll-jacked panel (md+ only)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        const row = trackRowRef.current;
        const wrap = pinWrapRef.current;
        if (!row || !wrap) return;

        const distance = () => row.scrollWidth - window.innerWidth;

        const tween = gsap.to(row, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Progress dots + counter
        gsap.utils.toArray<HTMLElement>('[data-track-card]').forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: tween,
            start: 'left center',
            end: 'right center',
            onToggle: ({ isActive }) => {
              if (isActive) {
                document.querySelectorAll('[data-track-dot]').forEach((dot, j) => {
                  dot.classList.toggle('is-active', j === i);
                });
                const counter = document.querySelector('[data-track-counter]');
                if (counter) counter.textContent = String(i + 1).padStart(2, '0');
              }
            },
          });
        });

        return () => {
          tween.kill();
        };
      });

      // Mobile: stagger reveal
      mm.add('(max-width: 899px)', () => {
        gsap.from('[data-track-card]', {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-tracks-mobile]', start: 'top 75%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="tracks"
      className="relative bg-navy-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-12">
        <header
          data-tracks-head
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
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
      </div>

      {/* Desktop: pinned horizontal panel */}
      <div
        ref={pinWrapRef}
        data-cursor="drag"
        className="hidden min-[900px]:block relative h-[100svh] overflow-hidden"
      >
        <div className="absolute top-8 left-10 corner-label flex items-center gap-3">
          <span>HORIZONTAL_SCAN //</span>
          <span data-track-counter className="text-cyan-300">01</span>
          <span className="text-white/30">/ 04</span>
        </div>
        <div className="absolute top-8 right-10 corner-label">
          SCROLL_LOCK :: ACTIVE
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {tracks.map((_, i) => (
            <span
              key={i}
              data-track-dot
              className={`h-1.5 transition-all duration-500 rounded-full ${
                i === 0 ? 'is-active w-10 bg-cyan-300' : 'w-3 bg-white/15'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-10 right-10 corner-label flex items-center gap-2 text-white/40">
          <span>↓ scroll →</span>
        </div>

        <div className="h-full flex items-center">
          <div
            ref={trackRowRef}
            className="flex items-stretch gap-6 pl-[8vw] pr-[8vw] will-change-transform"
          >
            {tracks.map((t, i) => (
              <TrackCard key={t.id} track={t} index={i} />
            ))}
            <EndCard />
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div
        data-tracks-mobile
        className="min-[900px]:hidden max-w-[1400px] mx-auto px-6 grid gap-4 pb-24"
      >
        {tracks.map((t, i) => (
          <TrackCard key={t.id} track={t} index={i} compact />
        ))}
      </div>

      <style>{`[data-track-dot].is-active { width: 2.5rem; background-color: #38d6ff; }`}</style>
    </section>
  );
}

function TrackCard({
  track,
  index,
  compact = false,
}: {
  track: (typeof tracks)[number];
  index: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  };

  return (
    <a
      ref={ref}
      data-track-card
      data-cursor="pick"
      href="#register"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative shrink-0 ${
        compact ? 'w-full' : 'w-[clamp(360px,40vw,560px)] h-[72vh]'
      } rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors duration-500 hover:border-cyan-400/50`}
      style={
        {
          backgroundImage:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(0,191,240,0.10), transparent 50%)',
          transform: `perspective(1200px) rotateX(var(--rx,0)) rotateY(var(--ry,0))`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.5s',
        } as React.CSSProperties
      }
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="absolute top-6 right-6 corner-label">
        T{String(index + 1).padStart(2, '0')} / 04
      </div>

      <div
        className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-cyan-300/0 via-cyan-300 to-cyan-300/0 opacity-0 group-hover:opacity-60 transition-opacity duration-700"
        aria-hidden
      />

      <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
        <div>
          <div className="flex items-start justify-between mb-10">
            <div className="space-y-3">
              <div className="mono-label text-cyan-300/90">{track.code}</div>
              <h3 className="font-display font-medium text-[clamp(32px,3.6vw,52px)] text-white tracking-tightest leading-[1.02]">
                {track.title}
              </h3>
            </div>
            <div className="shrink-0">
              <div className="h-16 w-16 rounded-xl border border-white/10 bg-navy-900 flex items-center justify-center font-mono text-cyan-300 text-[11px] tracking-widest group-hover:border-cyan-400/50 transition-colors">
                {track.id}
              </div>
            </div>
          </div>

          <p className="text-ink-200 text-[15px] leading-[1.65] max-w-[44ch]">
            {track.blurb}
          </p>
        </div>

        <div className="pt-8 mt-8 border-t border-white/5 space-y-5">
          <div className="flex flex-wrap gap-2">
            {track.topics.map((topic) => (
              <span key={topic} className="pill">
                {topic}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
            Pick track <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

function EndCard() {
  return (
    <a
      href="#register"
      className="group relative shrink-0 w-[clamp(280px,28vw,420px)] h-[72vh] rounded-2xl border border-dashed border-cyan-400/40 bg-cyan-400/[0.02] overflow-hidden flex flex-col items-center justify-center text-center p-10 transition-all hover:bg-cyan-400/5"
    >
      <div className="absolute top-6 left-6 corner-label text-cyan-300">END_OF_TRACKS</div>
      <div className="absolute top-6 right-6 corner-label text-cyan-300">→</div>

      <div className="mono-label text-cyan-300/80 mb-6">Listo para registrarte?</div>
      <h3 className="font-display font-medium text-4xl text-white tracking-tightest leading-[1.05] mb-8">
        Picka tu track
        <br />
        <em className="not-italic text-cyan-300">el día.</em>
      </h3>

      <span className="btn-primary">
        Register — Free
        <span aria-hidden className="group-hover:translate-x-1 transition-transform">→</span>
      </span>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 corner-label text-white/30">
        Inscripción gratuita
      </div>
    </a>
  );
}
