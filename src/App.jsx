import { useLenis } from './hooks/useLenis.js';
import { useIsTouchDevice } from './hooks/useIsTouchDevice.js';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Works from './components/Works/Works.jsx';
import Tools from './components/Tools.jsx';
import Stats from './components/Stats.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const isTouch = useIsTouchDevice();
  // Lenis (smooth-scroll) fights with native momentum scrolling on touch
  // devices and costs JS time for no benefit there, so it's skipped entirely.
  const lenisRef = useLenis(!isTouch);

  return (
    <>
      <ScrollProgress />
      {/* No mouse on touch devices — skip the cursor tracker and its rAF loop. */}
      {!isTouch && <CustomCursor />}
      <Nav lenisRef={lenisRef} />
      <Hero lenisRef={lenisRef} />
      <Marquee />
      <About />
      <Works />
      <Tools />
      <Stats />
      <Contact />
      <Footer />
    </>
  );
}
