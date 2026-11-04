import { navIds } from '../data/site';
import { useLang } from '../i18n/useLang';
import { Bloom, Leaf, Marigold, Rose } from './decor/Flora';
import { PapelPicado } from './decor/PapelPicado';
import { Wave } from './decor/Wave';
import { Reveal } from './ui/Reveal';
import './Footer.css';

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="footer grain">
      <Wave fill="var(--turquoise)" position="top" variant={2} />
      <PapelPicado className="footer__papel" count={18} string="#FFF4E5" />

      <div className="footer__inner container">
        <Reveal className="footer__brand">
          <div className="footer__medallion">
            <img src="/images/catrina-logo-sm.webp" alt="Catrina Latte" width={520} height={693} loading="lazy" />
          </div>
          <div className="footer__flora" aria-hidden="true">
            <Leaf size={90} style={{ position: 'absolute', left: 20, top: 0, rotate: '-60deg' }} />
            <Rose size={92} style={{ position: 'absolute', left: 0, top: 40 }} />
            <Marigold size={58} style={{ position: 'absolute', left: 60, top: 100 }} />
            <Leaf size={80} style={{ position: 'absolute', right: 30, top: 0, rotate: '60deg' }} />
            <Bloom size={84} style={{ position: 'absolute', right: 0, top: 44 }} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="footer__copy">
          <p className="script footer__script">Nos vemos pronto</p>
          <p className="footer__sub">{t.footer.sub} — Monastir</p>
        </Reveal>

        <nav aria-label={t.footer.nav} className="footer__nav">
          <ul>
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav.links[id]}</a>
              </li>
            ))}
            <li>
              <a href="#top">{t.footer.top}</a>
            </li>
          </ul>
        </nav>

        <div className="footer__bottom">
          <p>
            © {year} Catrina Latte. {t.footer.rights}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
