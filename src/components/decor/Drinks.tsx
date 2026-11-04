/**
 * Folk-art illustrations of real Catrina Latte menu items, drawn in the same
 * flat-colour + ink-outline style as the flowers in the logo.
 */
import { useId, type CSSProperties, type ReactNode } from 'react';
import './decor.css';

type P = { className?: string; style?: CSSProperties };

const INK = '#17172F';
const sw = 2.4;

function Frame({ className, style, children }: P & { children: ReactNode }) {
  return (
    <svg
      className={`drink ${className ?? ''}`}
      style={style}
      viewBox="0 0 160 160"
      fill="none"
      stroke={INK}
      strokeWidth={sw}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Rising steam — animated in CSS. */
function Steam({ x = 80, y = 52 }: { x?: number; y?: number }) {
  return (
    <g className="steam" stroke="#fff4e5" strokeWidth="3" opacity="0.85">
      <path d={`M${x - 16} ${y} q-7 -9 0 -18 q7 -9 0 -18`} />
      <path d={`M${x} ${y - 4} q-7 -9 0 -18 q7 -9 0 -18`} />
      <path d={`M${x + 16} ${y} q-7 -9 0 -18 q7 -9 0 -18`} />
    </g>
  );
}

export function Cappuccino(p: P) {
  return (
    <Frame {...p}>
      <Steam />
      <ellipse cx="80" cy="130" rx="60" ry="12" fill="#fff4e5" />
      <ellipse cx="80" cy="128" rx="40" ry="6" fill="#f0dcc0" stroke="none" />
      <path d="M128 84 c22 -2 24 26 -4 26" stroke={INK} strokeWidth="11" />
      <path d="M128 84 c22 -2 24 26 -4 26" stroke="#E94F42" strokeWidth="5" />
      <path d="M32 72 H128 L120 114 Q80 134 40 114 Z" fill="#E94F42" />
      <path d="M37 92 H123" stroke="#F6B83C" strokeWidth="4" />
      {[50, 66, 80, 94, 110].map((x) => (
        <circle key={x} cx={x} cy="102" r="2.6" fill="#fff4e5" stroke="none" />
      ))}
      <ellipse cx="80" cy="72" rx="48" ry="10" fill="#b8784a" />
      <ellipse cx="80" cy="72" rx="40" ry="7" fill="#f6e4c8" stroke="none" />
      <path
        d="M80 78 C69 72 71 64 77 65 C79 65.5 80 67 80 68.5 C80 67 81 65.5 83 65 C89 64 91 72 80 78Z"
        fill="#b8784a"
        stroke="none"
      />
    </Frame>
  );
}

export function PistachioLatte(p: P) {
  const id = useId().replace(/:/g, '');
  return (
    <Frame {...p}>
      <defs>
        <clipPath id={`pg-${id}`}>
          <path d="M50 44 H110 L103 140 Q80 146 57 140 Z" />
        </clipPath>
      </defs>
      <path d="M96 10 L86 70" stroke={INK} strokeWidth="8" />
      <path d="M96 10 L86 70" stroke="#E94F42" strokeWidth="4" />
      <g clipPath={`url(#pg-${id})`} stroke="none">
        <rect x="40" y="44" width="80" height="34" fill="#f6ecd6" />
        <rect x="40" y="78" width="80" height="38" fill="#9cc46b" />
        <rect x="40" y="116" width="80" height="30" fill="#5a3420" />
        <path d="M40 78 q10 6 20 0 t20 0 t20 0 t20 0 v6 H40Z" fill="#b9d98e" />
        <rect x="56" y="48" width="6" height="88" fill="#fff" opacity="0.35" />
      </g>
      <path d="M50 44 H110 L103 140 Q80 146 57 140 Z" />
      <path
        d="M48 46 C40 36 52 26 62 32 C64 20 82 18 86 30 C94 22 110 28 106 40 C116 42 114 52 104 50 H56 C48 52 44 48 48 46Z"
        fill="#fffaf2"
      />
      {[64, 78, 90, 100].map((x, i) => (
        <path key={x} d={`M${x} ${36 + (i % 2) * 6} l4 -3`} stroke="#4c7a52" strokeWidth="3.4" />
      ))}
    </Frame>
  );
}

export function MintMojito(p: P) {
  const id = useId().replace(/:/g, '');
  return (
    <Frame {...p}>
      <defs>
        <clipPath id={`mg-${id}`}>
          <path d="M46 36 H114 L108 142 H52 Z" />
        </clipPath>
      </defs>
      <path d="M104 6 L92 80" stroke={INK} strokeWidth="8" />
      <path d="M104 6 L92 80" stroke="#fff4e5" strokeWidth="4" strokeDasharray="5 5" />
      <g clipPath={`url(#mg-${id})`}>
        <rect x="40" y="50" width="80" height="96" fill="#2fb3c9" stroke="none" />
        <rect x="40" y="50" width="80" height="10" fill="#7fd6e3" stroke="none" />
        <rect x="56" y="62" width="22" height="20" rx="4" fill="#e6fbff" opacity="0.8" transform="rotate(-12 67 72)" />
        <rect x="80" y="84" width="22" height="20" rx="4" fill="#e6fbff" opacity="0.8" transform="rotate(10 91 94)" />
        <rect x="58" y="104" width="20" height="18" rx="4" fill="#e6fbff" opacity="0.7" />
        <path d="M66 128 C74 118 88 120 92 130 C84 136 72 136 66 128Z" fill="#4c7a52" />
        <path d="M86 112 C94 102 106 106 108 114 C100 120 90 118 86 112Z" fill="#6aa86f" />
        <circle cx="70" cy="96" r="2" fill="#fff" stroke="none" />
        <circle cx="96" cy="70" r="2.4" fill="#fff" stroke="none" />
        <circle cx="74" cy="114" r="1.6" fill="#fff" stroke="none" />
      </g>
      <path d="M46 36 H114 L108 142 H52 Z" />
      <circle cx="46" cy="40" r="17" fill="#9cc46b" />
      <circle cx="46" cy="40" r="12" fill="#d8eba8" />
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <path key={r} d="M46 40 L46 29" transform={`rotate(${r} 46 40)`} stroke="#9cc46b" strokeWidth="1.8" />
      ))}
      <path d="M114 30 C122 18 136 22 136 32 C126 36 118 36 114 30Z" fill="#4c7a52" />
    </Frame>
  );
}

