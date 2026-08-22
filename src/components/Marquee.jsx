const ITEMS = [
  'Brand Identity',
  'UI/UX Design',
  'Typography',
  'Motion Graphics',
  'Poster Design',
  'Social Media',
  'Illustration',
  'Print Design',
];

// Rendered twice back-to-back so the CSS animation (translateX -50%) loops seamlessly.
const DOUBLED = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {DOUBLED.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
