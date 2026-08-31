import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();

    if (location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav>
      <div className="logo">Noémie Gil<span> / dev</span></div>
      <button className="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className="nav-links">
        <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>{t("nav.about")}</a>
        <a href="#projects" onClick={(e) => handleAnchorClick(e, '#projects')}>{t("nav.projects")}</a>
        <a href="#skills" onClick={(e) => handleAnchorClick(e, '#skills')}>{t("nav.skills")}</a>
        <a href="#education" onClick={(e) => handleAnchorClick(e, '#education')}>{t("nav.education")}</a>
        <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>{t("nav.contact")}</a>
        <a href="/CV Noémie Gil_TI.pdf" download>{t('nav.cv')}</a>
        <Link to="/blog">{t('nav.blog')}</Link>
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
  );
}