import { useEffect, useRef } from 'react';
<<<<<<< HEAD
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice.js';

/**
 * WorkCard component optimized for fast mobile rendering.
 * Uses video posters as instant preview thumbnails, and loads compressed videos
 * lazily as cards approach the viewport.
=======

/**
 * A single portfolio card. Videos use preload="none" and only get a `src`
 * once the card is near the viewport (IntersectionObserver), and pause
 * again once it scrolls out — this is the fix for the original site's
 * "every video downloads on page load" problem.
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
 */
export default function WorkCard({ item, onOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
<<<<<<< HEAD
  const isTouch = useIsTouchDevice();

=======

  // Lazy-load + play/pause the video based on viewport visibility.
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
  useEffect(() => {
    if (item.type !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

<<<<<<< HEAD
    // Respect data-saver mode: if saveData is enabled, leave poster image intact
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData) return;

    const margin = isTouch ? '120px 0px' : '300px 0px';

=======
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = item.src;
<<<<<<< HEAD
          }
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay policy prevented playback (e.g. low power mode) — poster remains visible
            });
          }
=======
            video.addEventListener(
              'loadeddata',
              () => video.classList.add('video-ready'),
              { once: true }
            );
          }
          video.play().catch(() => {});
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
        } else {
          video.pause();
        }
      },
<<<<<<< HEAD
      { rootMargin: margin, threshold: 0.1 }
=======
      { rootMargin: '200px 0px', threshold: 0.15 }
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
    );

    observer.observe(video);
    return () => observer.disconnect();
<<<<<<< HEAD
  }, [item, isTouch]);

  // 3D tilt on mouse move for desktop (skipped on touch)
  useEffect(() => {
    if (isTouch) return;
=======
  }, [item]);

  // 3D tilt on mouse move, mirrors the original site's effect.
  useEffect(() => {
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
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
<<<<<<< HEAD
  }, [isTouch]);
=======
  }, []);
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b

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
<<<<<<< HEAD
          <video
            ref={videoRef}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt || item.title}
            loading="lazy"
            decoding="async"
          />
=======
          <video ref={videoRef} muted loop playsInline preload="none" />
        ) : (
          <img src={item.src} alt={item.alt || item.title} loading="lazy" decoding="async" />
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
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
