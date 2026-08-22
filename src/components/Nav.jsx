export default function Nav({ lenisRef }) {
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
    <nav>
      <a href="#home" className="nav-logo" onClick={(e) => scrollToId(e, 'home')}>
        AJ<span>G</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#about" onClick={(e) => scrollToId(e, 'about')}>About</a>
        </li>
        <li>
          <a href="#works" onClick={(e) => scrollToId(e, 'works')}>Works</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => scrollToId(e, 'contact')}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}
