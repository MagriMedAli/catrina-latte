import type { ReactNode } from 'react';
import { site } from '../data/site';
import { useLang } from '../i18n/useLang';
import { Bloom, Leaf, Marigold } from './decor/Flora';
import { Lantern } from './decor/Lantern';
import { Wave } from './decor/Wave';
import { ArrowIcon, ClockIcon, FlowerMark, InstagramIcon, PhoneIcon, PinIcon } from './ui/Icons';
import { OpenBadge } from './ui/OpenBadge';
import { Reveal } from './ui/Reveal';
import './Visit.css';

type RowProps = { icon: ReactNode; label: string; placeholder?: boolean; tbc: string; children: ReactNode };

function Row({ icon, label, placeholder, tbc, children }: RowProps) {
  return (
    <div className="visit__row">
      <span className="visit__icon">{icon}</span>
      <div>
        <dt>
          {label}
          {placeholder && <span className="tbc">{tbc}</span>}
        </dt>
        <dd>{children}</dd>
      </div>
    </div>
  );
}

const maybeLink = (value: string, href?: string) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  ) : (
    value
  );

export function Visit() {
  const { t } = useLang();
  const v = t.visit;
  return (
    <section id="visit" className="visit grain" aria-labelledby="visit-title">
      <Wave fill="var(--ivory)" position="top" variant={1} />

      <div className="visit__grid container">
        <div className="visit__info">
          <Reveal>
            <p className="eyebrow visit__eyebrow">
              <FlowerMark style={{ color: 'var(--marigold)' }} />
              {v.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="visit-title" className="section-title visit__title">
              {v.title} <span className="script">¡hola!</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="visit__lead">
              Catrina Latte — Monastir. {v.lead}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="visit__list">
              <Row icon={<PinIcon />} label={v.address} placeholder={site.address.placeholder} tbc={v.tbc}>
                {maybeLink(v.addressValue, site.directionsUrl)}
                <span className="visit__sub">
                  {v.plusCode} · {site.address.plusCode}
                </span>
              </Row>
              <Row icon={<ClockIcon />} label={v.hours} placeholder={site.hoursPlaceholder} tbc={v.tbc}>
                <ul className="visit__hours">
                  {v.days.map((d, i) => (
                    <li key={d}>
                      <span>{d}</span>
                      <span className="visit__hours-dots" aria-hidden="true" />
                      <span>{site.hours[i]}</span>
                    </li>
                  ))}
                </ul>
                <OpenBadge className="visit__badge" />
              </Row>
              <Row icon={<PhoneIcon />} label={v.phone} placeholder={site.phone.placeholder} tbc={v.tbc}>
                {maybeLink(site.phone.value, site.phone.href)}
              </Row>
              <Row icon={<InstagramIcon />} label={v.instagram} placeholder={site.instagram.placeholder} tbc={v.tbc}>
                {maybeLink(site.instagram.value, site.instagram.href)}
              </Row>
            </dl>
          </Reveal>

          <Reveal delay={0.26} className="visit__ctas">
            <a href={site.directionsUrl} className="btn" target="_blank" rel="noopener noreferrer">
              {v.cta}
              <span className="btn-icon">
                <ArrowIcon />
              </span>
            </a>
            <a href={site.phone.href} className="btn btn--ghost">
              <PhoneIcon width={16} height={16} />
              {v.call}
            </a>
          </Reveal>
        </div>

        <Reveal className="visit__map-wrap" delay={0.1}>
          <Lantern className="visit__lantern" cord={60} width={70} delay={-2} />
          <div className="visit__map">
            <iframe title={v.mapTitle} src={site.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="visit__flora" aria-hidden="true">
            <Leaf size={110} style={{ position: 'absolute', left: 50, bottom: 30, rotate: '-40deg' }} />
            <Leaf size={90} color="#4c7a52" style={{ position: 'absolute', left: 110, bottom: -10, rotate: '50deg' }} />
            <Bloom size={110} color="#E94F42" inner="#f27a6e" petals={8} style={{ position: 'absolute', left: -10, bottom: -20 }} />
            <Marigold size={72} style={{ position: 'absolute', left: 88, bottom: -26 }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
