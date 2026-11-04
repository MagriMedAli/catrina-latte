/**
 * Woven rattan pendant lights, as they hang from the café's botanical ceiling.
 */
import { useId, type CSSProperties } from 'react';
import './decor.css';

type LanternProps = {
  variant?: 'ball' | 'tiered';
  cord?: number;
  width?: number;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

export function Lantern({ variant = 'ball', cord = 120, width = 90, className = '', style, delay = 0 }: LanternProps) {
  const id = useId().replace(/:/g, '');
  const bodyH = variant === 'ball' ? 100 : 92;
  const h = cord + bodyH;

  return (
    <div
      className={`lantern ${className}`}
      style={{ ...style, width, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <span className="lantern__glow" style={{ top: cord + bodyH * 0.45 }} />
      <svg viewBox={`0 0 100 ${h}`} width={width} height={(h * width) / 100}>
        <defs>
          <radialGradient id={`lg-${id}`} cx="50%" cy="55%" r="60%">
            <stop offset="0" stopColor="#FFF3C4" />
            <stop offset="0.45" stopColor="#FFC45A" />
            <stop offset="1" stopColor="#D9731F" />
          </radialGradient>
          <clipPath id={`lc-${id}`}>
            {variant === 'ball' ? (
              <ellipse cx="50" cy={cord + 52} rx="44" ry="46" />
            ) : (
              <path d={tieredPath(cord)} />
            )}
          </clipPath>
        </defs>

        <line x1="50" y1="0" x2="50" y2={cord + 6} stroke="#2a1d14" strokeWidth="1.4" />
        <rect x="44" y={cord} width="12" height="8" rx="2" fill="#3a2a1c" />

        {variant === 'ball' ? (
          <ellipse cx="50" cy={cord + 52} rx="44" ry="46" fill={`url(#lg-${id})`} />
        ) : (
          <path d={tieredPath(cord)} fill={`url(#lg-${id})`} />
        )}

        {/* weave */}
        <g clipPath={`url(#lc-${id})`} stroke="#9a4d12" strokeOpacity="0.55" fill="none" strokeWidth="1.1">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${cord + 6 + i * 9} Q50 ${cord + 12 + i * 9} 100 ${cord + 6 + i * 9}`} />
          ))}
          {Array.from({ length: 11 }, (_, i) => {
            const x = 6 + i * 8.8;
            return <path key={`v${i}`} d={`M50 ${cord + 2} Q${x * 2 - 50} ${cord + 52} 50 ${cord + 102}`} />;
          })}
        </g>
        <g clipPath={`url(#lc-${id})`} stroke="#fff6d6" strokeOpacity="0.35" fill="none" strokeWidth="0.8">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M0 ${cord + 10 + i * 9} Q50 ${cord + 16 + i * 9} 100 ${cord + 10 + i * 9}`} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function tieredPath(cord: number) {
  const y = cord + 6;
  // three stacked woven tiers, widening downwards
  return `M38 ${y} L62 ${y} L70 ${y + 22} L64 ${y + 24}
          L80 ${y + 50} L72 ${y + 52}
          L94 ${y + 82} Q50 ${y + 94} 6 ${y + 82}
          L28 ${y + 52} L20 ${y + 50}
          L36 ${y + 24} L30 ${y + 22} Z`;
}
