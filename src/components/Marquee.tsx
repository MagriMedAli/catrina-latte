import { useLang } from '../i18n/useLang';
import { FlowerMark } from './ui/Icons';
import './Marquee.css';

const SCRIPT_WORDS = ['hecho con amor', 'buenos momentos', 'bienvenidos'];
const COLORS = ['var(--coral)', 'var(--orange)', 'var(--purple)', 'var(--turquoise-bright)', 'var(--marigold)', 'var(--pink)'];

/** Slow-moving ribbon that bridges the hero and the story section. */
export function Marquee() {
  const { t } = useLang();
  // alternate translated serif words with Spanish script phrases
  const words = t.marquee.flatMap((w, i) => [
    { t: w, s: false },
    { t: SCRIPT_WORDS[i], s: true },
  ]);
  const row = words.map((w, i) => (
    <span className="marquee__item" key={i}>
      <span className={w.s ? 'script marquee__script' : 'marquee__serif'}>{w.t}</span>
      <FlowerMark className="marquee__flower" style={{ color: COLORS[i % COLORS.length] }} />
    </span>
  ));
  return (
    <div className="marquee-clip" aria-hidden="true">
      <div className="marquee">
        <div className="marquee__track">
          <div className="marquee__group">{row}</div>
          <div className="marquee__group">{row}</div>
        </div>
      </div>
    </div>
  );
}
