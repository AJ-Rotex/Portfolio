import { useEffect, useRef, useState } from 'react';
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice.js';

/**
 * WorkCard component — clean video card with single active audio enforcement and no button overlays.
 * Clicking a video card plays/unmutes it in-place and automatically mutes all other videos.
 */
export default function WorkCard({ item, onOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const isTouch = useIsTouchDevice();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mute this video if another video plays unmuted audio
  useEffect(() => {
    if (item.type !== 'video') return;

    function handleActiveAudio(e) {
      if (e.detail?.id !== item.id && videoRef.current) {
        videoRef.current.muted = true;
      }
    }

    window.addEventListener('portfolio-active-audio', handleActiveAudio);
    return () => window.removeEventListener('portfolio-active-audio', handleActiveAudio);
  }, [item.id, item.type]);

  useEffect(() => {
    if (item.type !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData) return;

    const margin = isTouch ? '200px 0px' : '350px 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = item.src;
          }
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { rootMargin: margin, threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item, isTouch]);

  // 3D tilt on mouse move for desktop (skipped on touch)
  useEffect(() => {
    if (isTouch) return;
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
  }, [isTouch]);

  function notifyActiveAudio() {
    window.dispatchEvent(
      new CustomEvent('portfolio-active-audio', { detail: { id: item.id } })
    );
  }

  function handleCardClick() {
    if (item.type === 'video') {
      const video = videoRef.current;
      if (!video) return;

      if (!video.src) {
        video.src = item.src;
      }

      if (video.paused || video.muted) {
        video.muted = false;
        notifyActiveAudio();
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            video.muted = true;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          });
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } else {
      onOpen(item);
    }
  }

  return (
    <div
      ref={cardRef}
      className={`work-card size-${item.size}${item.hidden ? ' hide' : ''}`}
      data-category={item.category}
      data-cursor-text={item.type === 'video' ? (isPlaying ? 'PAUSE' : 'PLAY') : item.cursorText}
      onClick={handleCardClick}
    >
      <div className={`work-visual ${item.gradient}`}>
        {item.type === 'video' ? (
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
