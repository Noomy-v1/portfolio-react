import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills-data';
import { useLang } from '../context/LangContext';
import { GlowCard } from './GlowCard';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const { lang, t } = useLang();
  const gridRef = useRef(null);
  const currentLang = lang as 'fr' | 'en';

  useGSAP(() => {
    gsap.from('.skill-group', {
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
    });
  }, { scope: gridRef, dependencies: [lang] });

  return (
    <section id="skills">
      <div className="section-label">{t('skills.label')}</div>
      <div className="skills-grid" ref={gridRef}>
        {skills.map((skill) => (
          <GlowCard key={skill.title[currentLang]} className="skill-group" glowColor="purple">
              <div className="skill-group-title">{skill.title[currentLang]}</div>
              <div className="skill-tags">
                {skill.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}