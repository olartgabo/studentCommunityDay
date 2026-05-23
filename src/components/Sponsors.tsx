import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sponsorTiers, event } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

const accentStyles = {
  cyan: {
    card: 'border-cyan-400/40 bg-gradient-to-b from-cyan-400/10 to-navy-900/60 shadow-glow-cyan',
    label: 'text-cyan-300',
    line: 'bg-cyan-300',
    check: 'text-cyan-300',
    badge: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/30',
  },
  white: {
    card: 'border-white/20 bg-gradient-to-b from-white/5 to-navy-900/60',
    label: 'text-white',
    line: 'bg-white/60',
    check: 'text-white/70',
    badge: 'bg-white/10 text-white/80 border-white/20',
  },
  amber: {
    card: 'border-amber-400/30 bg-gradient-to-b from-amber-400/8 to-navy-900/60',
    label: 'text-amber-300',
    line: 'bg-amber-400',
    check: 'text-amber-300',
    badge: 'bg-amber-400/10 text-amber-200 border-amber-400/20',
  },
  neutral: {
    card: 'border-white/10 bg-white/[0.02]',
    label: 'text-white/50',
    line: 'bg-white/20',
    check: 'text-white/40',
    badge: 'bg-white/5 text-white/40 border-white/10',
  },
} as const;

export function Sponsors() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-tier-card]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-tiers-grid]',
          start: 'top 90%',
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="sponsors"
      className="relative py-24 md:py-36 bg-navy-950 overflow-hidden noise"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cyan-400/8 blur-[160px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-6">
          <div className="mono-label mb-4">// 05 — Sponsors &amp; Partners</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-medium text-[clamp(40px,7vw,96px)] tracking-tightest text-white leading-[0.9]">
              Construye con<br />
              <em className="not-italic text-cyan-300 glow-text">nosotros.</em>
            </h2>
            <p className="max-w-[44ch] text-ink-300 text-[15px] leading-[1.7] md:text-right">
              {event.capacity} estudiantes y builders en un solo día.
              Si tu empresa apuesta por la próxima generación cloud,
              este es el lugar.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-16 p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
          {[
            { value: String(event.capacity), label: 'Asistentes esperados' },
            { value: '4',                    label: 'Tracks técnicos' },
            { value: 'Cbba · BOL',           label: 'Ubicación' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-medium text-2xl md:text-4xl text-white tabular-nums">{s.value}</div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/35 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tier cards */}
        <div
          data-tiers-grid
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-16"
        >
          {sponsorTiers.map((tier) => {
            const styles = accentStyles[tier.accent];
            return (
              <div
                key={tier.id}
                data-tier-card
                className={`relative flex flex-col rounded-2xl border backdrop-blur-sm overflow-hidden ${styles.card} ${tier.featured ? 'md:col-span-2 xl:col-span-1' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
                )}

                <div className="p-7 flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-1 ${styles.label}`}>
                        {tier.name}
                      </div>
                      <p className="font-display font-medium text-xl text-white leading-tight">
                        {tier.tagline}
                      </p>
                    </div>
                    <span className={`shrink-0 ml-3 px-2.5 py-1 rounded-lg border text-[10px] font-mono tracking-wider ${styles.badge}`}>
                      {tier.id.toUpperCase()}
                    </span>
                  </div>

                  <div className={`h-px mb-6 ${styles.line} opacity-20`} />

                  <ul className="space-y-3">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-[13px] text-ink-300 leading-[1.5]">
                        <span className={`shrink-0 mt-0.5 ${styles.check}`}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-7 pb-7">
                  <a
                    href={`mailto:hi@scd-bolivia.dev?subject=Sponsorship%20${tier.name}%20SCD%C2%B726`}
                    className={`group flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-300 font-mono text-[11px] tracking-[0.12em] uppercase
                      ${tier.featured
                        ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20'
                        : 'border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
                      }`}
                  >
                    <span>Quiero ser {tier.name}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border border-white/8 bg-white/[0.015]">
          <div>
            <div className="mono-label mb-1 text-white/30">¿Alguna pregunta?</div>
            <p className="font-display font-medium text-lg text-white">
              Hablemos antes del evento.
            </p>
          </div>
          <a
            href="mailto:hi@scd-bolivia.dev?subject=Sponsorship%20SCD%C2%B726"
            className="group inline-flex items-center gap-3 btn-primary shrink-0"
          >
            Contactar al equipo
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
