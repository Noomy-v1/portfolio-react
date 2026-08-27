import { useRef, useState, useEffect } from 'react';
import { useLang } from "../context/LangContext";
import { education } from "../data/education-data";
import { GlowCard } from "./GlowCard";

export function Education() {
  const { lang, t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = 280;
    trackRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(track.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const itemCenter = el.offsetLeft + el.clientWidth / 2;
        const distance = Math.abs(itemCenter - trackCenter);
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
        <div className="carousel">
            <div className="carousel-track carousel-centered" ref={trackRef}>
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
      </div>

      {education.length > 1 && (
        <div className="carousel-dots">
          {education.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scroll('right')}
              aria-label={`Aller à l'élément ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}