import { useEffect, useRef, useState } from 'react';
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice.js';

/**
 * WorkCard component — plays videos in-place on the page where the user is stayed.
 * Clicking a video card plays/pauses it with sound directly in the card frame.
 */
export default function WorkCard({ item, onOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const isTouch = useIsTouchDevice();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  function handleCardClick(e) {
    if (item.type === 'video') {
      const video = videoRef.current;
      if (!video) return;

      if (!video.src) {
        video.src = item.src;
      }

      if (video.paused) {
        video.muted = false;
        setIsMuted(false);
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
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

  function handleSoundToggle(e) {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const newMuted = !video.muted;
      video.muted = newMuted;
      setIsMuted(newMuted);
    }
  }

  function handleExpand(e) {
    e.stopPropagation();
    onOpen(item);
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

      {item.type === 'video' ? (
        <div className="card-video-controls">
          <button
            type="button"
            className="card-ctrl-btn"
            onClick={handleCardClick}
            title={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            className="card-ctrl-btn"
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <button
            type="button"
            className="card-ctrl-btn"
            onClick={handleExpand}
            title="Full Screen Preview"
          >
            ⛶
          </button>
        </div>
      ) : (
        <div className="work-arrow">↗</div>
      )}
    </div>
  );
}
