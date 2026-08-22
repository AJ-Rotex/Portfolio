import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import WorkCard from './WorkCard.jsx';
import Lightbox from './Lightbox.jsx';
import { works, filters } from '../../data/works.js';
import { useReveal } from '../../hooks/useReveal.js';
import './Works.css';

export default function Works() {
  const { ref, visible } = useReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const visibleWorks = useMemo(
    () => (activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter)),
    [activeFilter]
  );

  function openCard(item) {
    const idx = visibleWorks.findIndex((w) => w.id === item.id);
    if (idx !== -1) {
      setOpenIndex(idx);
    }
  }

  function navigate(delta) {
    setOpenIndex((i) => {
      if (i === null) return i;
      return (i + delta + visibleWorks.length) % visibleWorks.length;
    });
  }

  return (
    <section className={`works fade-in-section${visible ? ' visible' : ''}`} id="works" ref={ref}>
      <div className="works-header">
        <div>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <div className="label-line" />
            <span className="label-text">Portfolio Showcase</span>
          </div>
          <h2 className="works-title">
            Selected <span className="accent">Works</span>
          </h2>
        </div>
        <div className="works-filter">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
              data-filter={f.key}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="works-grid reveal-stagger">
        {visibleWorks.map((item) => (
          <WorkCard key={item.id} item={item} onOpen={openCard} />
        ))}
      </div>

      {openIndex !== null &&
        createPortal(
          <Lightbox
            items={visibleWorks}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={navigate}
          />,
          document.body
        )}
    </section>
  );
}
