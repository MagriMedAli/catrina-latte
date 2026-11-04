/**
 * Papel picado — Mexican cut-paper bunting, strung across a section edge.
 */
import { useId } from 'react';
import './decor.css';

const COLORS = ['#E94F42', '#F39A39', '#70418B', '#0e9a9c', '#F6B83C', '#E88AA6'];

type Props = {
  count?: number;
  className?: string;
  string?: string;
};

export function PapelPicado({ count = 14, className = '', string = '#17172F' }: Props) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`papel ${className}`} aria-hidden="true">
      <svg className="papel__string" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path d="M0 6 Q500 34 1000 6" stroke={string} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="papel__flags">
        {Array.from({ length: count }, (_, i) => {
          // follow the sag of the string
          const t = (i + 0.5) / count;
          const sag = 4 * t * (1 - t);
          return (
            <svg
              key={i}
              className="papel__flag"
              viewBox="0 0 100 124"
              style={{
                translate: `0 ${sag * 22}px`,
                animationDelay: `${(i % 5) * -0.7}s`,
              }}
            >
              <defs>
                <mask id={`m-${id}-${i}`}>
                  <rect width="100" height="124" fill="#fff" />
                  <g fill="#000">{cutout(i % 4)}</g>
                </mask>
              </defs>
              <path
                d="M0 0 H100 V108 Q93.75 122 87.5 108 Q81.25 122 75 108 Q68.75 122 62.5 108 Q56.25 122 50 108 Q43.75 122 37.5 108 Q31.25 122 25 108 Q18.75 122 12.5 108 Q6.25 122 0 108Z"
                fill={COLORS[i % COLORS.length]}
                mask={`url(#m-${id}-${i})`}
              />
              <rect width="100" height="7" fill="#000" opacity="0.12" />
            </svg>
          );
        })}
      </div>
    </div>
  );
}

function cutout(kind: number) {
  switch (kind) {
    case 0: // flower
      return (
        <g transform="translate(50 58)">
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx="0" cy="-20" rx="7" ry="13" transform={`rotate(${i * 45})`} />
          ))}
          <circle cx="-34" cy="-38" r="4" />
          <circle cx="34" cy="-38" r="4" />
          <circle cx="-34" cy="38" r="4" />
          <circle cx="34" cy="38" r="4" />
        </g>
      );
    case 1: // diamond lattice
      return (
        <g>
          {[22, 50, 78].flatMap((x) =>
            [30, 62, 94].map((y) => <path key={`${x}-${y}`} d={`M${x} ${y - 11} L${x + 9} ${y} L${x} ${y + 11} L${x - 9} ${y}Z`} />),
          )}
        </g>
      );
    case 2: // heart with dots
      return (
        <g>
          <path d="M50 88 C 18 66 18 38 36 34 C 44 32 50 40 50 44 C 50 40 56 32 64 34 C 82 38 82 66 50 88Z" />
          {[18, 36, 64, 82].map((x) => (
            <circle key={x} cx={x} cy="18" r="4" />
          ))}
          <circle cx="16" cy="100" r="4" />
          <circle cx="84" cy="100" r="4" />
        </g>
      );
    default: // sun / star
      return (
        <g transform="translate(50 60)">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M-4 -16 L0 -34 L4 -16Z" transform={`rotate(${i * 30})`} />
          ))}
          <circle r="12" />
        </g>
      );
  }
}