export function BasqueCheesecake(p: P) {
  return (
    <Frame {...p}>
      <ellipse cx="80" cy="132" rx="64" ry="13" fill="#fff4e5" />
      <path d="M26 118 L80 62 L134 104 L134 124 Q80 140 26 130 Z" fill="#f2f0e6" />
      <path d="M30 116 L80 66 L130 104 L130 118 Q80 132 30 124 Z" fill="#f6d98f" />
      <path d="M80 66 L130 104 L130 110 L80 74 Z" fill="#7a3e18" stroke="none" />
      <path d="M30 116 L80 66 L80 74 L34 120 Z" fill="#9a5424" stroke="none" />
      <path d="M30 116 L80 66 L130 104" />
      <path d="M44 112 q6 6 14 2 t16 2 t16 -2 t16 4" stroke="#e7b75c" strokeWidth="1.8" />
      <path d="M62 84 C70 96 88 92 100 98 C108 102 114 100 120 104" stroke="#8fbf5a" strokeWidth="5" />
      <path d="M62 84 C70 96 88 92 100 98 C108 102 114 100 120 104" stroke={INK} strokeWidth="1" opacity="0.4" />
      {[70, 92, 110].map((x, i) => (
        <path key={x} d={`M${x} ${90 + i * 4} l5 -2`} stroke="#4c7a52" strokeWidth="3.4" />
      ))}
    </Frame>
  );
}

