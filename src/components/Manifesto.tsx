import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { event, manifestoLines } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-manifesto-line]', {
        opacity: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: true,
        },
        stagger: { each: 0.2, from: 'start' },
        duration: 1.2,
        ease: 'none',
      });

      gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
        const target = Number(el.dataset.counter);
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = Math.floor(obj.v).toString().padStart(el.dataset.pad ? Number(el.dataset.pad) : 0, '0');
              },
            });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="manifesto"
      className="relative py-32 md:py-44 bg-navy-900 overflow-hidden"
    >
      <div className="absolute inset-0 dot-field opacity-50" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_2fr] gap-16">
        <aside className="space-y-8">
          <div className="mono-label">// 01 — Manifesto</div>

          <div className="space-y-6 font-mono text-[12px] leading-[2] text-white/50">
            <Row label="LAT" value="-17.378" />
            <Row label="LON" value="-66.156" />
            <Row label="TZ" value="UTC−04" />
            <Row label="STATUS" value="GREEN" valueClass="text-signal-live" />
            <Row label="REV" value="v2026.10" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/5">
            <Counter label="Tracks" value={4} pad={2} />
            <Counter label="Hours" value={9} pad={2} />
            <Counter label="Slots" value={event.capacity} />
          </div>
        </aside>

        <div className="relative">
          <h2 className="font-display font-medium text-display-2 text-white/30 leading-[1.05]">
            {manifestoLines.map((line, i) => (
              <span key={i} data-manifesto-line className="block">
                {i === manifestoLines.length - 1 ? (
                  <>
                    {line.replace('nube.', '')}
                    <em className="not-italic text-cyan-300 glow-text">nube.</em>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>

          <p className="mt-12 max-w-[58ch] text-ink-200 text-[17px] leading-[1.7]">
            Esto no es un anuncio motivacional. Es{' '}
            <span className="text-white">infraestructura</span> traída por gente que vive
            de hacerla funcionar. Vas a salir con código en tu laptop, créditos en tu
            cuenta y dos contactos nuevos que mañana te debugean a la 1 AM.
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, valueClass = 'text-white/80' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-12 text-white/30">{label}</span>
      <span className="flex-1 border-b border-dashed border-white/10" />
      <span className={valueClass}>{value}</span>
    </div>
  );
}

function Counter({ label, value, pad }: { label: string; value: number; pad?: number }) {
  return (
    <div className="space-y-1">
      <div
        data-counter={value}
        data-pad={pad}
        className="font-display font-medium text-3xl text-cyan-300 tabular-nums"
      >
        0
      </div>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40">
        {label}
      </div>
    </div>
  );
}
