import { AnimatePresence, motion } from 'framer-motion';
import { useState, type KeyboardEvent } from 'react';
import { menu, type MenuItem, type MenuSection } from '../data/menu';
import type { Lang } from '../i18n/strings';
import { useLang } from '../i18n/useLang';
import { Bloom, Leaf, Marigold, Monstera, Rose } from './decor/Flora';
import { PapelPicado } from './decor/PapelPicado';
import { Wave } from './decor/Wave';
import { ArrowIcon, FlowerMark } from './ui/Icons';
import { ease } from './ui/motion';
import { Reveal } from './ui/Reveal';
import './Menu.css';

const itemName = (item: MenuItem, lang: Lang) => (typeof item.name === 'string' ? item.name : item.name[lang]);

const formatPrice = (price: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'fr' ? 'fr-TN' : 'en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(price);

export function Menu() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<MenuSection['id']>('coffee');
  const section = menu.find((s) => s.id === active)!;

  // arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = menu[(i + (e.key === 'ArrowRight' ? 1 : menu.length - 1)) % menu.length];
    setActive(next.id);
    document.getElementById(`menu-tab-${next.id}`)?.focus();
  };

  return (
    <section id="menu" className="menu grain" aria-labelledby="menu-title">
      <Wave fill="var(--cream)" position="top" variant={2} />
      <PapelPicado className="menu__papel" count={16} string="#FFF4E5" />

      <Monstera className="menu__leaf menu__leaf--l" size={460} color="#064d52" />
      <Monstera className="menu__leaf menu__leaf--r" size={400} color="#064d52" />

      <div className="container">
        <header className="menu__head">
          <Reveal>
            <p className="eyebrow menu__eyebrow">
              <FlowerMark style={{ color: 'var(--marigold)' }} />
              {t.menu.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="menu-title" className="section-title menu__title">
              {t.menu.title}
              <span className="script menu__title-script">{t.menu.script}</span>
            </h2>
          </Reveal>
        </header>

        <Reveal delay={0.12}>
          <div className="menu__tabs" role="tablist" aria-label={t.menu.tabs}>
            {menu.map((s, i) => (
              <button
                key={s.id}
                id={`menu-tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={active === s.id}
                aria-controls="menu-panel"
                tabIndex={active === s.id ? 0 : -1}
                className={`menu__tab ${active === s.id ? 'is-active' : ''}`}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {active === s.id && (
                  <motion.span layoutId="menu-tab-pill" className="menu__tab-pill" transition={{ duration: 0.5, ease }} />
                )}
                <span className="menu__tab-label">{s.label[lang]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          className="menu__sheet"
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.4 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="menu__flora menu__flora--tl" aria-hidden="true">
            <Leaf size={110} style={{ position: 'absolute', left: 64, top: -50, rotate: '35deg' }} />
            <Leaf size={100} color="#4c7a52" style={{ position: 'absolute', left: -48, top: 62, rotate: '-70deg' }} />
            <Rose size={130} style={{ position: 'absolute', left: -40, top: -46 }} />
            <Marigold size={70} style={{ position: 'absolute', left: 70, top: 30 }} />
          </div>
          <div className="menu__flora menu__flora--br" aria-hidden="true">
            <Leaf size={110} style={{ position: 'absolute', right: 70, bottom: -40, rotate: '-150deg' }} />
            <Bloom size={120} style={{ position: 'absolute', right: -44, bottom: -40 }} />
            <Bloom
              size={60}
              petals={7}
              color="#1f8fae"
              inner="#5bb7cf"
              width={0.5}
              style={{ position: 'absolute', right: 66, bottom: 40 }}
            />
          </div>

          <div className="menu__inner">
            <div className="menu__sheet-head">
              <img src="/images/catrina-logo-sm.webp" alt="Catrina Latte" width={520} height={693} loading="lazy" />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                id="menu-panel"
                role="tabpanel"
                aria-labelledby={`menu-tab-${active}`}
                className="menu__cols"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                {section.categories.map((cat) => (
                  <div key={cat.id} className="menu__cat">
                    <h3 className="menu__cat-title">
                      <span className="script" aria-hidden="true">
                        {cat.script}
                      </span>
                      <span className="menu__cat-name">{cat.title[lang]}</span>
                    </h3>
                    <ul>
                      {cat.items.map((item) => (
                        <li key={itemName(item, 'fr')} className="menu__item">
                          <div className="menu__row">
                            <span className="menu__name">{itemName(item, lang)}</span>
                            <span className="menu__dots" aria-hidden="true" />
                            <span className="menu__price">
                              {formatPrice(item.price, lang)} <small>{t.menu.currency}</small>
                            </span>
                          </div>
                          {item.note && <p className="menu__note">{item.note[lang]}</p>}
                        </li>
                      ))}
                    </ul>
                    {cat.note && <p className="menu__cat-note">{cat.note[lang]}</p>}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <p className="menu__fineprint">{t.menu.pricesNote}</p>
          </div>
        </motion.div>

        <Reveal className="menu__after">
          <p>
            {t.menu.after}
            <span className="script">te esperamos.</span>
          </p>
          <a href="#visit" className="btn btn--ghost">
            {t.menu.cta}
            <span className="btn-icon">
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
      </div>

      <Wave fill="var(--ivory)" variant={3} />
    </section>
  );
}
