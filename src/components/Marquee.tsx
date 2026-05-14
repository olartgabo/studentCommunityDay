import { useEffect, useRef } from 'react';
import { marqueeWords } from '@/data/event';
import { getLenis } from '@/lib/smoothScroll';

export function Marquee() {
  const repeated = [...marqueeWords, ...marqueeWords];
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let smoothedV = 0;
    let lastT = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      const lenis = getLenis();
      const v = lenis?.velocity ?? 0;
      // Smooth the velocity reading so the band easing matches Lenis itself.
      smoothedV += (v - smoothedV) * 0.18;

      // Base leftward speed plus a scroll-velocity boost. Sign of velocity flips
      // direction so a fast scroll-up briefly reverses the band — a classic cue.
      const baseSpeed = 120; // px/s
      const boost = smoothedV * 4.5;
      const dx = -(baseSpeed + boost) * dt;
      x += dx;

      const half = track.scrollWidth / 2;
      if (half > 0) {
        // Wrap so the duplicated set seamlessly loops in either direction.
        while (x <= -half) x += half;
        while (x > 0) x -= half;
      }

      const skew = Math.max(-10, Math.min(10, smoothedV * 0.018));
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      aria-hidden
      className="relative py-8 border-y border-white/5 bg-navy-950 overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />
      <div
        ref={trackRef}
        className="flex w-max gap-12 will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        {repeated.map((word, i) => (
          <span
            key={i}
            className="font-display text-[clamp(28px,4vw,56px)] font-medium tracking-tight text-white/90 flex items-center gap-12"
          >
            {word}
            <span className="text-cyan-300 text-2xl">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
