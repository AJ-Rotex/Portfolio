export default function Hero({ lenisRef }) {
  function scrollToId(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <p className="hero-tag">✦ Available for Hire — Graphic Designer and Video Editor</p>
      <h1 className="hero-name">
        <span className="line1">Arshin</span>
        <span className="line2">Joseph</span>
        <span className="line3">Giril.</span>
      </h1>
      <p className="hero-sub">
        I craft bold visuals, brand identities, and digital experiences that make people stop
        scrolling. Fresher with a hunger to create work that matters.
      </p>
      <div className="hero-cta">
        <a href="#works" className="btn-primary" onClick={(e) => scrollToId(e, 'works')}>
          View My Work →
        </a>
        <a href="#contact" className="btn-ghost" onClick={(e) => scrollToId(e, 'contact')}>
          Let's Talk
        </a>
      </div>

      <div className="hero-deco">
        <div className="deco-ring deco-ring-1" />
        <div className="deco-ring deco-ring-2" />
        <div className="deco-ring deco-ring-3" />
        <div className="deco-center">Design</div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