export function Tiramisu(p: P) {
  const layers = ['#8b5a3c', '#f8ecd6', '#8b5a3c', '#f8ecd6'];
  return (
    <Frame {...p}>
      <ellipse cx="80" cy="132" rx="62" ry="12" fill="#fff4e5" />
      <path d="M36 66 L80 50 L124 66 L80 82 Z" fill="#5a3420" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={52 + ((i * 37) % 56)} cy={60 + ((i * 13) % 14)} r="1.3" fill="#3b2012" stroke="none" />
      ))}
      <path d="M36 66 V118 L80 134 V82 Z" fill="#f8ecd6" />
      <path d="M124 66 V118 L80 134 V82 Z" fill="#efdcbc" />
      {layers.map((c, i) => (
        <g key={i} stroke="none">
          <path d={`M36 ${70 + i * 12} L80 ${86 + i * 12} V${96 + i * 12} L36 ${80 + i * 12}Z`} fill={c} />
          <path d={`M124 ${70 + i * 12} L80 ${86 + i * 12} V${96 + i * 12} L124 ${80 + i * 12}Z`} fill={c} opacity="0.85" />
        </g>
      ))}
      <path d="M36 66 V118 L80 134 L124 118 V66" />
      <path d="M80 82 V134" />
      <path d="M118 30 L104 96" stroke={INK} strokeWidth="7" />
      <path d="M118 30 L104 96" stroke="#d9d4cc" strokeWidth="3" />
      <ellipse cx="121" cy="24" rx="7" ry="11" fill="#d9d4cc" transform="rotate(14 121 24)" />
    </Frame>
  );
}

export function ParadiseCocktail(p: P) {
  const id = useId().replace(/:/g, '');
  return (
    <Frame {...p}>
      <defs>
        <linearGradient id={`pc-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F39A39" />
          <stop offset="0.55" stopColor="#F6B83C" />
          <stop offset="0.56" stopColor="#1f8fae" />
          <stop offset="1" stopColor="#2a6fb0" />
        </linearGradient>
      </defs>
      <path d="M78 104 V136" strokeWidth="5" />
      <ellipse cx="78" cy="138" rx="28" ry="6" fill="#fff4e5" />
      <path d="M30 40 H126 C124 80 104 104 78 104 C52 104 32 80 30 40Z" fill={`url(#pc-${id})`} />
      <path d="M40 48 C42 70 52 88 66 96" stroke="#fff" strokeWidth="3" opacity="0.5" />
      <circle cx="122" cy="40" r="18" fill="#F39A39" />
      <circle cx="122" cy="40" r="13" fill="#fcd28a" />
      {[0, 45, 90, 135].map((r) => (
        <path key={r} d="M109 40 H135" transform={`rotate(${r} 122 40)`} stroke="#F39A39" strokeWidth="1.8" />
      ))}
      <path d="M58 40 L46 4" strokeWidth="2" />
      <path d="M24 16 Q46 -6 70 14 Q46 8 24 16Z" fill="#E88AA6" />
      <path d="M46 4 L36 14 M46 4 L58 12" strokeWidth="1.4" />
      <circle cx="92" cy="30" r="7" fill="#c62a3a" />
      <path d="M92 23 q4 -10 12 -12" strokeWidth="1.8" />
    </Frame>
  );
}

export function Affogato(p: P) {
  return (
    <Frame {...p}>
      <ellipse cx="80" cy="132" rx="54" ry="11" fill="#fff4e5" />
      <path d="M40 78 H120 L112 124 Q80 136 48 124 Z" fill="#cdeef0" opacity="0.9" />
      <path d="M44 96 H116 L112 124 Q80 136 48 124 Z" fill="#5a3420" stroke="none" />
      <path d="M40 78 H120 L112 124 Q80 136 48 124 Z" />
      <circle cx="80" cy="66" r="30" fill="#fff6e0" />
      <path d="M54 76 C60 86 70 84 74 92 C78 84 88 90 92 82 C98 88 104 80 106 74" fill="#fff6e0" />
      <path d="M68 52 C76 60 84 60 96 56 C94 70 98 80 92 98" stroke="#7a4424" strokeWidth="5" />
      <path d="M58 54 a6 6 0 0 1 8 -6" stroke="#fff" strokeWidth="3" opacity="0.8" />
      {[70, 84, 92].map((x, i) => (
        <circle key={x} cx={x} cy={46 + i * 5} r="1.6" fill={INK} stroke="none" opacity="0.5" />
      ))}
    </Frame>
  );
}

export function HotChocolate(p: P) {
  return (
    <Frame {...p}>
      <Steam y={40} />
      <path d="M118 74 c26 -2 26 36 -2 34" stroke={INK} strokeWidth="11" />
      <path d="M118 74 c26 -2 26 36 -2 34" stroke="#70418B" strokeWidth="5" />
      <path d="M38 62 H122 V122 Q122 138 106 138 H54 Q38 138 38 122 Z" fill="#70418B" />
      {[56, 80, 104].map((x) => (
        <g key={x} transform={`translate(${x} 104)`} stroke="none">
          {[0, 90, 180, 270].map((r) => (
            <ellipse key={r} cx="0" cy="-6" rx="3.4" ry="5.6" fill="#F6B83C" transform={`rotate(${r})`} />
          ))}
          <circle r="3" fill="#E94F42" />
        </g>
      ))}
      <path
        d="M36 64 C30 54 44 46 52 52 C54 40 72 38 76 48 C82 36 102 40 100 52 C110 46 124 54 118 64 Z"
        fill="#fffaf2"
      />
      <path d="M56 56 C66 62 80 54 92 60 C98 62 104 58 108 60" stroke="#6b3a1e" strokeWidth="4" />
      <rect x="96" y="20" width="34" height="24" rx="4" fill="#c9843f" transform="rotate(22 113 32)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={104 + i * 9} cy="30" r="1.8" fill="#8a5426" stroke="none" transform="rotate(22 113 32)" />
      ))}
    </Frame>
  );
}

