import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { event } from '@/data/event';
import { useMagnetic } from '@/lib/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export function Register() {
  const root = useRef<HTMLElement | null>(null);
  const submitRef = useMagnetic<HTMLButtonElement>(0.35);

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

  const slotsLeft = event.capacity - event.confirmed;

  return (
    <section
      ref={root}
      id="register"
      className="relative py-32 md:py-44 bg-navy-900 overflow-hidden noise"
    >
      <div className="absolute inset-0 bg-aurora opacity-80 animate-shimmer" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" />
      <div className="absolute -top-20 right-1/3 w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-[140px] animate-drift" />

      <div
        data-scroll-skew
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div className="text-center mb-16">
          <div className="mono-label mb-6">// 05 — Register</div>
          <h2 className="font-display font-medium text-[clamp(56px,11vw,180px)] tracking-tightest text-white leading-[0.9]">
            <span className="block overflow-hidden">
              <span data-cta-word className="inline-block">
                Get your
              </span>
            </span>
            <span className="block overflow-hidden">
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

        <div className="grid lg:grid-cols-[1fr_420px] gap-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-navy-950/60 backdrop-blur-xl shadow-glow-cyan"
          >
            <div className="absolute top-6 left-6 corner-label">REGISTER.FORM</div>
            <div className="absolute top-6 right-6 corner-label text-cyan-300">
              ● READY
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <Field label="Nombre" placeholder="Camila Vargas" />
              <Field label="Email" type="email" placeholder="camila@upb.edu" />
              <Field label="Universidad" placeholder="UPB Cochabamba" />
              <Field label="Año / Carrera" placeholder="3er año · Sistemas" />
            </div>

            <div className="mt-8 space-y-3">
              <div className="mono-label text-white/40">Track preferido</div>
              <div className="flex flex-wrap gap-2">
                {['cloud', 'devops', 'ai', 'security'].map((t) => (
                  <label
                    key={t}
                    className="pill cursor-pointer hover:border-cyan-400/40 hover:text-white transition-colors"
                  >
                    <input type="checkbox" className="accent-cyan-400 mr-1.5" />
                    /{t}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
              <p className="font-mono text-[11px] text-white/40 max-w-[36ch]">
                Recibirás tu wristband digital + acceso al Discord en 24h.
              </p>
              <button
                ref={submitRef}
                type="submit"
                data-cursor="send"
                className="btn-primary will-change-transform"
              >
                <span className="pointer-events-none inline-flex items-center gap-3">
                  Register — Free
                  <span aria-hidden>→</span>
                </span>
              </button>
            </div>
          </form>

          <aside className="space-y-4">
            <Stat
              label="Confirmed"
              value={event.confirmed}
              total={event.capacity}
              accent="text-cyan-300"
              barClass="bg-cyan-300"
            />
            <Stat
              label="Slots left"
              value={slotsLeft}
              total={event.capacity}
              accent="text-signal-live"
              barClass="bg-signal-live"
            />
            <Stat
              label="Waitlist"
              value={event.waitlist}
              total={100}
              accent="text-amber-300"
              barClass="bg-amber-300"
            />
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

function Field({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <div className="mono-label text-white/50">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 font-sans text-[15px] focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-colors outline-none"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  total,
  accent,
  barClass,
}: {
  label: string;
  value: number;
  total: number;
  accent: string;
  barClass: string;
}) {
  const pct = Math.min(100, Math.round((value / total) * 100));
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-end justify-between mb-3">
        <div className="mono-label">{label}</div>
        <div className={`font-display font-medium text-3xl tabular-nums ${accent}`}>
          {value}
          <span className="text-white/30 text-xl"> / {total}</span>
        </div>
      </div>
      <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full ${barClass} transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
