import { useLang } from "../context/LangContext";
import { SplitText } from "./SplitText";

export function Hero(){
    const { t } = useLang();
    return (
        <div className="hero">
            <div className="hero-tag">{t("hero.tag")}</div>
            <SplitText parts={t("hero.titleParts")} />
            <p>{t("hero.desc")}</p>
            <div className="hero-cta">
                <a href="#projects" className="btn-primary">{t("hero.ctaProjects")}</a>
                <a href="#contact" className="btn-secondary">{t("hero.ctaContact")}</a>
            </div>
        </div>
    )
}