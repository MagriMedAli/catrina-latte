import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type PointerEvent } from 'react';
import { Bloom, Leaf, Marigold, Monstera, Rose, Sprig } from './decor/Flora';
import { Lantern } from './decor/Lantern';
import { Petals } from './decor/Petals';
import { Wave } from './decor/Wave';
import { ArrowIcon, FlowerMark } from './ui/Icons';
import { ease } from './ui/motion';
import { OpenBadge } from './ui/OpenBadge';
import { useLang } from '../i18n/useLang';
import './Hero.css';

const pop = (delay: number) => ({
  initial: { scale: 0, rotate: -50, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  transition: { type: 'spring' as const, stiffness: 120, damping: 14, delay },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const floraY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const leafY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // pointer depth: each layer drifts a different amount, like looking into the room
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const deep = { x: useTransform(mx, (v) => v * 28), y: useTransform(my, (v) => v * 18) };
  const mid = { x: useTransform(mx, (v) => v * -14), y: useTransform(my, (v) => v * -10) };
  const near = { x: useTransform(mx, (v) => v * -30), y: useTransform(my, (v) => v * -20) };
  const archTiltY = useTransform(mx, (v) => v * 6);
  const archTiltX = useTransform(my, (v) => v * -5);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      className="hero grain"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Petals className="hero__petals" />

      {/* mural-like foliage */}
      <motion.div className="hero__foliage" style={{ y: leafY, x: deep.x }} aria-hidden="true">
        <Monstera className="hero__monstera hero__monstera--1" size={520} />
        <Monstera className="hero__monstera hero__monstera--2" size={380} color="#0a7076" />
        <Monstera className="hero__monstera hero__monstera--3" size={300} />
      </motion.div>

      {/* woven pendant lights */}
      <motion.div className="hero__lanterns" style={{ x: mid.x }} aria-hidden="true">
        <Lantern className="hero__lantern hero__lantern--1" cord={70} width={78} delay={-1.2} />
        <Lantern className="hero__lantern hero__lantern--2" cord={150} width={64} delay={-3} />
        <Lantern className="hero__lantern hero__lantern--3" variant="tiered" cord={40} width={110} delay={-0.4} />
        <Lantern className="hero__lantern hero__lantern--4" cord={110} width={58} delay={-2.2} />
      </motion.div>

      <div className="hero__grid container">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p
            className="eyebrow hero__eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <FlowerMark style={{ color: 'var(--coral)' }} />
            {t.hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="hero__title">
            <span className="sr-only">Catrina Latte — </span>
            <span className="hero__line">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.3 }}>
                {t.hero.line1}
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.42 }}>
                <em>{t.hero.line2}</em>
              </motion.span>
            </span>
            <motion.span
              className="hero__script script"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 -10% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 1 }}
            >
              {t.hero.script}
            </motion.span>
          </h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.1 }}
          >
            {t.hero.lede}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.25 }}
          >
            <a href="#menu" className="btn">
              {t.hero.ctaMenu}
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </a>
            <a href="#visit" className="btn btn--ghost">
              {t.hero.ctaFind}
            </a>
          </motion.div>

          <motion.div
            className="hero__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <OpenBadge />
          </motion.div>
        </motion.div>

        <div className="hero__visual">
          <motion.div
            className="hero__arch-shadow"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.5 }}
            aria-hidden="true"
          />
          <motion.div
            className="hero__arch"
            style={{ y: logoY, rotateY: archTiltY, rotateX: archTiltX, transformPerspective: 900 }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.25 }}
          >
            <img
              src="/images/catrina-logo.webp"
              srcSet="/images/catrina-logo-sm.webp 520w, /images/catrina-logo.webp 900w"
              sizes="(max-width: 860px) 70vw, 420px"
              alt={t.hero.logoAlt}
              width={900}
              height={1199}
              fetchPriority="high"
            />
          </motion.div>

          <motion.div className="hero__flora" style={{ y: floraY, x: near.x }} aria-hidden="true">
            <motion.div className="hf hf--sprig" {...pop(1.0)}>
              <Sprig size={190} />
            </motion.div>
            <motion.div className="hf hf--leaf1" {...pop(1.05)}>
              <Leaf size={120} />
            </motion.div>
            <motion.div className="hf hf--leaf2" {...pop(1.1)}>
              <Leaf size={100} color="#4c7a52" />
            </motion.div>
            <motion.div className="hf hf--rose" {...pop(1.15)}>
              <Rose size={150} />
            </motion.div>
            <motion.div className="hf hf--marigold" {...pop(1.3)}>
              <Marigold size={92} />
            </motion.div>
            <motion.div className="hf hf--purple" {...pop(1.25)}>
              <Bloom size={118} />
            </motion.div>
            <motion.div className="hf hf--blue" {...pop(1.4)}>
              <Bloom size={58} petals={7} color="#1f8fae" inner="#5bb7cf" width={0.5} />
            </motion.div>
            <motion.div className="hf hf--leaf3" {...pop(1.2)}>
              <Leaf size={90} />
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 1.5 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 120 120" className="hero__badge-ring">
              <defs>
                <path id="badge-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
              </defs>
              <text>
                <textPath href="#badge-circle" startOffset="0">
                  café · dulces · buenos momentos ·
                </textPath>
              </text>
            </svg>
            <Marigold size={44} className="hero__badge-flower" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>{t.hero.scroll}</span>
        <i />
      </motion.a>

      <Wave fill="var(--cream)" variant={1} />
    </section>
  );
}
