import { useReveal } from '../hooks/useReveal';

const STATS = [
  { num: '27+', label: 'Projects Completed' },
  { num: '5+', label: 'Happy Clients' },
  { num: '∞', label: 'Passion to Create' },
];

export default function Stats() {
  const { ref, visible } = useReveal();

  return (
    <section
      className={`stats fade-in-section reveal-stagger${visible ? ' visible' : ''}`}
      ref={ref}
    >
      {STATS.map((s) => (
        <div className="stat-item" key={s.label}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
