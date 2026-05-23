import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { event, venueDetails } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

export function Venue() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-venue-in]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="venue"
      className="relative py-24 md:py-36 bg-navy-900 overflow-hidden noise"
    >
      <div className="absolute inset-0 bg-aurora opacity-40 animate-shimmer" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-fuchsia-500/10 blur-[160px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div data-venue-in className="mono-label mb-4">
          // 06 — Venue
        </div>
        <h2
          data-venue-in
          className="font-display font-medium text-[clamp(40px,7vw,96px)] tracking-tightest text-white leading-[0.9] mb-16"
        >
          Nos vemos en la{' '}
          <em className="not-italic text-cyan-300 glow-text">UPB.</em>
        </h2>

        <div className="grid lg:grid-cols-[1fr_480px] gap-6">
          <div
            data-venue-in
            className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-navy-950/60 backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute top-6 left-6 corner-label">LOCATION // {venueDetails.lat}N · {venueDetails.lng}W</div>
            <div className="absolute top-6 right-6 corner-label text-cyan-300">● CONFIRMED</div>

            <div className="mt-8 space-y-6">
              <div>
                <div className="mono-label mb-2 text-white/40">Universidad</div>
                <p className="font-display font-medium text-2xl text-white leading-tight">
                  {venueDetails.fullName}
                </p>
              </div>
              <div>
                <div className="mono-label mb-2 text-white/40">Dirección</div>
                <p className="font-mono text-[15px] text-white/80">{venueDetails.address}</p>
              </div>
              <div>
                <div className="mono-label mb-2 text-white/40">Fecha</div>
                <p className="font-display font-medium text-xl text-white">
                  {event.weekday} · {event.dateLong}
                </p>
              </div>
              <div>
                <div className="mono-label mb-2 text-white/40">Horario</div>
                <p className="font-mono text-[15px] text-white/80">08:30 — Check-in &nbsp;·&nbsp; 09:00 — Keynote &nbsp;·&nbsp; 18:00 — Cierre</p>
              </div>
            </div>

            <a
              href={venueDetails.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 btn-primary"
            >
              Ver en Google Maps
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div data-venue-in className="space-y-4">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="mono-label mb-3">Cómo llegar</div>
              <ul className="space-y-3 font-mono text-[13px] text-white/60 leading-[1.6]">
                <li className="flex gap-3">
                  <span className="text-cyan-300 shrink-0">→</span>
                  <span>Trufis línea B o D desde el centro hasta Av. Capitán Ustariz</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-300 shrink-0">→</span>
                  <span>Uber / InDriver disponibles en toda la ciudad</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-300 shrink-0">→</span>
                  <span>Estacionamiento en campus para quienes vengan en auto</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="mono-label mb-3">Qué hay en el campus</div>
              <ul className="space-y-3 font-mono text-[13px] text-white/60 leading-[1.6]">
                <li className="flex gap-3">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>Auditorio principal · Labs equipados · Patio de networking</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>Wi-Fi de alta velocidad en todo el recinto</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>Lunch incluido + coffee breaks durante el día</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>Zona de carga para laptops y dispositivos</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03]">
              <div className="mono-label mb-2 text-cyan-300">Capacidad</div>
              <div className="font-display font-medium text-4xl text-white tabular-nums">
                {event.capacity}
                <span className="text-white/30 text-2xl"> builders</span>
              </div>
              <p className="font-mono text-[11px] text-white/40 mt-2">
                Evento con cupo limitado — regístrate para asegurar tu lugar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
