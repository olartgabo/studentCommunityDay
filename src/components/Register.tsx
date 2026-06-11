import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { event } from '@/data/event';
import { Logo } from './Logo';

gsap.registerPlugin(ScrollTrigger);

export function Register() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-cta-word]', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="register"
      className="relative py-32 md:py-44 bg-navy-900 overflow-hidden noise"
    >
      <div className="absolute inset-0 bg-aurora opacity-80 animate-shimmer" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" />
      <div className="absolute -top-20 right-1/3 w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-[140px] animate-drift" />
      <Logo size={380} aria-hidden className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none select-none" />

      <div
        data-scroll-skew
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div className="text-center mb-16">
          <div className="mono-label mb-6">// 06 — Register</div>
          <h2 className="font-display font-medium text-[clamp(56px,11vw,180px)] tracking-tightest text-white leading-[0.9]">
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-cta-word className="inline-block">
                Get your
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-cta-word className="inline-block">
                <em className="not-italic text-cyan-300 glow-text">wristband.</em>
              </span>
            </span>
          </h2>
          <p className="mt-8 max-w-[52ch] mx-auto text-ink-200 text-[17px] leading-[1.65]">
            Entrada gratuita y abierta para estudiantes. Trae laptop, ID universitaria,
            y curiosidad. Sin etapas, sin filtros — primero llega, primero entra.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
          {/* Luma registration widget */}
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 bg-navy-950/60 backdrop-blur-xl shadow-glow-cyan">
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="corner-label !static">REGISTER.FORM</div>
              <div className="corner-label !static text-cyan-300">● POWERED BY LUMA</div>
            </div>
            <iframe
              src={event.lumaEmbedUrl}
              title="Registro — AWS Student Community Day Bolivia 2026"
              className="w-full rounded-xl border border-white/10 bg-white"
              style={{ minHeight: 450 }}
              height={450}
              frameBorder={0}
              allow="fullscreen; payment"
              aria-label="Formulario de registro del evento en Luma"
            />
            <p className="mt-5 px-1 font-mono text-[11px] text-white/40">
              ¿No carga el registro?{' '}
              <a
                href={event.lumaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                Ábrelo en Luma →
              </a>
            </p>
          </div>

          <aside className="space-y-4">
            <InfoCard label="Cuándo">
              <div className="font-display text-2xl text-white leading-tight">
                {event.weekday} {event.dateDisplay}
              </div>
              <div className="font-mono text-[11px] text-white/40 mt-1">09:00 — 19:00</div>
            </InfoCard>
            <InfoCard label="Dónde">
              <div className="font-display text-xl text-white leading-tight">{event.venue}</div>
              <div className="font-mono text-[11px] text-white/40 mt-1">{event.address}</div>
            </InfoCard>
            <InfoCard label="Qué traer">
              <ul className="space-y-1.5 mt-1">
                {['Laptop cargada', 'ID universitaria', 'Curiosidad'].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-[14px] text-ink-200">
                    <span className="text-cyan-300 font-mono">✓</span> {i}
                  </li>
                ))}
              </ul>
            </InfoCard>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="mono-label mb-3">Contact</div>
              <a
                href={`mailto:${event.contactEmail}`}
                className="block font-display text-lg text-white hover:text-cyan-300 transition-colors"
              >
                {event.contactEmail}
              </a>
              <div className="font-mono text-[11px] text-white/40 mt-2">
                {event.socialHandle}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="mono-label mb-3">{label}</div>
      {children}
    </div>
  );
}
