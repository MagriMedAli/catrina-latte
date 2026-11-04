import { useEffect, useRef } from 'react';

const COLORS = ['#F39A39', '#F6B83C', '#E94F42', '#E88AA6', '#f7c56b'];

type Petal = { x: number; y: number; r: number; vy: number; sway: number; phase: number; rot: number; vr: number; c: string };

/**
 * Marigold petals drifting down — the cempasúchil petals of Día de los Muertos.
 * Lightweight canvas; pauses when off-screen and respects reduced motion.
 */
export function Petals({ count = 18, className = '' }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    // petals are soft shapes; full retina resolution only costs fill-rate
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const n = w < 600 ? Math.round(count * 0.55) : count;
    const spawn = (initial: boolean): Petal => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -20,
      r: 4 + Math.random() * 6,
      vy: 0.35 + Math.random() * 0.6,
      sway: 0.6 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.03,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
    const petals = Array.from({ length: n }, () => spawn(true));

    let raf = 0;
    let visible = true;
    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += Math.sin(t * 0.012 + p.phase) * p.sway * 0.4;
        p.rot += p.vr;
        if (p.y > h + 20) Object.assign(p, spawn(false));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // flip slightly as it tumbles
        ctx.scale(1, 0.55 + Math.abs(Math.sin(t * 0.02 + p.phase)) * 0.45);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
