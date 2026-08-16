import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills-data';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const { lang, t } = useLang();
  const gridRef = useRef(null);

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
            <div key={skill.title[lang as 'fr' | 'en']} className="skill-group">
                <div className="skill-group-title">{skill.title[lang as 'fr' | 'en']}</div>
            <div className="skill-tags">
              {skill.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}