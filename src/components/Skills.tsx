import { useLang } from "../context/LangContext";

export function Skills(){
    const { t } = useLang();
    return(
        <section id="skills">
            <div className="section-label">{t("skills.label")}</div>
            <div className="skills-grid">
            </div>
        </section>
    )
}