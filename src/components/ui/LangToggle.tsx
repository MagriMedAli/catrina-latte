import { LANGS } from '../../i18n/strings';
import { useLang } from '../../i18n/useLang';
import './LangToggle.css';

/** Two-option FR / EN switch with a sliding marker. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`lang ${className}`} role="group" aria-label={t.nav.language}>
      <span className="lang__thumb" style={{ translate: lang === 'fr' ? '0 0' : '100% 0' }} aria-hidden="true" />
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className={`lang__btn ${lang === l ? 'is-active' : ''}`}
          aria-pressed={lang === l}
          aria-label={l === 'fr' ? 'Français' : 'English'}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
