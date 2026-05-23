import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sponsorTiers, event } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

type Accent = 'cyan' | 'white' | 'amber' | 'neutral';

const accentMap: Record<
  Accent,
  { glow: string; gradient: string; strip: string; text: string; check: string; border: string }
> = {
  cyan: {
    glow:     'rgba(0,191,240,0.13)',
    gradient: 'from-cyan-400/30 to-cyan-400/5',
    strip:    'via-cyan-300',
    text:     'text-cyan-300',
    check:    'text-cyan-300',
    border:   'hover:border-cyan-400/60',
  },
  white: {
    glow:     'rgba(180,180,230,0.10)',
    gradient: 'from-violet-400/20 to-violet-400/5',
    strip:    'via-violet-300',
    text:     'text-violet-300',
    check:    'text-violet-300',
    border:   'hover:border-violet-400/50',
  },
  amber: {
    glow:     'rgba(251,191,36,0.11)',
    gradient: 'from-amber-400/25 to-amber-400/5',
    strip:    'via-amber-300',
    text:     'text-amber-300',
    check:    'text-amber-300',
    border:   'hover:border-amber-400/50',
  },
  neutral: {
    glow:     'rgba(255,255,255,0.06)',
    gradient: 'from-white/10 to-white/3',
    strip:    'via-white/40',
    text:     'text-white/50',
    check:    'text-white/35',
    border:   'hover:border-white/25',
  },
};