export function Espresso(p: P) {
  return (
    <Frame {...p}>
      <Steam y={64} />
      <ellipse cx="80" cy="128" rx="50" ry="10" fill="#fff4e5" />
      <path d="M112 96 c16 -2 16 20 -2 18" stroke={INK} strokeWidth="10" />
      <path d="M112 96 c16 -2 16 20 -2 18" stroke="#0e9a9c" strokeWidth="4.5" />
      <path d="M46 86 H114 L108 118 Q80 130 52 118 Z" fill="#0e9a9c" />
      <path d="M50 102 H110" stroke="#fff4e5" strokeWidth="3" strokeDasharray="2 6" />
      <ellipse cx="80" cy="86" rx="34" ry="7" fill="#7a4424" />
      <ellipse cx="80" cy="86" rx="26" ry="4.4" fill="#c98a55" stroke="none" />
    </Frame>
  );
}

export function FreshJuice(p: P) {
  const id = useId().replace(/:/g, '');
  return (
    <Frame {...p}>
      <defs>
        <clipPath id={`fj-${id}`}>
          <path d="M50 38 H110 L104 140 H56 Z" />
        </clipPath>
      </defs>
      <path d="M100 8 L90 70" stroke={INK} strokeWidth="8" />
      <path d="M100 8 L90 70" stroke="#70418B" strokeWidth="4" />
      <g clipPath={`url(#fj-${id})`} stroke="none">
        <rect x="40" y="52" width="80" height="94" fill="#e8475c" />
        <rect x="40" y="52" width="80" height="8" fill="#f48a98" />
        <rect x="58" y="60" width="6" height="76" fill="#fff" opacity="0.3" />
        {[70, 90, 78, 96, 66].map((x, i) => (
          <circle key={i} cx={x} cy={72 + i * 14} r="2" fill="#fff" opacity="0.6" />
        ))}
      </g>
      <path d="M50 38 H110 L104 140 H56 Z" />
      <path d="M108 44 C108 30 124 24 132 34 C138 44 130 56 118 54 C112 54 108 50 108 44Z" fill="#E94F42" />
      <path d="M118 30 l3 -10 l6 6" fill="#4c7a52" />
      {[[116, 40], [124, 38], [120, 48], [128, 46]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.2" fill="#F6B83C" stroke="none" />
      ))}
    </Frame>
  );
}
