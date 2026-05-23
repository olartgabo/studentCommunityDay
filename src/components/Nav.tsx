import { useEffect, useState } from 'react';
import { LockupHorizontal } from './Logo';
import { MagneticButton } from './MagneticButton';
import { CountdownPill } from './Countdown';
import { event, navLinks } from '@/data/event';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => document.getElementById(l.id));
      const viewport = window.innerHeight;
      let current = 'hero';
      for (const sec of sections) {
        if (!sec) continue;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= viewport * 0.35) current = sec.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-navy-900/70 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <a href="#hero" className="shrink-0">
          <LockupHorizontal />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="group flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors"
            >
              <span
                className={`transition-all duration-200 ${
                  active === link.id
                    ? 'text-cyan-300/60 opacity-100'
                    : 'text-white/30 opacity-0 group-hover:opacity-100'
                }`}
              >
                {link.num}
              </span>
              <span
                className={`transition-colors ${
                  active === link.id
                    ? 'text-white/90'
                    : 'text-white/50 group-hover:text-white/90'
                }`}
              >
                {link.label}
              </span>
              {active === link.id && (
                <span className="ml-0.5 h-px w-3 bg-cyan-300/60" aria-hidden />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CountdownPill />
          <div className="hidden md:flex items-center gap-2 pill">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-signal-live animate-pulse-live" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signal-live" />
            </span>
            <span>{event.city} · LIVE</span>
          </div>
          <MagneticButton href="#register" variant="primary" strength={0.4} className="text-[11px] py-2.5 px-4">
            Register
            <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
