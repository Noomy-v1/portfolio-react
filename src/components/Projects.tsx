import { useLang } from "../context/LangContext";

export function Projects(){
    const { t } = useLang();
    return (
        <section id="projects">
            <div className="section-label">{t("projects.label")}</div>
            <div className="projects-grid">
            </div>
        </section>
    )
}