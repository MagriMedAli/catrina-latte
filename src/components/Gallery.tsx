import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { site } from '../data/site';
import type { Strings } from '../i18n/strings';
import { useLang } from '../i18n/useLang';
import { Bloom, Marigold, Rose } from './decor/Flora';
import { ArrowIcon, CloseIcon, FlowerMark, InstagramIcon } from './ui/Icons';
import { ease } from './ui/motion';
import { Reveal } from './ui/Reveal';
import './Gallery.css';

type Tile = {
  area: string;
  key: keyof Strings['gallery']['tiles'];
  src: string;
  w: number;
  h: number;
};

/** To add photos: drop an optimised WebP in /public/images, add a tile + its caption in strings.ts. */
const TILES: Tile[] = [
  { area: 'a', key: 'interior', src: '/images/interior.webp', w: 765, h: 1020 },
  { area: 'b', key: 'neon', src: '/images/neon-catrina.webp', w: 960, h: 1280 },
  { area: 'c', key: 'storefront', src: '/images/storefront.webp', w: 670, h: 958 },
  { area: 'd', key: 'lanterns', src: '/images/interior-lanterns.webp', w: 640, h: 420 },
  { area: 'e', key: 'mural', src: '/images/interior-mural.webp', w: 465, h: 330 },
];

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (d: number) => void }) {
  const { t } = useLang();
  const tile = TILES[index];
  const [dir, setDir] = useState(0);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      onNav(d);
    },
    [onNav],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.tiles[tile.key].caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <button type="button" className="lightbox__close" aria-label={t.galleryExtra.close} onClick={onClose} autoFocus>
        <CloseIcon />
      </button>

      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={tile.src}
            src={tile.src}
            alt={t.gallery.tiles[tile.key].alt}
            className="lightbox__img"
            custom={dir}
            initial={{ opacity: 0, x: dir * 80, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -80, scale: 0.96 }}
            transition={{ duration: 0.45, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={onDragEnd}
          />
        </AnimatePresence>
      </div>

      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox__nav" aria-label={t.galleryExtra.prev} onClick={() => go(-1)}>
          <ArrowIcon style={{ rotate: '180deg' }} />
        </button>
        <p className="lightbox__caption">
          <span className="script">{t.gallery.tiles[tile.key].caption}</span>
          <span className="lightbox__count">
            {index + 1} {t.galleryExtra.of} {TILES.length}
          </span>
        </p>
        <button type="button" className="lightbox__nav" aria-label={t.galleryExtra.next} onClick={() => go(1)}>
          <ArrowIcon />
        </button>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const { t } = useLang();
  const g = t.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const nav = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + TILES.length) % TILES.length)), []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="gallery__head">
          <div>
            <Reveal>
              <p className="eyebrow gallery__eyebrow">
                <FlowerMark style={{ color: 'var(--coral)' }} />
                {g.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="gallery-title" className="section-title">
                {g.title[0]}
                <em>{g.title[1]}</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="gallery__intro">{g.intro}</p>
          </Reveal>
        </header>

        <div className="gallery__grid">
          {TILES.map((tile, i) => (
            <motion.figure
              key={tile.area}
              className={`gtile gtile--${tile.area}`}
              style={{ gridArea: tile.area }}
              initial={{ opacity: 0, y: 50, clipPath: 'inset(12% 0 0 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.1, ease, delay: (i % 3) * 0.1 }}
            >
              <button
                type="button"
                className="gtile__btn"
                data-cursor={t.cursor.view}
                aria-label={`${t.galleryExtra.view}: ${g.tiles[tile.key].caption}`}
                onClick={() => setOpen(i)}
              >
                <img src={tile.src} alt={g.tiles[tile.key].alt} width={tile.w} height={tile.h} loading="lazy" />
              </button>
              <figcaption>
                <span>{g.tiles[tile.key].caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <Reveal className="insta">
          <div className="insta__flora" aria-hidden="true">
            <Rose size={110} style={{ position: 'absolute', left: -30, top: -40 }} />
            <Marigold size={64} style={{ position: 'absolute', left: 60, top: -26 }} />
            <Bloom size={96} style={{ position: 'absolute', right: -24, bottom: -36 }} />
          </div>
          <span className="insta__icon">
            <InstagramIcon />
          </span>
          <div className="insta__copy">
            <h3>{t.galleryExtra.instaTitle}</h3>
            <p>{t.galleryExtra.instaText}</p>
          </div>
          <a
            href={site.instagram.href}
            className="btn insta__btn"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={t.cursor.go}
          >
            {t.galleryExtra.instaCta}
            <span className="btn-icon">
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  );
}
