import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakers } from '@/data/event';

gsap.registerPlugin(ScrollTrigger);

const trackTint: Record<string, string> = {
  devops: 'from-fuchsia-500/40 to-navy-800',
  cloud: 'from-cyan-400/40 to-navy-800',
  ai: 'from-emerald-400/40 to-navy-800',
  security: 'from-amber-400/40 to-navy-800',
};

// ── Live section: line-up not announced yet ──────────────────────────────────
export function Speakers() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-spk-head] > *', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-spk-head]', start: 'top 80%' },
      });

      gsap.from('[data-spk-slot]', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-spk-grid]', start: 'top 82%' },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="speakers"
      className="relative py-32 md:py-44 bg-navy-950 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div
        data-scroll-skew
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        <header
          data-spk-head
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="mono-label mb-4">// 04 — Speakers</div>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,72px)] tracking-tightest text-white leading-[0.95]">
              Quienes <em className="not-italic text-cyan-300">construyen</em>.
            </h2>
          </div>
          <p className="max-w-[40ch] text-ink-300 text-[15px] leading-[1.7]">
            Estamos cerrando el line-up: AWS Community Builders, fundadores y senior
            engineers. Anunciamos los nombres muy pronto.
          </p>
        </header>

        <div data-spk-grid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <article
              key={i}
              data-spk-slot
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-navy-900" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 14px)',
                  }}
                />
                {/* shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1400ms] ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-medium text-[clamp(56px,7vw,104px)] text-white/15 tracking-tightest leading-none">
                    ?
                  </span>
                </div>
                <div className="absolute top-4 left-4 corner-label">
                  {String(i + 1).padStart(2, '0')} / 04
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 corner-label text-cyan-300/70">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-signal-live animate-pulse-live" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signal-live" />
                  </span>
                  Pronto
                </div>
              </div>

              <div className="p-6 space-y-3 border-t border-white/5">
                <div className="h-4 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-1/3 rounded bg-cyan-300/20" />
                <div className="h-3 w-full rounded bg-white/5 mt-3" />
              </div>
            </article>
          ))}
        </div>

        <CallForSpeakers />
      </div>
    </section>
  );
}

// ── Preserved full line-up section — restore by rendering <SpeakersFull /> in App ──
export function SpeakersFull() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from('[data-speaker]', {
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
      })
        .from(
          '[data-speaker-initials]',
          { yPercent: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out' },
          '-=0.6',
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="speakers"
      className="relative py-32 md:py-44 bg-navy-950 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div
        data-scroll-skew
        className="relative max-w-[1400px] mx-auto px-6 md:px-10 will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="mono-label mb-4">// 04 — Speakers</div>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,72px)] tracking-tightest text-white leading-[0.95]">
              Quienes <em className="not-italic text-cyan-300">construyen</em>.
            </h2>
          </div>
          <p className="max-w-[40ch] text-ink-300 text-[15px] leading-[1.7]">
            Builders activos. AWS Community Builders, fundadores y senior engs que
            envían a producción la semana que viene.
          </p>
        </header>

        <div data-speakers-grid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {speakers.map((s, i) => (
            <article
              key={s.id}
              data-speaker
              data-cursor="open"
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-cyan-400/40 hover:-translate-y-1"
            >
              <div
                data-speaker-img
                className="aspect-[4/5] relative overflow-hidden will-change-[clip-path]"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${trackTint[s.track]} transition-transform duration-700 group-hover:scale-110`}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 14px)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <span
                    data-speaker-initials
                    className="font-display font-medium text-[clamp(64px,8vw,120px)] text-white/85 tracking-tightest leading-none inline-block"
                  >
                    {s.initials}
                  </span>
                </div>
                <div className="absolute top-4 left-4 corner-label">
                  {String(i + 1).padStart(2, '0')} / 04
                </div>
                <div className="absolute bottom-4 right-4 corner-label">{s.city}</div>
              </div>

              <div className="p-6 space-y-3 border-t border-white/5">
                <h3 className="font-display font-medium text-xl text-white tracking-tight leading-tight">
                  {s.name}
                </h3>
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan-300/80">
                  {s.role}
                </div>
                <p className="text-ink-300 text-[13px] leading-[1.55] pt-2 border-t border-white/5">
                  {s.talk}
                </p>
              </div>
            </article>
          ))}
        </div>

        <CallForSpeakers />
      </div>
    </section>
  );
}

function CallForSpeakers() {
  return (
    <a
      href="mailto:hi@scd-bolivia.dev?subject=Talk%20Submission%20SCD%C2%B726"
      data-cursor="go"
      className="group relative mt-12 flex items-center justify-between gap-8 w-full px-8 md:px-14 py-10 md:py-12 rounded-2xl border border-dashed border-white/20 bg-white/[0.01] hover:border-cyan-400/50 hover:bg-cyan-400/[0.03] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:via-cyan-400/3 group-hover:to-transparent transition-all duration-700" />

      <div className="relative">
        <div className="mono-label mb-3 text-white/30">// Open call</div>
        <div className="relative overflow-hidden" style={{ height: 'clamp(24px, 4vw, 52px)' }}>
          <p className="font-display font-medium text-[clamp(24px,4vw,52px)] leading-none tracking-tightest transition-transform duration-[400ms] ease-in-out group-hover:-translate-y-full text-white whitespace-nowrap">
            Call for speakers<span className="text-white/30 ml-3">→</span>
          </p>
          <p className="absolute inset-0 font-display font-medium text-[clamp(24px,4vw,52px)] leading-none tracking-tightest translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-in-out text-cyan-300 whitespace-nowrap">
            I want to give a talk<span className="ml-3">↗</span>
          </p>
        </div>
      </div>

      <div className="relative shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-full border border-white/15 group-hover:border-cyan-400/60 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
        <span className="font-mono text-[22px] text-white/30 group-hover:text-cyan-300 transition-colors duration-300">↗</span>
      </div>
    </a>
  );
}
