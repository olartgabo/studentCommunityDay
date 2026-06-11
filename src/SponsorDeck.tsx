import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { event, sponsorTiers, sponsorPricingNote } from '@/data/event';
import { Logo, LockupHorizontal } from './components/Logo';

gsap.registerPlugin(ScrollTrigger);

// Editable: fecha máxima de pago para confirmar patrocinio (≈2 semanas antes del evento).
const PAYMENT_DEADLINE = '19 de septiembre de 2026';

const audience = [
  ['Sistemas & Informática', 'Estudiantes de ingeniería de software y carreras afines'],
  ['Cloud & Infra', 'Futuros DevOps, SRE y arquitectos en formación'],
  ['IA & Machine Learning', 'Talento explorando Bedrock, RAG y modelos en AWS'],
  ['Ciberseguridad', 'Perfiles enfocados en threat modeling, IAM y defensa'],
  ['Builders tempranos', 'Quienes recién eligen su stack — y a qué empresas admirar'],
  ['Líderes estudiantiles', 'Organizadores y embajadores de comunidades tech'],
];

const gains = [
  {
    k: 'A',
    title: 'Marca frente a quien decide su futuro',
    body: 'Tu logo vive en la web, el escenario, las gigantografías y cada pieza de comunicación — antes, durante y después. No interrumpes su día: te vuelves parte de cómo recuerdan el evento.',
  },
  {
    k: 'B',
    title: 'Cantera de talento, primero que nadie',
    body: 'Publica internships y vacantes junior directo en la web y redes del evento, y conoce en persona a cientos de futuros ingenieros mientras todavía deciden dónde quieren trabajar.',
  },
  {
    k: 'C',
    title: 'Networking sin corbatas',
    body: 'Un stand te pone cara a cara con builders, speakers y organizadores en un ambiente relajado. El mejor contexto posible para una primera conversación honesta.',
  },
  {
    k: 'D',
    title: 'El respaldo de AWS, a tu lado',
    body: 'Asociar tu empresa a un evento avalado por AWS proyecta liderazgo e innovación, y convierte tu responsabilidad social en impacto medible sobre el ecosistema tech boliviano.',
  },
];

const paymentModes = [
  ['50 / 50', `50% al confirmar, 50% hasta el ${PAYMENT_DEADLINE}`],
  ['100% (preferida)', 'Pago completo al confirmar tu paquete'],
  ['100% diferido', `Pago completo hasta el ${PAYMENT_DEADLINE} como fecha máxima`],
];

const spend = [
  'Alquiler y equipamiento técnico del evento',
  'Alimentación, refrigerios y bebidas para los asistentes',
  'Souvenirs, swag y kits de bienvenida',
  'Material de escritorio, impresos y señalética',
  'Logística, traslados y producción',
  'Obsequios para asistentes, speakers y voluntarios',
];

const accentText: Record<string, string> = {
  cyan: 'text-cyan-300',
  white: 'text-violet-300',
  amber: 'text-amber-300',
  neutral: 'text-white/55',
};
const accentGlow: Record<string, string> = {
  cyan: 'rgba(0,191,240,0.14)',
  white: 'rgba(167,139,250,0.13)',
  amber: 'rgba(251,191,36,0.12)',
  neutral: 'rgba(255,255,255,0.06)',
};
const accentBorder: Record<string, string> = {
  cyan: 'hover:border-cyan-400/60',
  white: 'hover:border-violet-400/50',
  amber: 'hover:border-amber-400/50',
  neutral: 'hover:border-white/25',
};
const accentStrip: Record<string, string> = {
  cyan: 'via-cyan-300',
  white: 'via-violet-300',
  amber: 'via-amber-300',
  neutral: 'via-white/40',
};

const mailto = `mailto:${event.contactEmail}?subject=Patrocinio%20${event.shortName}`;

