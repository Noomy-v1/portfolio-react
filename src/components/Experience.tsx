import { useLang } from '../context/LangContext';
import { GlowCard } from './GlowCard';
import { experience } from '../data/experience-data';

export function Experience() {
  const { lang, t } = useLang();

  return (
    <section id="experience">
      <div className="section-label">{t('experience.label')}</div>
      <div className="projects-grid">
        {experience.map((job) => (
          <GlowCard key={job.company} className="project-card" glowColor="green">
            <div className="project-title">{job.role[lang as 'fr' | 'en']}</div>
            <div className="project-desc">{job.company}</div>
            <div className="project-desc">{job.description[lang as 'fr' | 'en']}</div>
            <div className="project-tags">
              <span className="tag">{job.period[lang as 'fr' | 'en']}</span>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}