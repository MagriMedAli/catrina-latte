import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '../i18n/useLang';
import { Bloom, Marigold, Sprig } from './decor/Flora';
import { FlowerMark } from './ui/Icons';
import { Reveal } from './ui/Reveal';
import './About.css';

const NUMERALS = ['uno', 'dos', 'tres'];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const a = t.about;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bigY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const smallY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__grid container">
        <div className="about__media" ref={ref}>
          <Sprig className="about__sprig" size={260} />
          <Bloom className="about__bloom" size={84} petals={8} color="#E94F42" inner="#f27a6e" />

          <motion.figure className="about__photo" style={{ y: bigY }}>
            <motion.img
              src="/images/green-ceiling.webp"
              srcSet="/images/green-ceiling-800.webp 600w, /images/green-ceiling.webp 1200w"
              sizes="(max-width: 860px) 86vw, 460px"
              alt={a.photoAlt}
              width={1200}
              height={1600}
              loading="lazy"
              style={{ scale: imgScale }}
            />
          </motion.figure>

          <motion.figure className="about__oval" style={{ y: smallY }}>
            <img src="/images/catrina-face.webp" alt={a.detailAlt} width={400} height={499} loading="lazy" />
          </motion.figure>

          <div className="about__stamp" aria-hidden="true">
            <Marigold size={46} />
            <span className="script">{a.stamp}</span>
          </div>
        </div>

        <div className="about__copy">
          <Reveal>
            <p className="eyebrow about__eyebrow">
              <FlowerMark style={{ color: 'var(--purple)' }} />
              {a.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-title" className="section-title about__title">
              {a.title[0]}
              <em>{a.title[1]}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="about__lead">{a.lead}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="about__body">
              {a.body[0]}
              <em>{a.body[1]}</em>
              {a.body[2]}
            </p>
          </Reveal>

          <ul className="about__pillars">
            {a.pillars.map((p, i) => (
              <Reveal as="li" key={NUMERALS[i]} delay={0.1 + i * 0.1} className="about__pillar">
                <span className="script about__num">{NUMERALS[i]}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
