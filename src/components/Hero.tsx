import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { event } from '@/data/event';
import { SplitChars } from './SplitChars';
import { MagneticButton } from './MagneticButton';
import { Logo } from './Logo';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('[data-hero-eyebrow]', { y: 16, opacity: 0, duration: 0.8 })
        .from(
          '[data-hero-line] [data-split-char]',
          {
            yPercent: 130,
            rotateX: -75,
            opacity: 0,
            duration: 1.1,
            stagger: { each: 0.022, from: 'start' },
            ease: 'expo.out',
          },
          '-=0.5',
        )
        .from('[data-hero-lede]', { y: 24, opacity: 0, duration: 0.9 }, '-=0.6')
        .from('[data-hero-meta] > *', { y: 18, opacity: 0, stagger: 0.08, duration: 0.7 }, '-=0.5')
        .from('[data-hero-actions] > *', { y: 18, opacity: 0, stagger: 0.1, duration: 0.7 }, '-=0.5')
        .from('[data-hero-terminal]', { y: 32, opacity: 0, duration: 1 }, '-=0.9')
        .from('[data-hero-cue]', { y: -8, opacity: 0, duration: 0.6 }, '-=0.3');

      // Parallax + scroll exit
      gsap.to('[data-hero-grid]', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('[data-hero-content]', {
        yPercent: -10,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Terminal typing
      const lines = gsap.utils.toArray<HTMLElement>('[data-term-line]');
      const tlTerm = gsap.timeline({ delay: 1.6, repeat: -1, repeatDelay: 3 });
      lines.forEach((line) => {
        const full = line.dataset.text ?? '';
        tlTerm.to(line, {
          duration: Math.max(0.4, full.length * 0.025),
          text: { value: full },
          ease: 'none',
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-navy-900 noise"
    >
      <div data-hero-grid className="absolute inset-0 grid-bg grid-bg-fade" />
      <div className="absolute inset-0 pointer-events-none bg-aurora animate-shimmer" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[140px] animate-drift" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-500/10 blur-[160px] animate-drift" />

      <div className="absolute top-[80px] left-6 md:left-10 corner-label">
        // 41.0 N · 17.4 S — UPB COCHA
      </div>
      <div className="absolute top-[80px] right-6 md:right-10 corner-label">
        SYS // SCD·26 // {event.dateDisplay}
      </div>
      <div className="absolute bottom-6 left-6 md:left-10 corner-label">
        ▌RENDERING_HERO::00.00.001
      </div>
      <div className="absolute bottom-6 right-6 md:right-10 corner-label">
        BUILD · BREAK · DEPLOY
      </div>

      <div
        data-hero-content
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-[140px] pb-24 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center"
      >
        <div>
          <div data-hero-eyebrow className="inline-flex items-center gap-3 pill-cyan mb-8">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan-300 animate-pulse-live" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>
            AWS Student Community Day · Bolivia · 2026
          </div>

          <h1
            className="font-display font-medium text-display-1 text-white leading-[0.9]"
            style={{ perspective: '800px' }}
          >
            <span data-hero-line className="block overflow-hidden pb-2">
              <SplitChars text="Build the" />
            </span>
            <span data-hero-line className="block overflow-hidden pb-2">
              <SplitChars text="Cloud Generation." accent />
            </span>
          </h1>

          <p
            data-hero-lede
            className="mt-8 max-w-[56ch] text-ink-200 text-[17px] leading-[1.6]"
          >
            Un día. Cuatro tracks. Estudiantes, builders y comunidades convergen en{' '}
            <span className="text-white">UPB Cochabamba</span> para construir, romper y
            desplegar — del aula a la nube. Sin filtro, sin marketing, full hands-on.
          </p>

          <div
            data-hero-meta
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-2xl"
          >
            <Metric label="DATE" value={event.dateShort} sub={event.weekday} />
            <Metric label="VENUE" value={event.venue} sub="Campus Principal" />
            <Metric label="TRACKS" value="04" sub="hands-on" />
            <Metric
              label="BUILDERS"
              value={String(event.capacity)}
              sub={`${event.confirmed} confirmed`}
            />
          </div>

          <div data-hero-actions className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#register" variant="primary">
              Register — Free
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="#tracks" variant="ghost" strength={0.25}>
              View tracks
              <span aria-hidden>↓</span>
            </MagneticButton>
          </div>

          <div data-hero-actions className="mt-8 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <Logo size={28} />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/50">
              AWS Student Builder Group · UPB Cochabamba
            </span>
          </div>
        </div>

        <div data-hero-terminal className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/40 via-cyan-400/0 to-fuchsia-500/30 rounded-2xl blur-2xl opacity-50" />
          <div className="relative rounded-2xl border border-white/10 bg-navy-900/80 backdrop-blur-xl overflow-hidden shadow-glow-cyan">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/70" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40">
                scd-cli // session.zsh
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-cyan-300/70">
                ● live
              </span>
            </div>
            <div className="px-5 py-5 font-mono text-[13px] leading-[1.7] space-y-1.5">
              <Line user="builder@scd" host="cocha" cmd="register --student" />
              <p>
                <span data-term-line data-text="› verifying institution…" className="text-ink-300"></span>
              </p>
              <p>
                <span data-term-line data-text="› wristband issued: #SCD-0247" className="text-ink-300"></span>
              </p>
              <p>
                <span data-term-line data-text="› track preset: /cloud + /ai" className="text-ink-300"></span>
              </p>
              <p>
                <span data-term-line data-text="✓ welcome, builder." className="text-signal-live"></span>
              </p>
              <Line user="builder@scd" host="cocha" cmd="open --schedule" trailing />
            </div>
          </div>
        </div>
      </div>

      <a
        data-hero-cue
        href="#manifesto"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 hover:text-cyan-300 transition-colors"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-cyan-300 to-transparent animate-pulse" />
      </a>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="mono-label mb-2">{label}</div>
      <div className="font-display font-medium text-2xl text-white leading-none">{value}</div>
      <div className="font-mono text-[11px] text-white/40 mt-2">{sub}</div>
    </div>
  );
}

function Line({
  user,
  host,
  cmd,
  trailing,
}: {
  user: string;
  host: string;
  cmd: string;
  trailing?: boolean;
}) {
  return (
    <p className="flex items-center gap-2 flex-wrap">
      <span className="text-cyan-300">
        {user}
        <span className="text-white/30">@</span>
        {host}
      </span>
      <span className="text-white/30">~</span>
      <span className="text-white/40">$</span>
      <span className="text-white">{cmd}</span>
      {trailing && <span className="cursor-blink" />}
    </p>
  );
}
