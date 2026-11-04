import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, type ComponentType, type PointerEvent } from 'react';
import type { Text } from '../data/menu';
import { useLang } from '../i18n/useLang';
import {
  Affogato,
  BasqueCheesecake,
  Cappuccino,
  HotChocolate,
  MintMojito,
  ParadiseCocktail,
  PistachioLatte,
  Tiramisu,
} from './decor/Drinks';
import { PapelPicado } from './decor/PapelPicado';
import { Wave } from './decor/Wave';
import { ArrowIcon, FlowerMark } from './ui/Icons';
import { ease } from './ui/motion';
import { Reveal } from './ui/Reveal';
import './Loteria.css';

type Card = {
  n: number;
  name: string;
  item: Text;
  category: Text;
  desc: Text;
  price: number;
  color: string;
  Art: ComponentType<{ className?: string }>;
};

const t = (fr: string, en: string): Text => ({ fr, en });

/** Real menu items, styled as Mexican Lotería cards. */
const CARDS: Card[] = [
  {
    n: 1, name: 'El Café', item: t('Cappuccino', 'Cappuccino'), category: t('Cafés', 'Coffee'),
    desc: t('Expresso, lait chaud et une mousse épaisse et soyeuse.', 'Espresso, steamed milk and a deep, silky foam.'),
    price: 5.8, color: '#E94F42', Art: Cappuccino,
  },
  {
    n: 2, name: 'La Pistacha', item: t('Pistachio Latte', 'Pistachio Latte'), category: t('Café latte', 'Café latte'),
    desc: t('Le latte le plus vert de la maison, onctueux et gourmand.', 'The greenest latte in the house — smooth and indulgent.'),
    price: 8.5, color: '#315B3D', Art: PistachioLatte,
  },
  {
    n: 3, name: 'El Mojito Azul', item: t('Mint Blue Mojito', 'Mint Blue Mojito'), category: t('Mojitos', 'Mojitos'),
    desc: t('Menthe fraîche, citron vert et un bleu qui rappelle nos murs.', 'Fresh mint, lime and a blue that matches our walls.'),
    price: 9.5, color: '#087F83', Art: MintMojito,
  },
  {
    n: 4, name: 'La Vasca', item: t('San Sebastián pistache', 'Pistachio San Sebastián'), category: t('Douceurs', 'Sweets'),
    desc: t('Le cheesecake basque au dessus brûlé, nappé de pistache.', 'Burnt-top Basque cheesecake, finished with pistachio.'),
    price: 12.5, color: '#F39A39', Art: BasqueCheesecake,
  },
  {
    n: 5, name: 'El Tiramisú', item: t('Tiramisu Nutella Oreo', 'Tiramisu Nutella Oreo'), category: t('Tiramisu', 'Tiramisu'),
    desc: t('Couches de mascarpone, Nutella et Oreo, saupoudrées de cacao.', 'Layers of mascarpone, Nutella and Oreo under a dusting of cocoa.'),
    price: 8.5, color: '#70418B', Art: Tiramisu,
  },
  {
    n: 6, name: 'El Paraíso', item: t('Cocktail Paradise', 'Paradise cocktail'), category: t('Cocktails', 'Cocktails'),
    desc: t('Orange, citron et curaçao bleu — un coucher de soleil dans un verre.', 'Orange, lemon and blue curaçao — a sunset in a glass.'),
    price: 12, color: '#d9667f', Art: ParadiseCocktail,
  },
  {
    n: 7, name: 'El Affogato', item: t('Affogato', 'Affogato'), category: t('Cafés', 'Coffee'),
    desc: t('Une boule de glace vanille noyée dans un expresso chaud.', 'A scoop of vanilla ice cream drowned in hot espresso.'),
    price: 4.4, color: '#075B61', Art: Affogato,
  },
  {
    n: 8, name: 'La Chocolatera', item: t('Chocolat Nutella Spéculoos', 'Nutella Spéculoos chocolate'),
    category: t('Chocolat chaud / glacé', 'Hot / iced chocolate'),
    desc: t('Chaud ou glacé, le plus gourmand de nos chocolats.', 'Hot or iced — our most indulgent chocolate.'),
    price: 12.5, color: '#b8452f', Art: HotChocolate,
  },
];

function LoteriaCard({ card, index }: { card: Card; index: number }) {
  const { t: s, lang } = useLang();
  const [flipped, setFlipped] = useState(false);

  // pointer-driven 3D tilt + glare
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 180, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const price = new Intl.NumberFormat(lang === 'fr' ? 'fr-TN' : 'en-GB', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(card.price);

  return (
    <motion.li
      className="lcard"
      style={{ ['--card' as string]: card.color }}
      initial={{ opacity: 0, y: 80, rotate: index % 2 ? 8 : -8 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 1.5 : -1.5 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease, delay: (index % 4) * 0.09 }}
    >
      <motion.button
        type="button"
        className="lcard__btn"
        data-cursor={s.cursor.flip}
        aria-pressed={flipped}
        aria-label={`${card.name} — ${card.item[lang]}. ${flipped ? s.loteria.back : s.loteria.flip}`}
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry }}
      >
        <motion.div
          className="lcard__inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="lcard__face lcard__front">
            <span className="lcard__num">{card.n}</span>
            <div className="lcard__art">
              <card.Art />
            </div>
            <p className="lcard__name">{card.name}</p>
            <motion.span className="lcard__glare" style={{ ['--gx' as string]: gx, ['--gy' as string]: gy }} />
          </div>

          <div className="lcard__face lcard__back" aria-hidden={!flipped}>
            <span className="lcard__from">
              {s.loteria.from} · {card.category[lang]}
            </span>
            <h3 className="lcard__item">{card.item[lang]}</h3>
            <p className="lcard__desc">{card.desc[lang]}</p>
            <p className="lcard__price">
              {price}
              <small> DT</small>
            </p>
            <span className="lcard__n">N.º {card.n}</span>
          </div>
        </motion.div>
      </motion.button>
    </motion.li>
  );
}

export function Loteria() {
  const { t: s } = useLang();
  return (
    <section id="signatures" className="loteria" aria-labelledby="loteria-title">
      <Wave fill="#0f1030" position="top" variant={3} />
      <PapelPicado className="loteria__papel" count={14} />

      <div className="container">
        <header className="loteria__head">
          <Reveal>
            <p className="eyebrow loteria__eyebrow">
              <FlowerMark style={{ color: 'var(--coral)' }} />
              {s.loteria.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="loteria-title" className="section-title">
              {s.loteria.title[0]}
              <em>{s.loteria.title[1]}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="loteria__intro">{s.loteria.intro}</p>
          </Reveal>
        </header>

        <ul className="loteria__deck">
          {CARDS.map((card, i) => (
            <LoteriaCard key={card.n} card={card} index={i} />
          ))}
        </ul>

        <Reveal className="loteria__cta">
          <a href="#menu" className="btn btn--navy">
            {s.loteria.cta}
            <span className="btn-icon">
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