export default function SponsorDeck() {
  const root = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      // Hero — load-in stagger
      gsap.from('[data-hero] > *', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.05,
      });

      // Count-up on the capacity stat (client only)
      const el = countRef.current;
      if (el) {
        const target = event.capacity;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          delay: 0.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      }

      // Generic scroll reveals
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((node) => {
        gsap.from(node, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 86%' },
        });
      });

      // Staggered groups (cards)
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 82%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative min-h-screen bg-navy-950 text-ink-100 noise overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-cyan-400/10 blur-[160px] pointer-events-none animate-drift" />

      {/* Top bar */}
      <header className="relative z-20 border-b border-white/5 backdrop-blur-md bg-navy-900/60">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          <a href="/" aria-label="Volver al sitio">
            <LockupHorizontal />
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline pill-cyan">Sponsor Deck · 2026</span>
            <a href="/" className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/50 hover:text-cyan-300 transition-colors">
              ← Volver al sitio
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Hero */}
        <section data-hero className="relative pt-24 md:pt-36 pb-20">
          <div className="mono-label mb-6">// Sponsor Deck · {event.name} · {event.city} {event.year}</div>
          <h1 className="font-display font-medium text-[clamp(40px,7.5vw,92px)] tracking-tightest text-white leading-[0.95] max-w-[16ch]">
            El talento que buscas
            <br />
            todavía está{' '}
            <em className="not-italic text-cyan-300 glow-text">estudiando.</em>
          </h1>
          <p className="mt-8 max-w-[60ch] text-ink-200 text-[17px] leading-[1.7]">
            El {event.name} reúne en un solo día a la próxima generación cloud de Bolivia:
            workshops hands-on, charlas de la industria y networking — gratis para los
            estudiantes, organizado por la comunidad. Para tu empresa es la primera fila
            frente a los futuros cloud, DevOps, IA y security engineers del país.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            <Fact accent>
              <span className="tabular-nums">
                <span ref={countRef}>{event.capacity}</span>+
              </span>
              <span>estudiantes builders</span>
            </Fact>
            <Fact>
              {event.dateDisplay}
              <span>{event.weekday} · {event.venue}</span>
            </Fact>
            <Fact>
              Gratis
              <span>para asistentes · avalado por AWS</span>
            </Fact>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href={mailto} className="btn-primary">Quiero ser sponsor <span aria-hidden>→</span></a>
            <a href="#paquetes" className="btn-ghost">Ver paquetes</a>
          </div>
        </section>

        {/* Why it matters */}
        <Section num="01" title="Por qué esta sala vale tu inversión">
          <p data-reveal className="text-ink-200 text-[16px] leading-[1.8] max-w-[68ch]">
            No es un evento corporativo con público cautivo. Es gratuito y lo organiza la
            comunidad, así que cada persona está ahí porque <span className="text-cyan-300">quiere</span> estar.
            Esa diferencia lo cambia todo: tu marca no compite por atención, se gana respeto.
            Y para una generación que recién decide su stack y a qué empresas admira, aparecer
            hoy es sembrar mucho antes que tu competencia.
          </p>
        </Section>

        {/* Audience */}
        <Section num="02" title="A quién llegas">
          <p data-reveal className="text-ink-300 text-[15px] leading-[1.7] mb-10 max-w-[60ch]">
            Más de {event.capacity} asistentes con perfiles especializados en formación —
            el pipeline de contratación de los próximos tres años, en una sala:
          </p>
          <ul data-reveal-group className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audience.map(([title, desc]) => (
              <li key={title} className="surface p-5">
                <div className="font-display text-[17px] text-white tracking-tight">{title}</div>
                <div className="text-ink-300 text-[13px] leading-snug mt-1.5">{desc}</div>
              </li>
            ))}
          </ul>
        </Section>

        {/* What brand gains */}
        <Section num="03" title="Lo que tu marca se lleva">
          <div data-reveal-group className="grid sm:grid-cols-2 gap-4">
            {gains.map((g) => (
              <div key={g.k}>
                <TiltCard accent="cyan" className="h-full p-7 md:p-8">
                  <div className="mono-label mb-4">{g.k}</div>
                  <h3 className="font-display font-medium text-2xl text-white tracking-tight mb-3 leading-tight">
                    {g.title}
                  </h3>
                  <p className="text-ink-300 text-[14px] leading-[1.7]">{g.body}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </Section>

        {/* Packages */}
        <Section num="04" title="Paquetes de patrocinio 2026" anchor="paquetes">
          <div data-reveal-group className="grid md:grid-cols-2 gap-4">
            {sponsorTiers.map((tier) => (
              <div key={tier.id} className={tier.featured ? 'md:col-span-2' : ''}>
              <TiltCard
                accent={tier.accent}
                className="h-full p-7 md:p-9"
              >
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    {tier.featured && (
                      <div className="inline-flex items-center gap-1.5 mb-3 font-mono text-[10px] tracking-[0.16em] uppercase text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 rounded-full px-2.5 py-1">
                        ★ Featured
                      </div>
                    )}
                    <div className={`mono-label ${accentText[tier.accent]}`}>{tier.tagline}</div>
                    <h3 className="font-display font-medium text-[clamp(30px,4.5vw,52px)] text-white tracking-tightest leading-[1.0] mt-1.5">
                      {tier.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className={`font-display font-semibold text-[clamp(28px,4vw,40px)] tabular-nums leading-none ${accentText[tier.accent]}`}>
                      {tier.price}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/35 mt-1.5">
                      por edición
                    </div>
                  </div>
                </div>

                <div className="my-6 h-px w-full bg-gradient-to-r from-white/15 to-transparent" />

                <ul className={`grid gap-2.5 ${tier.featured ? 'sm:grid-cols-2' : ''}`}>
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[13.5px] text-ink-300 leading-[1.5]">
                      <span className={`shrink-0 mt-0.5 font-mono ${accentText[tier.accent]}`}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`${mailto}%20${tier.name}`}
                  className={`mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${accentText[tier.accent]} hover:gap-3 transition-all`}
                >
                  Reservar {tier.name} <span aria-hidden>→</span>
                </a>
              </TiltCard>
              </div>
            ))}
          </div>
          <p data-reveal className="mt-6 text-white/45 text-[13px] leading-[1.65] max-w-[72ch] font-mono">
            {sponsorPricingNote}
          </p>
        </Section>

        {/* Payment terms */}
        <Section num="05" title="Términos claros, desde el inicio">
          <div data-reveal-group className="grid md:grid-cols-3 gap-4 mb-4">
            {paymentModes.map(([tag, desc]) => (
              <div key={tag} className="surface p-6">
                <div className="mono-label text-cyan-300/80 mb-3">{tag}</div>
                <p className="text-ink-200 text-[14px] leading-[1.55]">{desc}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="surface p-7">
            <p className="text-ink-300 text-[14px] leading-[1.75]">
              <span className="text-white">La reserva se formaliza únicamente con el pago.</span>{' '}
              Sin pago confirmado, el paquete queda disponible para otros sponsors. Una vez
              recibido, garantizamos por escrito la entrega de todos los beneficios del paquete
              elegido, antes y durante el evento. ¿Tu empresa maneja otros procesos internos?
              Conversémoslo antes de confirmar — siempre encontramos un esquema que funcione.
            </p>
          </div>
        </Section>

        {/* Where support goes */}
        <Section num="06" title="A dónde va tu aporte">
          <p data-reveal className="text-ink-300 text-[15px] leading-[1.7] mb-10 max-w-[64ch]">
            Cada boliviano se traduce en una mejor experiencia para los asistentes — y en una
            mejor vitrina para tu marca:
          </p>
          <ul data-reveal-group className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {spend.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[14.5px] text-ink-200 leading-[1.5] py-1">
                <span className="shrink-0 mt-1 font-mono text-cyan-300 text-[12px]">→</span>
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* Final CTA */}
        <section data-reveal className="relative my-24 rounded-3xl border border-cyan-400/30 bg-cyan-400/[0.03] overflow-hidden p-10 md:p-16 text-center">
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-400/15 blur-[120px]" />
          <Logo size={300} aria-hidden className="absolute -bottom-16 -right-16 opacity-[0.04] pointer-events-none select-none" />
          <div className="relative">
            <div className="mono-label mb-5">Este es el momento</div>
            <h2 className="font-display font-medium text-[clamp(32px,5.5vw,64px)] tracking-tightest text-white leading-[1.02] max-w-[18ch] mx-auto">
              Sé parte de la historia que <em className="not-italic text-cyan-300 glow-text">recién empieza.</em>
            </h2>
            <p className="mt-6 max-w-[52ch] mx-auto text-ink-200 text-[15px] leading-[1.7]">
              {event.dateDisplay} · {event.venue}, {event.city}. Conversemos qué paquete
              encaja con lo que tu empresa quiere lograr este año.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href={mailto} className="btn-primary">Contactar al equipo <span aria-hidden>→</span></a>
              <a href={`mailto:${event.contactEmail}`} className="btn-ghost">{event.contactEmail}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 font-mono text-[11px] tracking-[0.12em] uppercase">
          <div>© {event.year} SCD Bolivia · Community-run · Non-profit</div>
          <a href="/" className="hover:text-cyan-300 transition-colors">studentcommunity.day</a>
        </div>
      </footer>
    </div>
  );
}

function Section({
  num,
  title,
  anchor,
  children,
}: {
  num: string;
  title: string;
  anchor?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={anchor} className="py-16 md:py-24 border-t border-white/5 scroll-mt-24">
      <div data-reveal className="flex items-center gap-4 mb-10">
        <span className="font-mono text-[12px] text-cyan-300/70">{num}</span>
        <h2 className="font-display font-medium text-[clamp(28px,4.5vw,52px)] tracking-tightest text-white leading-[1.02]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Fact({ accent = false, children }: { accent?: boolean; children: React.ReactNode }) {
  const [head, sub] = Array.isArray(children) ? children : [children, null];
  return (
    <div className={`surface p-6 ${accent ? 'border-cyan-400/25' : ''}`}>
      <div className={`font-display font-medium text-[34px] leading-none tracking-tight ${accent ? 'text-cyan-300' : 'text-white'}`}>
        {head}
      </div>
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/40 mt-2.5">{sub}</div>
    </div>
  );
}

function TiltCard({
  accent,
  className = '',
  children,
}: {
  accent: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors duration-500 ${accentBorder[accent]} ${className}`}
      style={
        {
          backgroundImage: `radial-gradient(440px circle at var(--mx,50%) var(--my,50%), ${accentGlow[accent]}, transparent 55%)`,
          transform: 'perspective(1200px) rotateX(var(--rx,0)) rotateY(var(--ry,0))',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.5s',
        } as React.CSSProperties
      }
    >
      <div
        className={`absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent ${accentStrip[accent]} to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700`}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
