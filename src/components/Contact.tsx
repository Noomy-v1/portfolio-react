import { useLang } from "../context/LangContext";

export function Contact(){
    const { t } = useLang();
    return(
        <section id="contact">
      <div className="section-label">{t("contact.label")}</div>
      <div className="contact-box">
        <div className="contact-text">
          <h3 dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
          <p data-i18n="contact.desc">{t("contact.desc")}</p>
        </div>
        <div className="contact-links">
          <button className="btn-primary email-copy" data-email="n.gil.dev@gmail.com">
            contact@noemie.dev
          </button>
          <a href="https://www.linkedin.com/in/no%C3%A9mie-gil-a5a856327/" target="_blank" className="btn-secondary">LinkedIn</a>
          <a href="https://github.com/Noomy-v1" target="_blank" className="btn-secondary">GitHub</a>
        </div>
      </div>
    </section>
    )
}