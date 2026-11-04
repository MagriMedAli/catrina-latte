import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef, useState, type ComponentType } from 'react';
import type { Text } from '../data/menu';
import type { Lang } from '../i18n/strings';
import { useLang } from '../i18n/useLang';
import { Espresso, HotChocolate, MintMojito, Tiramisu } from './decor/Drinks';
import { Wave } from './decor/Wave';
import { ArrowIcon, FlowerMark } from './ui/Icons';
import './DaySection.css';

type Pick = { name: string | Text; price: number };
type Moment = { time: string; Art: ComponentType<{ className?: string }>; picks: Pick[] };

const t = (fr: string, en: string): Text => ({ fr, en });

/** Real menu suggestions for each moment of the café's opening hours. */
const MOMENTS: Moment[] = [
  {
    time: '07:00',
    Art: Espresso,
    picks: [
      { name: 'Expresso', price: 3.2 },
      { name: 'Capucin', price: 3.4 },
      { name: 'Café crème', price: 3.8 },
    ],
  },
  {
    time: '14:00',
    Art: Tiramisu,
    picks: [
      { name: t('Cheesecake pistache', 'Pistachio cheesecake'), price: 9.5 },
      { name: t('Fondant chocolat', 'Chocolate fondant'), price: 7.5 },
      { name: 'Tiramisu Spéculoos', price: 7.5 },
    ],
  },
  {
    time: '18:30',
    Art: MintMojito,
    picks: [
      { name: 'Virgin Mojito', price: 8.5 },
      { name: 'Strawberry Mojito', price: 9.5 },
      { name: t('Cocktail Tropical', 'Tropical cocktail'), price: 13.5 },
    ],
  },
  {
    time: '23:00',
    Art: HotChocolate,
    picks: [
      { name: 'Spanish Latte', price: 8.0 },
      { name: t('Chocolat Nutella', 'Nutella hot chocolate'), price: 8.5 },
      { name: 'San Sebastián Nutella', price: 11.5 },
    ],
  },
];

// scroll progress → which panel is in view; each panel "dwells" before sliding on
const STOPS = [0, 0.2, 0.3, 0.45, 0.55, 0.7, 0.8, 1];
const PANEL = [0, 0, 1, 1, 2, 2, 3, 3];
/** Scroll progress where each panel sits centred (used by the timeline buttons). */
const PANEL_CENTER = [0.1, 0.375, 0.625, 0.9];

/** Piecewise-linear panel index for a scroll progress value. */
function panelAt(v: number) {
  for (let i = 1; i < STOPS.length; i++) {
    if (v <= STOPS[i]) {
      const k = (v - STOPS[i - 1]) / (STOPS[i] - STOPS[i - 1]);
      return PANEL[i - 1] + (PANEL[i] - PANEL[i - 1]) * Math.max(0, k);
    }
  }
  return PANEL[PANEL.length - 1];
}
// sky palettes anchored to where each panel rests: morning, afternoon, golden hour, dusk, night
const SKY_AT = [0.1, 0.375, 0.625, 0.75, 0.88];

const pickName = (p: Pick, lang: Lang) => (typeof p.name === 'string' ? p.name : p.name[lang]);
const fmt = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'fr' ? 'fr-TN' : 'en-GB', { minimumFractionDigits: 1 }).format(n);

