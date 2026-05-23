import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(target, {
    offset: options?.offset ?? -40,
    duration: options?.duration ?? 1.6,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
}

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 120);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchor clicks through Lenis so the smoothness is felt on nav too.
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, {
        offset: -40,
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      if (history.replaceState) history.replaceState(null, '', href);
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      clearTimeout(refreshId);
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}

// Subscribes to the global rAF loop and reports a smoothed scroll velocity
// (in px/frame normalized). Robust to mount order: it polls getLenis() each
// frame instead of subscribing once, so callers can mount before Lenis is up.
export function useScrollVelocity(callback: (velocity: number) => void) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const lenis = getLenis();
      const v = lenis?.velocity ?? 0;
      cbRef.current(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}

// Applies a subtle skewY to every [data-scroll-skew] element based on Lenis
// velocity. Capped to ±MAX_SKEW so headers stay readable and pinned layouts
// (Tracks, Manifesto) — which intentionally don't carry the attribute — are
// unaffected.
const MAX_SKEW = 2.2;

export function useScrollSkew() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let current = 0;
    const tick = () => {
      const lenis = getLenis();
      const v = lenis?.velocity ?? 0;
      const target = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, v * 0.025));
      current += (target - current) * 0.18;
      const skew = Math.abs(current) < 0.01 ? 0 : current;
      const els = document.querySelectorAll<HTMLElement>('[data-scroll-skew]');
      els.forEach((el) => {
        el.style.transform = skew === 0 ? '' : `skewY(${skew.toFixed(3)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.querySelectorAll<HTMLElement>('[data-scroll-skew]').forEach((el) => {
        el.style.transform = '';
      });
    };
  }, []);
}