export function Sponsors() {
  const root      = useRef<HTMLElement | null>(null);
  const rowRef    = useRef<HTMLDivElement | null>(null);
  const pinRef    = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-sponsors-head] > *', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-sponsors-head]', start: 'top 80%' },
      });

      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        const row  = rowRef.current;
        const wrap = pinRef.current;
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

        gsap.utils.toArray<HTMLElement>('[data-sp-card]').forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: tween,
            start: 'left center',
            end: 'right center',
            onToggle: ({ isActive }) => {
              if (isActive) {
                document.querySelectorAll('[data-sp-dot]').forEach((dot, j) => {
                  dot.classList.toggle('is-active', j === i);
                });
                const counter = document.querySelector('[data-sp-counter]');
                if (counter) counter.textContent = String(i + 1).padStart(2, '0');
              }
            },
          });
        });

        return () => tween.kill();
      });

      mm.add('(max-width: 899px)', () => {
        gsap.from('[data-sp-card]', {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-sp-mobile]', start: 'top 80%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sponsors" className="relative bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-400/8 blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-12">
        <header data-sponsors-head className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="mono-label mb-4">// 05 — Sponsors &amp; Partners</div>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,72px)] tracking-tightest text-white leading-[0.95]">
              Construye con{' '}
              <em className="not-italic text-cyan-300">nosotros.</em>
            </h2>
          </div>
          <p className="max-w-[40ch] text-ink-300 text-[15px] leading-[1.7]">
            {event.capacity} builders en un día. Si tu empresa apuesta por la
            próxima generación cloud, este es el lugar.
          </p>
        </header>
      </div>

      {/* Desktop: pinned horizontal */}
      <div
        ref={pinRef}
        data-cursor="drag"
        className="hidden min-[900px]:block relative h-[100svh] overflow-hidden"
      >
        <div className="absolute top-8 left-10 corner-label flex items-center gap-3">
          <span>TIER_SCAN //</span>
          <span data-sp-counter className="text-cyan-300">01</span>
          <span className="text-white/30">/ {sponsorTiers.length}</span>
        </div>
        <div className="absolute top-8 right-10 corner-label">
          PARTNERSHIP :: OPEN
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {sponsorTiers.map((_, i) => (
            <span
              key={i}
              data-sp-dot
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
            ref={rowRef}
            className="flex items-stretch gap-6 pl-[8vw] pr-[8vw] will-change-transform"
          >
            {sponsorTiers.map((tier, i) => (
              <SponsorCard key={tier.id} tier={tier} index={i} total={sponsorTiers.length} />
            ))}
            <SponsorEndCard />
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div
        data-sp-mobile
        className="min-[900px]:hidden max-w-[1400px] mx-auto px-6 grid gap-4 pb-24"
      >
        {sponsorTiers.map((tier, i) => (
          <SponsorCard key={tier.id} tier={tier} index={i} total={sponsorTiers.length} compact />
        ))}
      </div>

      <style>{`[data-sp-dot].is-active { width: 2.5rem; background-color: #38d6ff; }`}</style>
    </section>
  );
}

function SponsorCard({
  tier,
  index,
  total,
  compact = false,
}: {
  tier: (typeof sponsorTiers)[number];
  index: number;
  total: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const a   = accentMap[tier.accent as Accent];

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x  = ((e.clientX - rect.left)  / rect.width)  * 100;
    const y  = ((e.clientY - rect.top)   / rect.height) * 100;
    const rx = ((e.clientY - rect.top)   / rect.height - 0.5) * -5;
    const ry = ((e.clientX - rect.left)  / rect.width  - 0.5) *  5;
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
      data-sp-card
      data-cursor="pick"
      href={`mailto:hi@scd-bolivia.dev?subject=Sponsorship%20${tier.name}%20SCD%C2%B726`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative shrink-0 ${
        compact ? 'w-full' : 'w-[clamp(360px,38vw,520px)] h-[72vh]'
      } rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors duration-500 ${a.border}`}
      style={{
        backgroundImage: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${a.glow}, transparent 55%)`,
        transform: 'perspective(1200px) rotateX(var(--rx,0)) rotateY(var(--ry,0))',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.5s',
      } as React.CSSProperties}
    >
      {/* Color gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Left edge glow strip */}
      <div
        className={`absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent ${a.strip} to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700`}
        aria-hidden
      />

      {/* Corner labels */}
      <div className="absolute top-6 right-6 corner-label">
        SP{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      {tier.featured && (
        <div className="absolute top-6 left-6 corner-label text-cyan-300">★ FEATURED</div>
      )}

      <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
        <div>
          <div className={`flex items-start justify-between mb-8 ${tier.featured ? 'mt-6' : ''}`}>
            <div className="space-y-2">
              <div className={`mono-label ${a.text}`}>{tier.id.toUpperCase()}</div>
              <h3 className="font-display font-medium text-[clamp(28px,3.2vw,46px)] text-white tracking-tightest leading-[1.02]">
                {tier.name}
              </h3>
              <p className={`font-mono text-[12px] tracking-[0.1em] ${a.text} opacity-70`}>
                {tier.tagline}
              </p>
            </div>
            <div className={`shrink-0 h-14 w-14 rounded-xl border border-white/10 bg-navy-900 flex items-center justify-center font-mono text-[10px] tracking-widest group-hover:border-current transition-colors ${a.text}`}>
              {tier.id.slice(0, 2).toUpperCase()}
            </div>
          </div>

          <ul className="space-y-2.5">
            {tier.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[13px] text-ink-300 leading-[1.5]">
                <span className={`shrink-0 mt-0.5 font-mono ${a.check}`}>✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 mt-6 border-t border-white/5">
          <span className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 ${a.text}`}>
            Quiero ser {tier.name} <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

function SponsorEndCard() {
  return (
    <a
      href="mailto:hi@scd-bolivia.dev?subject=Sponsorship%20SCD%C2%B726"
      data-cursor="go"
      className="group relative shrink-0 w-[clamp(260px,26vw,380px)] h-[72vh] rounded-2xl border border-dashed border-cyan-400/40 bg-cyan-400/[0.02] overflow-hidden flex flex-col items-center justify-center text-center p-10 transition-all hover:bg-cyan-400/5"
    >
      <div className="absolute top-6 left-6 corner-label text-cyan-300">OPEN_PARTNERSHIP</div>
      <div className="absolute top-6 right-6 corner-label text-cyan-300">→</div>

      <div className="mono-label text-cyan-300/80 mb-6">¿Tu empresa aquí?</div>
      <h3 className="font-display font-medium text-4xl text-white tracking-tightest leading-[1.05] mb-8">
        Sé parte
        <br />
        <em className="not-italic text-cyan-300">del stack.</em>
      </h3>

      <span className="btn-primary">
        Contactar equipo
        <span aria-hidden className="group-hover:translate-x-1 transition-transform">→</span>
      </span>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 corner-label text-white/30">
        hi@scd-bolivia.dev
      </div>
    </a>
  );
}
