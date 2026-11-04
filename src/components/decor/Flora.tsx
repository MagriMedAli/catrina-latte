/**
 * Hand-drawn style botanical illustrations, inspired by the flower crown in the
 * Catrina Latte logo: flat folk-art colours with a dark ink outline.
 */
import type { CSSProperties } from 'react';

type FloraProps = {
  className?: string;
  style?: CSSProperties;
  size?: number;
};

const INK = '#17172F';

const petal = (r: number, w: number) =>
  `M0 0 C ${r * w} ${-r * 0.2}, ${r * w} ${-r * 0.9}, 0 ${-r} C ${-r * w} ${-r * 0.9}, ${-r * w} ${-r * 0.2}, 0 0Z`;

type BloomProps = FloraProps & {
  petals?: number;
  color?: string;
  inner?: string;
  center?: string;
  width?: number;
};

/** Many-petalled flower — like the purple and blue blooms in the crown. */
export function Bloom({
  className,
  style,
  size = 120,
  petals = 9,
  color = '#70418B',
  inner = '#9a68b6',
  center = '#F6B83C',
  width = 0.42,
}: BloomProps) {
  const step = 360 / petals;
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="-52 -52 104 104"
      aria-hidden="true"
    >
      <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
        {Array.from({ length: petals }, (_, i) => (
          <path key={i} d={petal(48, width)} fill={color} transform={`rotate(${i * step})`} />
        ))}
        {Array.from({ length: petals }, (_, i) => (
          <path
            key={`i${i}`}
            d={petal(30, width * 0.9)}
            fill={inner}
            transform={`rotate(${i * step + step / 2})`}
          />
        ))}
        <circle r="12" fill={center} />
      </g>
      <g fill={INK} opacity="0.55">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 7} cy={Math.sin(a) * 7} r="1.3" />;
        })}
      </g>
      <g stroke={INK} strokeWidth="1" opacity="0.35" fill="none">
        {Array.from({ length: petals }, (_, i) => (
          <path key={i} d="M0 -16 L0 -40" transform={`rotate(${i * step})`} />
        ))}
      </g>
    </svg>
  );
}

/** Rose — the big coral-red flower that anchors the crown. */
export function Rose({ className, style, size = 120, color = '#E94F42', shade = '#B8322A' }: FloraProps & { color?: string; shade?: string }) {
  const wide = 'M0 0 C 30 -4 38 -38 0 -48 C -38 -38 -30 -4 0 0Z';
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-52 -52 104 104" aria-hidden="true">
      <g stroke={INK} strokeWidth="1.5" strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d={wide} fill={color} transform={`rotate(${r + 10})`} />
        ))}
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={`m${r}`} d={wide} fill={color} transform={`rotate(${r + 46}) scale(0.68)`} />
        ))}
        {[0, 120, 240].map((r) => (
          <path key={`i${r}`} d={wide} fill={shade} transform={`rotate(${r + 20}) scale(0.42)`} />
        ))}
        <path
          d="M-9 2 C -11 -8 -2 -13 5 -9 C 11 -5 9 4 2 6 C -3 7 -5 2 -2 -1 C 0 -3 3 -2 3 0"
          fill={shade}
          strokeLinecap="round"
        />
      </g>
      <g stroke={shade} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M-10 -36 C -4 -40 4 -40 10 -36" transform={`rotate(${r + 10})`} />
        ))}
      </g>
    </svg>
  );
}

/** Cempasúchil (marigold) — the flower of Día de los Muertos. */
export function Marigold({ className, style, size = 110, color = '#F39A39', light = '#F6B83C' }: FloraProps & { color?: string; light?: string }) {
  const ring = (r: number, n: number, pr: number, fill: string, offset = 0) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + offset;
      return <circle key={`${r}-${i}`} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={pr} fill={fill} />;
    });
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-52 -52 104 104" aria-hidden="true">
      <g stroke={INK} strokeWidth="1.5">
        {ring(38, 16, 11, color)}
        {ring(27, 13, 10, light, 0.2)}
        {ring(16, 9, 8.5, color, 0.4)}
        <circle r="9" fill={light} />
      </g>
      <g fill={INK} opacity="0.5">
        {[-3, 3, 0].map((x, i) => (
          <circle key={i} cx={x} cy={i === 2 ? -3 : 2} r="1.4" />
        ))}
      </g>
    </svg>
  );
}

/** Simple pointed leaf with a central vein. Points up from its base. */
export function Leaf({ className, style, size = 80, color = '#315B3D', vein = '#5f8a62' }: FloraProps & { color?: string; vein?: string }) {
  return (
    <svg className={className} style={style} width={size * 0.5} height={size} viewBox="-26 -102 52 104" aria-hidden="true">
      <path
        d="M0 0 C 22 -14 30 -54 0 -98 C -30 -54 -22 -14 0 0Z"
        fill={color}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <g stroke={vein} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M0 -4 L0 -84" />
        <path d="M0 -30 L12 -42 M0 -48 L11 -60 M0 -30 L-12 -42 M0 -48 L-11 -60 M0 -66 L7 -74 M0 -66 L-7 -74" />
      </g>
    </svg>
  );
}

/** Curved stem with alternating leaves. */
export function Sprig({ className, style, size = 200, color = '#315B3D' }: FloraProps & { color?: string }) {
  const leaves = [
    { x: 54, y: 168, r: -60 },
    { x: 62, y: 132, r: 50 },
    { x: 60, y: 96, r: -55 },
    { x: 66, y: 62, r: 45 },
    { x: 78, y: 30, r: -30 },
  ];
  return (
    <svg className={className} style={style} width={size * 0.6} height={size} viewBox="0 0 120 200" aria-hidden="true">
      <path d="M50 200 C 58 150 54 100 64 60 C 70 34 80 18 92 6" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <path
          key={i}
          d="M0 0 C 9 -6 12 -22 0 -40 C -12 -22 -9 -6 0 0Z"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
          fill={i % 2 ? color : '#4c7a52'}
          stroke={INK}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** Big tropical leaf silhouette, like the monstera in the café mural. */
export function Monstera({ className, style, size = 320, color = '#06666b' }: FloraProps & { color?: string }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <path
        fill={color}
        fillRule="evenodd"
        d="M100 190 C 96 160 92 150 80 140 C 50 150 18 130 10 96 C 4 62 30 26 66 14 C 100 2 150 12 176 44 C 198 72 192 116 166 138 C 146 154 120 150 106 146 C 104 160 104 175 100 190Z
           M70 40 C 66 52 64 60 66 70 C 74 66 80 56 82 44Z
           M40 70 C 46 78 54 84 64 86 C 62 76 56 68 46 62Z
           M36 108 C 46 110 56 108 66 102 C 58 96 46 96 38 100Z
           M118 30 C 114 42 112 52 114 62 C 122 56 128 44 128 32Z
           M156 60 C 146 66 138 74 134 84 C 146 84 156 76 162 66Z
           M160 106 C 150 104 140 104 130 108 C 138 118 150 120 160 116Z"
      />
      <path d="M102 146 C 100 110 98 70 96 24" stroke="#042f33" strokeOpacity="0.25" strokeWidth="2" fill="none" />
    </svg>
  );
}
