import { event, navLinks } from '@/data/event';
import { Logo } from './Logo';
import { CountdownBlock } from './Countdown';

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 bg-navy-950 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-12 max-w-md">
          <CountdownBlock />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Logo size={52} />
              <div>
                <div className="font-display font-semibold text-xl text-white leading-tight">
                  SCD<span className="text-cyan-300">·</span>26
                </div>
                <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30 mt-0.5">
                  AWS Student Builder Group · UPB
                </div>
              </div>
            </div>
            <p className="text-ink-300 text-sm leading-[1.7] max-w-[36ch]">
              AWS Student Community Day. Cochabamba. Una comunidad construida por
              estudiantes para estudiantes — del aula a la nube.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-live animate-pulse-live" />
              <span className="text-white/60">2026 EDITION · LIVE</span>
            </div>
          </div>

          <FootCol title="Navigate">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                <span className="text-white/30 mr-3">{l.num}</span>
                {l.label}
              </a>
            ))}
          </FootCol>

          <FootCol title="Event">
            <span>{event.venue}</span>
            <span>{event.dateLong}</span>
            <span>{event.address}</span>
            <span>Capacidad · {event.capacity}</span>
          </FootCol>

          <FootCol title="Connect">
            <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a>
            <a href="#">{event.socialHandle}</a>
            <a href="#">Discord · scd-bolivia</a>
            <a href="#">GitHub · scd-bolivia</a>
          </FootCol>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white/40 font-mono text-[11px] tracking-[0.12em] uppercase">
          <div>© 2026 SCD Bolivia · Community-run · Non-profit</div>
          <div className="flex items-center gap-6">
            <span>Build · Break · Deploy</span>
            <span className="text-cyan-300/80">v2026.10.03</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono-label mb-5 text-white/40">{title}</div>
      <div className="flex flex-col gap-3 text-sm text-white/70 font-sans">
        {Array.isArray(children)
          ? children
          : [children].flat().map((c, i) => <span key={i}>{c}</span>)}
      </div>
    </div>
  );
}
