import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

export function Header(){
    
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();

    return (
             <nav>
                <div className="logo">Noémie Gil<span> / dev</span></div>
                <button className="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <div className="nav-links">
                    <a href="#about" data-i18n="nav.about">{t("nav.about")}</a>
                    <a href="#projects" data-i18n="nav.projects">{t("nav.projects")}</a>
                    <a href="#skills" data-i18n="nav.skills">{t("nav.skills")}</a>
                    <a href="blog.html" data-i18n="nav.blog">{t("nav.blog")}</a>
                    <a href="#contact" data-i18n="nav.contact">{t("nav.contact")}</a>
                </div>
                <label className="theme-switch" aria-label="Changer le thème">
                    <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme} />
                    <span className="theme-switch-track">
                    <span className="theme-switch-thumb">
                        <span className="icon-moon">🌚</span>
                        <span className="icon-sun">🌝</span>
                    </span>
                    </span>
                </label>
                <button className="lang-toggle" onClick={toggleLang}>
                    <span className="lang-label">{lang === 'fr' ? 'EN' : 'FR'}</span>
                </button>
            </nav>
    )
}

