import { useEffect, useRef } from 'react';
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

    let raf = 0;
    const loop = () => {
      dotXY.x += (target.x - dotXY.x) * 0.35;
      dotXY.y += (target.y - dotXY.y) * 0.35;
      ringXY.x += (target.x - ringXY.x) * 0.12;
      ringXY.y += (target.y - ringXY.y) * 0.12;

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
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[55] -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-cyan-300/50 mix-blend-screen hidden md:block"
        style={{ marginLeft: -18, marginTop: -18 }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[55] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(0,191,240,0.9)] hidden md:block"
        style={{ marginLeft: -3, marginTop: -3 }}
      />
    </>
  );
}