/** 07:00 → 01:00 across the scroll, rounded to 15 minutes. */
function clockAt(p: number) {
  const mins = Math.round((7 * 60 + p * 18 * 60) / 15) * 15;
  const h = Math.floor(mins / 60) % 24;
  return `${String(h).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}

// [top, middle, bottom] of each sky, plus the hills colour beneath it
const SKIES = [
  ['#FFC98F', '#FFE3BF', '#FFF4E5', '#9cc4a0'],
  ['#8fd8cf', '#c9efe8', '#eef9f5', '#6fae95'],
  ['#EE7A4C', '#F6B060', '#FFD58C', '#c9733f'],
  ['#2a2050', '#6b3d6e', '#c4604c', '#3b2a4a'],
  ['#0b0c22', '#16173a', '#1d1e45', '#0f1030'],
];
const HILLS_PATH =
  'M0 140 C 160 90 300 110 420 130 C 560 152 660 92 820 96 C 980 100 1080 150 1220 138 C 1320 130 1390 110 1440 112 V220 H0Z';

/**
 * One pre-painted sky that fades in over the previous one. Cross-fading opacity
 * runs on the compositor, unlike repainting a full-screen gradient every frame.
 */
function SkyLayer({ p, i }: { p: MotionValue<number>; i: number }) {
  const opacity = useTransform(p, [SKY_AT[i - 1] ?? 0, SKY_AT[i] ?? 0], i === 0 ? [1, 1] : [0, 1]);
  const [top, mid, bottom, hills] = SKIES[i];
  return (
    <motion.div className="day__layer" style={{ opacity }}>
      <div className="day__gradient" style={{ background: `linear-gradient(to bottom, ${top} 0%, ${mid} 55%, ${bottom} 100%)` }} />
      <svg className="day__hills" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <path fill={hills} d={HILLS_PATH} />
      </svg>
    </motion.div>
  );
}

function Sky({ p }: { p: MotionValue<number> }) {

  // sun arcs across the sky, then the moon rises
  const sunX = useTransform(p, [0, 0.72], ['38vw', '60vw']);
  const sunY = useTransform(p, (v) => `${46 - Math.sin(Math.min(v / 0.72, 1) * Math.PI) * 34}vh`);
  const sunOpacity = useTransform(p, [0.6, 0.72], [1, 0]);
  const moonX = useTransform(p, [0.68, 1], ['44vw', '54vw']);
  const moonY = useTransform(p, [0.68, 1], ['44vh', '14vh']);
  const moonOpacity = useTransform(p, [0.66, 0.8], [0, 1]);
  const stars = useTransform(p, [0.66, 0.85], [0, 1]);

  return (
    <div className="day__sky" aria-hidden="true">
      {SKIES.map((_, i) => (
        <SkyLayer key={i} p={p} i={i} />
      ))}
      <motion.div className="day__stars" style={{ opacity: stars }} />
      <motion.div className="day__sun" style={{ x: sunX, y: sunY, opacity: sunOpacity }} />
      <motion.div className="day__moon" style={{ x: moonX, y: moonY, opacity: moonOpacity }} />
    </div>
  );
}

export function DaySection() {
  const { t: s, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(p, (v) => `${-panelAt(v) * 100}vw`);
  const ink = useTransform(p, [0, 0.72, 0.77, 1], ['#17172F', '#17172F', '#FFF4E5', '#FFF4E5']);
  // the clock is written straight to the DOM; only the active label re-renders React (4 times)
  const clock = useTransform(p, clockAt);
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, 'change', (v) => {
    const next = Math.round(panelAt(v));
    setActive((cur) => (cur === next ? cur : next));
  });

  /** Scroll to a point of the day (0 = 07:00, 1 = 01:00). */
  const goTo = (progress: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + progress * (el.offsetHeight - window.innerHeight), behavior: 'smooth' });
  };
  /** Leave the story entirely and land on the next section. */
  const skip = () => {
    // target the next section itself rather than a pixel offset: iOS Safari's
    // collapsing toolbar changes the viewport height mid-scroll
    const next = ref.current?.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={ref} className="day" aria-labelledby="day-title">
      <Wave fill="var(--cream)" position="top" variant={1} />
      <div className="day__sticky">
        <Sky p={p} />

        <motion.div className="day__ui" style={{ color: ink }}>
          <div className="day__top container">
            <div>
              <p className="eyebrow day__eyebrow">
                <FlowerMark style={{ color: 'var(--coral)' }} />
                {s.day.eyebrow}
              </p>
              <h2 id="day-title" className="day__title">
                {s.day.title}
              </h2>
              <button type="button" className="day__skip" onClick={skip}>
                {s.day.skip}
                <ArrowIcon style={{ rotate: '90deg' }} />
              </button>
            </div>
            <motion.p className="day__clock" aria-hidden="true">
              {clock}
            </motion.p>
          </div>

          <motion.div className="day__track" style={{ x }}>
            {MOMENTS.map((m, i) => {
              const copy = s.day.moments[i];
              return (
                <article key={m.time} className="day__panel" aria-label={`${m.time} — ${copy.title}`}>
                  <div className="day__panel-inner container">
                    <div className="day__copy">
                      <span className="day__time">{m.time}</span>
                      <p className="script day__script">{copy.script}</p>
                      <h3 className="day__panel-title">{copy.title}</h3>
                      <p className="day__text">{copy.text}</p>
                      <div className="day__picks">
                        <span className="day__picks-label">{s.day.picks}</span>
                        <ul>
                          {m.picks.map((pk) => (
                            <li key={pickName(pk, 'fr')}>
                              <span>{pickName(pk, lang)}</span>
                              <span className="day__picks-dots" aria-hidden="true" />
                              <span className="day__picks-price">{fmt(pk.price, lang)} DT</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {i === MOMENTS.length - 1 && <p className="day__closing">{s.day.closing}</p>}
                    </div>
                    <div className="day__art">
                      <span className="day__halo" />
                      <m.Art className="day__drink" />
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>

          <div className="day__progress container">
            <div className="day__bar" aria-hidden="true">
              <motion.span style={{ scaleX: p }} />
            </div>
            <ol>
              {MOMENTS.map((m, i) => (
                <li key={m.time}>
                  <button
                    type="button"
                    className={i === active ? 'is-active' : ''}
                    aria-current={i === active ? 'step' : undefined}
                    aria-label={`${s.day.jump} ${m.time}`}
                    onClick={() => goTo(PANEL_CENTER[i])}
                  >
                    {m.time}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" aria-label={s.day.skip} onClick={skip}>
                  01:00
                </button>
              </li>
            </ol>
            <p className="day__hint">{s.day.hint}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
