import { useLang } from "../context/LangContext";
import { GlowCard } from "./GlowCard";

export function About(){
    const { t } = useLang();
    return (
        <section id="about">
      <div className="section-label">{t("about.label")}</div>
      <div className="about-grid">
        <p className="about-text">{t("about.text")}</p>
        <div className="about-stats">
          <GlowCard className="stat-item">
            <div className="stat-num">3+</div>
            <div className="stat-desc">{t("about.stat1")}</div>
          </GlowCard>
          <GlowCard className="stat-item">
            <div className="stat-num">{t("about.stat3")}</div>
            <div className="stat-desc">{t("about.stat2")}</div>
          </GlowCard>
        </div>
      </div>
    </section>

    )
}