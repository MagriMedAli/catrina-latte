import { MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { About } from './components/About';
import { DaySection } from './components/DaySection';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Loteria } from './components/Loteria';
import { Marquee } from './components/Marquee';
import { Menu } from './components/Menu';
import { Nav } from './components/Nav';
import { Preloader } from './components/Preloader';
import { Visit } from './components/Visit';
import { Cursor } from './components/ui/Cursor';
import { LangProvider } from './i18n/LangProvider';
import { useLang } from './i18n/useLang';

function Page() {
  const { t } = useLang();
  // the hero remounts once the intro curtain lifts, so its entrance plays in view
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
      <Preloader onDone={() => setIntroDone(true)} />
      <Cursor />
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Nav />
      <main id="main">
        <Hero key={introDone ? 'live' : 'waiting'} />
        <Marquee />
        <About />
        <DaySection />
        <Loteria />
        <Menu />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <Page />
      </MotionConfig>
    </LangProvider>
  );
}
