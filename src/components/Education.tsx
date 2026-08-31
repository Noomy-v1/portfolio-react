import { useRef, useState, useEffect } from 'react';
import { useLang } from "../context/LangContext";
import { education } from "../data/education-data";
import { GlowCard } from "./GlowCard";

export function Education() {
  const { lang, t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[index] as HTMLElement;
    item?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(track.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft - track.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="education">
      <div className="section-label">{t("education.label")}</div>

      <div className="carousel-track" ref={trackRef}>
        {education.map((item) => (
          <GlowCard key={item.school} className="project-card carousel-item" glowColor="orange">
            <div className="project-title">{item.school}</div>
            <div className="project-desc">{item.degree[lang as 'fr' | 'en']}</div>
            <div className="project-desc">{item.focus[lang as 'fr' | 'en']}</div>
            <div className="project-tags">
              <span className="tag">{item.period[lang as 'fr' | 'en']}</span>
            </div>
          </GlowCard>
        ))}
      </div>

      {education.length > 1 && (
        <div className="carousel-dots">
          {education.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Aller à l'élément ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}