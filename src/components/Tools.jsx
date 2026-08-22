import { useReveal } from '../hooks/useReveal';

const TOOLS = [
  { emoji: '🅰️', name: 'Adobe Illustrator' },
  { emoji: '🅿️', name: 'Adobe Photoshop' },
  { emoji: '🎬', name: 'Adobe Premiere Pro' },
  { emoji: '🖼', name: 'Figma' },
  { emoji: '🎨', name: 'Canva Pro' },
  { emoji: '🎞', name: 'After Effects' },
  { emoji: '🖌', name: 'Affinity Designer' },
];

export default function Tools() {
  const { ref, visible } = useReveal();

  return (
    <section className={`tools fade-in-section${visible ? ' visible' : ''}`} ref={ref}>
      <div className="section-label">
        <div className="label-line" />
        <span className="label-text">Tools I Use</span>
      </div>
      <div className="tools-inner reveal-stagger">
        {TOOLS.map((tool) => (
          <div className="tool-pill" key={tool.name}>
            <span className="tool-emoji">{tool.emoji}</span> {tool.name}
          </div>
        ))}
      </div>
    </section>
  );
}
