import { useEffect, useState } from 'react';

/**
 * True on phones/tablets (coarse pointer, no hover) — used to skip
 * desktop-only effects (custom cursor, 3D tilt, Lenis smooth-scroll)
 * that cost CPU/JS time for no visual benefit on touch devices.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const handler = () => setIsTouch(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isTouch;
}
