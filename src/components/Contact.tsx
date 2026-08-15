export function Contact(){
    return(
        <section id="contact">
      <div className="section-label" data-i18n="contact.label">Contact</div>
      <div className="contact-box">
        <div className="contact-text">
          <h3 data-i18n="contact.title">Travaillons ensemble</h3>
          <p data-i18n="contact.desc">Un projet en tête ? Envoyez-moi un message.</p>
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