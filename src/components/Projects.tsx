import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects-data';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const { lang, t } = useLang();
  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.from('.project-card', {
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
    });
  }, { scope: gridRef, dependencies: [lang] });

  return (
    <section id="projects">
      <div className="section-label">{t('projects.label')}</div>
      <div className="projects-grid" ref={gridRef}>
        {projects.map((project) => (
          <a key={project.link} href={project.link} className="project-card" target="_blank" rel="noopener noreferrer">
            <div className="project-icon">{project.icon}</div>
            <div className="project-title">{project.title[lang as 'fr' | 'en']}</div>
            <div className="project-desc">{project.description[lang as 'fr' | 'en']}</div>
            <div className="project-tags">
              {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}