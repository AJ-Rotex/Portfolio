import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen preview modal with touch controls, instant video playback, and audio controls.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [resolution, setResolution] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setZoomed(false);
    setResolution('');
  }, [item]);

  // Attempt instant video playback on mount/change
  useEffect(() => {
    if (item?.type === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = false;
      setIsMuted(false);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to muted playback if browser policy blocks unmuted autoplay
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
    }
  }, [item]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      className="lightbox-modal active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="lightbox-close" onClick={onClose} title="Close (Esc)">
        ✕
      </button>
      <button
        className="lightbox-nav lightbox-prev"
        title="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
      >
        ‹
      </button>
      <button
        className="lightbox-nav lightbox-next"
        title="Next"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
      >
        ›
      </button>

      <div className="lightbox-content">
        <div
          className={`lightbox-media-container${zoomed ? ' zoom-original' : ''}`}
          ref={containerRef}
        >
          {item.type === 'video' ? (
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              controls
              playsInline
              autoPlay
              onLoadedMetadata={(e) =>
                setResolution(`Resolution: ${e.target.videoWidth} × ${e.target.videoHeight} px`)
              }
            />
          ) : (
            <img
              ref={imgRef}
              src={item.src}
              alt={item.alt || item.title}
              onLoad={(e) =>
                setResolution(`Resolution: ${e.target.naturalWidth} × ${e.target.naturalHeight} px`)
              }
            />
          )}
        </div>
        <div className="lightbox-info">
          <div className="lightbox-cat">{item.cat}</div>
          <div className="lightbox-title">{item.title}</div>
          <div className="lightbox-resolution">{resolution || 'Loading media...'}</div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem' }}>
            {item.type === 'video' && (
              <button
                className="lightbox-zoom-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                    setIsMuted(videoRef.current.muted);
                  }
                }}
              >
                {isMuted ? '🔇 Unmute Sound' : '🔊 Muted: Tap for Audio'}
              </button>
            )}
            <button
              className="lightbox-zoom-btn"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
            >
              🔍 {zoomed ? 'Fit to Screen' : 'View Original Resolution (1:1)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
