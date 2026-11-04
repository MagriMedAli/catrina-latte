import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Cursor.css';

/**
 * A marigold dot + trailing ring. The ring grows over interactive elements and
 * shows a short label for anything with a `data-cursor` attribute.
 * Only on devices with a precise pointer, and never with reduced motion.
 */
export function Cursor() {
  const [enabled] = useState(
    () =>
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle');
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: Event) => {
      const el = (e.target as Element).closest?.('[data-cursor], a, button, [role="tab"]');
      if (!el) return setMode('idle');
      const text = el.getAttribute('data-cursor');
      if (text) {
        setLabel(text);
        setMode('label');
      } else setMode('link');
    };
    const leave = () => setHidden(true);

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className={`cursor cursor--${mode} ${hidden ? 'is-hidden' : ''}`} aria-hidden="true">
      <motion.div className="cursor__ring" style={{ x: rx, y: ry }}>
        <span className="cursor__label">{mode === 'label' ? label : ''}</span>
      </motion.div>
      <motion.div className="cursor__dot" style={{ x, y }} />
    </div>
  );
}
