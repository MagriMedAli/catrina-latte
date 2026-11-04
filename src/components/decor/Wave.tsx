import './decor.css';

type WaveProps = {
  /** Colour of the shape — usually the neighbouring section's background. */
  fill: string;
  position?: 'top' | 'bottom';
  variant?: 1 | 2 | 3;
};

const PATHS = {
  1: 'M0 64 C 180 10 360 10 540 46 C 720 82 900 96 1080 60 C 1260 24 1350 30 1440 48 V150 H0Z',
  2: 'M0 40 C 240 100 420 110 720 70 C 1020 30 1200 20 1440 74 V150 H0Z',
  3: 'M0 80 C 160 80 220 30 360 30 C 520 30 560 90 720 90 C 880 90 920 24 1080 24 C 1240 24 1300 76 1440 76 V150 H0Z',
};

/** Soft organic curve used to blend one section into the next. */
export function Wave({ fill, position = 'bottom', variant = 1 }: WaveProps) {
  return (
    <svg
      className={`wave wave--${position}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={position === 'top' ? { transform: 'scale(-1, -1)' } : undefined}
    >
      <path d={PATHS[variant]} fill={fill} />
    </svg>
  );
}
