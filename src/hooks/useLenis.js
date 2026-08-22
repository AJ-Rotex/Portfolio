import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Sets up Lenis smooth scrolling once for the whole app and exposes
 * window.__lenis so modals can pause/resume scrolling cleanly.
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
    window.__lenis = lenis;

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      if (window.__lenis === lenis) {
        window.__lenis = null;
      }
    };
  }, [enabled]);

  return lenisRef;
}
