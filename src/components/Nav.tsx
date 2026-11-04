import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navIds } from '../data/site';
import { useLang } from '../i18n/useLang';
import { Bloom, Leaf, Marigold, Rose } from './decor/Flora';
import { Lantern } from './decor/Lantern';
import { ArrowIcon, CloseIcon, MenuIcon } from './ui/Icons';
import { LangToggle } from './ui/LangToggle';
import { ease } from './ui/motion';
import './Nav.css';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const links = navIds.map((id) => ({ href: `#${id}`, label: t.nav.links[id] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <div className="nav__inner container">
          <a href="#top" className="nav__brand" aria-label={t.nav.home}>
            <img src="/images/catrina-mark.webp" alt="" width={48} height={48} />
            <span className="nav__place">
              <span>{t.nav.place[0]}</span>
              <span>{t.nav.place[1]}</span>
            </span>
          </a>

          <nav aria-label={t.nav.main}>
            <ul className="nav__links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <LangToggle className="nav__lang" />

          <a href="#visit" className="btn nav__cta">
            {t.nav.findUs}
          </a>

          <button
            className="nav__toggle"
            aria-label={t.nav.open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu grain"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.dialog}
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mobile-menu__top container">
              <img src="/images/catrina-mark.webp" alt="" width={52} height={52} />
              <button className="nav__toggle nav__toggle--close" aria-label={t.nav.close} onClick={() => setOpen(false)} autoFocus>
                <CloseIcon />
              </button>
            </div>

            <ul className="mobile-menu__links container">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease }}
                >
                  <a href={l.href} onClick={() => setOpen(false)}>
                    <span className="mobile-menu__num">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mobile-menu__foot container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <p className="script">Bienvenidos</p>
              <div className="mobile-menu__actions">
                <a href="#visit" className="btn" onClick={() => setOpen(false)}>
                  {t.nav.findUs}
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </a>
                <LangToggle />
              </div>
            </motion.div>

            <Lantern className="mobile-menu__lantern" cord={160} width={74} delay={-1} />
            <Lantern className="mobile-menu__lantern mobile-menu__lantern--2" variant="tiered" cord={70} width={86} delay={-3} />

            <div className="mobile-menu__flora" aria-hidden="true">
              <Leaf size={130} style={{ position: 'absolute', right: 70, bottom: 40, rotate: '-30deg' }} />
              <Leaf size={110} style={{ position: 'absolute', right: -6, bottom: 120, rotate: '40deg' }} />
              <Rose size={130} style={{ position: 'absolute', right: -20, bottom: -24 }} />
              <Bloom size={92} style={{ position: 'absolute', right: 96, bottom: -18 }} />
              <Marigold size={70} style={{ position: 'absolute', right: 40, bottom: 92 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
