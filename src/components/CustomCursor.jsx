import { useEffect, useRef } from 'react';

/**
 * Renders the dot + ring cursor and drives it from a single rAF loop
 * instead of per-element listeners, so it costs the same no matter how
 * many interactive elements are on the page.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    function handleMove(e) {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    }
    document.addEventListener('mousemove', handleMove);

    let frameId;
    function animRing() {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.12;
      p.ry += (p.my - p.ry) * 0.12;
      ring.style.transform = `translate(${p.rx - 18}px, ${p.ry - 18}px)`;
      frameId = requestAnimationFrame(animRing);
    }
    frameId = requestAnimationFrame(animRing);

    // Delegate hover detection to the document so we don't attach a
    // listener per card — this scales to any number of work cards for free.
    function handleOver(e) {
      const target = e.target.closest('[data-cursor-text], a, button');
      if (!target) return;
      if (target.hasAttribute('data-cursor-text')) {
        ring.classList.add('cursor-card-hover');
        ring.setAttribute('data-text', target.getAttribute('data-cursor-text'));
        ring.style.width = '70px';
        ring.style.height = '70px';
        cursor.style.opacity = '0';
      } else {
        ring.style.width = '56px';
        ring.style.height = '56px';
      }
    }
    function handleOut(e) {
      const target = e.target.closest('[data-cursor-text], a, button');
      if (!target) return;
      ring.classList.remove('cursor-card-hover');
      ring.removeAttribute('data-text');
      ring.style.width = '36px';
      ring.style.height = '36px';
      cursor.style.opacity = '1';
    }
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
