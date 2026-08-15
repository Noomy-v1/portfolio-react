import { useLang } from "../context/LangContext";

export function Hero(){
    const { t } = useLang();
    return (
        <div className="hero">
            <div className="hero-tag">{t("hero.tag")}</div>
            <h1 dangerouslySetInnerHTML={{ __html: t("hero.title") }} />
            <p>{t("hero.desc")}</p>
            <div className="hero-cta">
                <a href="#projects" className="btn-primary">{t("hero.ctaProjects")}</a>
                <a href="#contact" className="btn-secondary">{t("hero.ctaContact")}</a>
            </div>
        </div>
    )
}