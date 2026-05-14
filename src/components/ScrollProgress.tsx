import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      gsap.to(barRef.current, { scaleX: pct, duration: 0.2, ease: 'power2.out' });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-white/5 pointer-events-none">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-200 shadow-[0_0_12px_rgba(0,191,240,0.7)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const dotXY = { x: -100, y: -100 };
    const ringXY = { x: -100, y: -100 };
    let target = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    // Hover variants: bubble up from data-cursor="..." ancestor.
    const onOver = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement | null;
      const host = tgt?.closest?.('[data-cursor]') as HTMLElement | null;
      if (host) {
        setVariant(host.dataset.cursor ?? null);
      } else {
        setVariant(null);
      }
    };
    document.addEventListener('mouseover', onOver);

    let raf = 0;
    const loop = () => {
      dotXY.x += (target.x - dotXY.x) * 0.35;
      dotXY.y += (target.y - dotXY.y) * 0.35;
      ringXY.x += (target.x - ringXY.x) * 0.18;
      ringXY.y += (target.y - ringXY.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotXY.x}px, ${dotXY.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringXY.x}px, ${ringXY.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  const isActive = variant !== null;
  const label = variant ? labelForVariant(variant) : '';

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[55] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen hidden md:flex items-center justify-center transition-[width,height,background-color,border-color,backdrop-filter] duration-300 ease-out
          ${isActive
            ? 'h-20 w-20 border border-cyan-300/70 bg-cyan-400/10 backdrop-blur-sm'
            : 'h-9 w-9 border border-cyan-300/50 bg-transparent'}`}
        style={
          isActive
            ? { marginLeft: -40, marginTop: -40 }
            : { marginLeft: -18, marginTop: -18 }
        }
      >
        <span
          ref={labelRef}
          className={`font-mono text-[10px] tracking-[0.16em] uppercase text-cyan-100 select-none whitespace-nowrap transition-opacity duration-200 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[55] rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(0,191,240,0.9)] hidden md:block transition-[height,width,opacity] duration-200 ${
          isActive ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100'
        }`}
        style={{ marginLeft: -3, marginTop: -3 }}
      />
    </>
  );
}

function labelForVariant(v: string): string {
  switch (v) {
    case 'drag':
      return 'drag →';
    case 'open':
      return 'open ↗';
    case 'pick':
      return 'pick →';
    case 'go':
      return 'go →';
    case 'send':
      return 'send →';
    default:
      return v;
  }
}
