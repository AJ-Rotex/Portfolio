import { useReveal } from '../hooks/useReveal';

const SKILLS = [
  { icon: '🎨', name: 'Brand Design', desc: 'Logos, identity systems, style guides' },
  { icon: '🖼', name: 'Visual Design', desc: 'Posters, layouts, editorial graphics' },
  { icon: '📱', name: 'UI Design', desc: 'App screens, web mockups, UX thinking' },
  { icon: '✍️', name: 'Typography', desc: 'Type hierarchy, custom lettering' },
  { icon: '📸', name: 'Photo Editing', desc: 'Retouching, compositing, color grading' },
  { icon: '🎬', name: 'Video Editing', desc: 'Creating cinematic videos' },
];

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section className={`about fade-in-section${visible ? ' visible' : ''}`} id="about" ref={ref}>
      <div>
        <div className="section-label">
          <div className="label-line" />
          <span className="label-text">About Me</span>
        </div>
        <h2 className="about-heading">A designer who thinks with heart & executes with precision.</h2>
        <p className="about-text">
          Hi, I'm Arshin — a passionate graphic designer fresh out of school and ready to create. I
          believe great design isn't just about aesthetics; it's about solving real problems with the
          right visual language.
        </p>
        <p className="about-text">
          I'm eager to grow, collaborate, and contribute to teams that push creative boundaries. From
          bold brand identities to clean digital layouts, I bring enthusiasm and attention to detail to
          every project.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a
            href="https://docs.google.com/document/d/1uCCnFJL389r7D-reQKcKVVXK-sqGKWvS/edit?usp=sharing&ouid=108365193982430384413&rtpof=true&sd=true"
            className="btn-primary"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex' }}
          >
            Download CV ↓
          </a>
        </div>
      </div>
      <div>
        <div className="section-label">
          <div className="label-line" />
          <span className="label-text">My Skills</span>
        </div>
        <div className="skills-grid reveal-stagger">
          {SKILLS.map((skill) => (
            <div className="skill-card" key={skill.name}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-desc">{skill.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
