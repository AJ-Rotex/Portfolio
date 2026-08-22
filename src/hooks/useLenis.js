import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Sets up Lenis smooth scrolling once for the whole app and returns a ref
 * to the instance so components (like anchor links) can call scrollTo().
 * Pass enabled=false to skip it entirely (e.g. on touch devices, where
 * Lenis fights with native momentum scrolling and just costs JS time).
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [enabled]);

  return lenisRef;
}
