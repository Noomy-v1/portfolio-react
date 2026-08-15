
export function Header(){
    const nom = "Noemie"

    return (
             <nav>
                <div className="logo">Noémie Gil<span> / dev</span></div>
                <button className="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <div className="nav-links">
                    <a href="#about" data-i18n="nav.about">À propos</a>
                    <a href="#projects" data-i18n="nav.projects">Projets</a>
                    <a href="#skills" data-i18n="nav.skills">Compétences</a>
                    <a href="blog.html" data-i18n="nav.blog">Blog</a>
                    <a href="#contact" data-i18n="nav.contact">Contact</a>
                </div>
                <label className="theme-switch" aria-label="Changer le thème">
                    <input type="checkbox" id="theme-toggle" />
                    <span className="theme-switch-track">
                    <span className="theme-switch-thumb">
                        <span className="icon-moon">🌚</span>
                        <span className="icon-sun">🌝</span>
                    </span>
                    </span>
                </label>
                <button id="lang-toggle" className="lang-toggle">
                    <span className="lang-label">EN</span>
                </button>
            </nav>
    )
}