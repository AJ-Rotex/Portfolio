import { useEffect, useRef, useState } from 'react';

/**
 * Adds a "visible" class once an element scrolls into view, then stops
 * observing it (one-shot reveal — matches the original site's behavior).
 *
 * threshold is low and rootMargin trims the bottom edge of the viewport
 * (rather than requiring 8% of the element inside it) so tall sections on
 * short mobile viewports reveal as soon as they start appearing, instead
 * of sitting invisible until 8% of a section that's taller than the
 * screen has scrolled past — which reads as "nothing is animating".
 */
export function useReveal(threshold = 0.01) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
