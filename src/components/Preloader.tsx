import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLang } from '../i18n/useLang';
import { ease } from './ui/motion';
import './Preloader.css';

const SEEN_KEY = 'catrina-intro-seen';
const DURATION = 2600;

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Cinematic first-visit intro: a hand-drawn cup is sketched, fills with coffee,
 * the Catrina blooms in, then the curtain lifts. Shown once per browser session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !alreadySeen() && !reduce);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!show) {
      onDone();
      return;
    }
    // the intro always opens onto the hero, not wherever the browser restored to
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min((now - start) / (DURATION - 500), 1);
      setPct(Math.round(k * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => finish(), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage unavailable */
    }
    document.documentElement.style.overflow = '';
    setShow(false);
  };

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="loader grain"
          role="status"
          aria-label={t.intro.brewing}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader__stage">
            <svg className="loader__cup" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <clipPath id="loader-cup">
                  <path d="M44 78 H156 L146 150 Q100 172 54 150 Z" />
                </clipPath>
              </defs>
              {/* coffee rising inside the cup */}
              <g clipPath="url(#loader-cup)">
                <motion.g initial={{ y: 90 }} animate={{ y: 0 }} transition={{ duration: 1.5, ease, delay: 0.55 }}>
                  <rect x="30" y="84" width="140" height="100" fill="#7a4424" />
                  <path d="M30 84 q17 -8 35 0 t35 0 t35 0 t35 0 v10 H30Z" fill="#c98a55" />
                </motion.g>
              </g>
              {/* sketched outline */}
              <g fill="none" stroke="#FFF4E5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M44 78 H156 L146 150 Q100 172 54 150 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease }}
                />
                <motion.path
                  d="M156 92 c28 -4 30 36 -6 36"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.5 }}
                />
                <motion.path
                  d="M28 172 Q100 190 172 172"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.35 }}
                />
                {[80, 100, 120].map((x, i) => (
                  <motion.path
                    key={x}
                    d={`M${x} 64 q-8 -10 0 -20 q8 -10 0 -20`}
                    stroke="#F6B83C"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0.4] }}
                    transition={{ duration: 1.2, ease, delay: 1.2 + i * 0.12 }}
                  />
                ))}
              </g>
            </svg>

            <motion.img
              src="/images/catrina-mark.webp"
              alt=""
              className="loader__mark"
              width={96}
              height={96}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 1.55 }}
            />
          </div>

          <motion.p
            className="loader__label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="script">{t.intro.brewing}</span>
            <span className="loader__pct">{String(pct).padStart(3, '0')}%</span>
          </motion.p>

          <button type="button" className="loader__skip" onClick={finish}>
            {t.intro.skip}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
