import { useEffect, useRef, useState } from 'react';

/**
<<<<<<< HEAD
 * Full-screen preview modal with touch controls and media info.
=======
 * Full-screen preview modal. Loaded lazily (see Works.jsx) so its code
 * doesn't add to the initial bundle — most visitors may never open it.
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [resolution, setResolution] = useState('');
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
    setResolution('');
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
<<<<<<< HEAD
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
=======
    <div className="lightbox-modal active" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <button className="lightbox-close" onClick={onClose} title="Close (Esc)">✕</button>
      <button
        className="lightbox-nav lightbox-prev"
        title="Previous"
        onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
      >
        ‹
      </button>
      <button
        className="lightbox-nav lightbox-next"
        title="Next"
<<<<<<< HEAD
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
=======
        onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
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
<<<<<<< HEAD
              poster={item.poster}
              controls
              playsInline
              autoPlay
              muted
=======
              controls
              playsInline
              autoPlay
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
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
<<<<<<< HEAD
          <div className="lightbox-resolution">{resolution || 'Loading media...'}</div>
          <button
            className="lightbox-zoom-btn"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
          >
=======
          <div className="lightbox-resolution">{resolution || '0 × 0 px'}</div>
          <button className="lightbox-zoom-btn" onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}>
>>>>>>> c509cc8331c463257c61a71435b6aae3fe43567b
            🔍 {zoomed ? 'Fit to Screen' : 'View Original Resolution (1:1)'}
          </button>
        </div>
      </div>
    </div>
  );
}
