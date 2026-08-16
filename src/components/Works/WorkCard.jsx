import { useEffect, useRef } from 'react';

/**
 * A single portfolio card. Videos use preload="none" and only get a `src`
 * once the card is near the viewport (IntersectionObserver), and pause
 * again once it scrolls out — this is the fix for the original site's
 * "every video downloads on page load" problem.
 */
export default function WorkCard({ item, onOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  // Lazy-load + play/pause the video based on viewport visibility.
  useEffect(() => {
    if (item.type !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = item.src;
            video.addEventListener(
              'loadeddata',
              () => video.classList.add('video-ready'),
              { once: true }
            );
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item]);

  // 3D tilt on mouse move, mirrors the original site's effect.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const tiltX = -((y - yc) / yc) * 8;
      const tiltY = ((x - xc) / xc) * 8;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    function handleLeave() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`work-card size-${item.size}${item.hidden ? ' hide' : ''}`}
      data-category={item.category}
      data-cursor-text={item.cursorText}
      onClick={() => onOpen(item)}
    >
      <div className={`work-visual ${item.gradient}`}>
        {item.type === 'video' ? (
          <video ref={videoRef} muted loop playsInline preload="none" />
        ) : (
          <img src={item.src} alt={item.alt || item.title} loading="lazy" decoding="async" />
        )}
      </div>
      <div className="work-overlay">
        <div className="work-cat">{item.cat}</div>
        <div className="work-title-card">{item.title}</div>
      </div>
      <div className="work-arrow">↗</div>
    </div>
  );
}
