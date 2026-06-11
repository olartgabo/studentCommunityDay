import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { event } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

export function Sponsors() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-sp-reveal] > *', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-sp-reveal]', start: 'top 80%' },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sponsors" className="relative bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-400/8 blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="mono-label mb-6">// 05 — Sponsors &amp; Partners</div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div className="absolute top-6 left-6 corner-label">PARTNERSHIP :: OPEN</div>
          <div className="absolute top-6 right-6 corner-label text-cyan-300">→ /sponsor-deck</div>
          <div className="pointer-events-none absolute -bottom-24 -right-16 w-[420px] h-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div
            data-sp-reveal
            className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end p-8 md:p-14 pt-20 md:pt-24"
          >
            <div>
              <h2 className="font-display font-medium text-[clamp(36px,5vw,68px)] tracking-tightest text-white leading-[0.96]">
                Pon tu marca frente a la
                <br />
                <em className="not-italic text-cyan-300">próxima generación cloud.</em>
              </h2>
              <p className="mt-6 max-w-[52ch] text-ink-300 text-[15px] leading-[1.7]">
                {event.capacity} estudiantes de ingeniería y tecnología en un día —
                los futuros DevOps, cloud, IA y security engineers de Bolivia. Pipeline
                de talento, employer branding y networking real. Todos los paquetes,
                beneficios y precios están en el deck.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="/sponsor-deck" data-cursor="go" className="btn-primary">
                  Ver paquetes de patrocinio
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={`mailto:${event.contactEmail}?subject=Patrocinio%20SCD%C2%B726`}
                  className="btn-ghost"
                >
                  Hablar con el equipo
                </a>
              </div>
            </div>

            <ul className="space-y-3 lg:border-l lg:border-white/10 lg:pl-10">
              {[
                ['Pipeline de talento', 'Recluta junior & internships antes que nadie'],
                ['Visibilidad', 'Logo en web, stage y materiales del evento'],
                ['Networking', 'Stand y contacto cara a cara con builders'],
                ['Posicionamiento', 'Marca asociada a un evento avalado por AWS'],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 font-mono text-cyan-300 text-[12px]">✦</span>
                  <span>
                    <span className="block text-white text-[15px] leading-tight">{title}</span>
                    <span className="block text-ink-300 text-[13px] leading-snug mt-0.5">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
