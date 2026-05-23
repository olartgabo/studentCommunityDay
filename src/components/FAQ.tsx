import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqs } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const root = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-faq-item]', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      });
    },
    { scope: root },
  );

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section
      ref={root}
      id="faq"
      className="relative py-24 md:py-36 bg-navy-900 overflow-hidden noise"
    >
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-20" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="mono-label mb-4">// 07 — FAQ</div>
            <h2 className="font-display font-medium text-[clamp(40px,6vw,80px)] tracking-tightest text-white leading-[0.9]">
              Preguntas
              <br />
              <em className="not-italic text-cyan-300 glow-text">frecuentes.</em>
            </h2>
            <p className="mt-6 font-mono text-[13px] text-white/40 leading-[1.7] max-w-[30ch]">
              ¿Algo que no está aquí? Escríbenos a{' '}
              <a
                href="mailto:hi@scd-bolivia.dev"
                className="text-cyan-300 hover:underline"
              >
                hi@scd-bolivia.dev
              </a>
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((item, i) => (
              <div
                key={i}
                data-faq-item
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-display font-medium text-[17px] text-white pr-8">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 font-mono text-cyan-300 text-lg transition-transform duration-300 ${
                      open === i ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open === i ? '200px' : '0px' }}
                >
                  <p className="px-6 pb-5 font-mono text-[13px] text-white/60 leading-[1.75]">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
