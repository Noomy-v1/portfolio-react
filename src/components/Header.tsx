import { useEffect, useRef, useState, MouseEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

interface NavItem {
  key: string;
  type: "anchor" | "route" | "download";
  target: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: "nav.about", type: "anchor", target: "#about" },
  { key: "nav.projects", type: "anchor", target: "#projects" },
  { key: "nav.skills", type: "anchor", target: "#skills" },
  { key: "nav.education", type: "anchor", target: "#education" },
  { key: "nav.experience", type: "anchor", target: "#experience" },
  { key: "nav.contact", type: "anchor", target: "#contact" },
  { key: "nav.blog", type: "route", target: "/blog" },
  { key: "nav.cv", type: "download", target: "/CV_Noemie_Gil_TI.pdf" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hover shapes derrière chaque lien
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer?.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.06, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      containerRef.current?.querySelectorAll(".menu-list-item[data-shape]").forEach((item: any) => item._cleanup?.());
    };
  }, [lang]);

  // Ouverture / fermeture — le slide du panneau est géré en CSS (data-nav),
  // GSAP ne gère ici que les effets secondaires (bouton, formes, stagger des liens)
  useEffect(() => {
    if (!containerRef.current) return;

    const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper") as HTMLElement | null;
    const menuButton = containerRef.current.querySelector(".nav-close-btn");
    const menuButtonTexts = menuButton ? menuButton.querySelectorAll("p") : [];
    const menuButtonIcon = menuButton ? menuButton.querySelector(".menu-button-icon") : null;
    const menuLinks = containerRef.current.querySelectorAll(".nav-link");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");

    if (isMenuOpen) {
      navWrap?.setAttribute("data-nav", "open");
      if (navWrap) navWrap.style.display = "block";

      gsap.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2, duration: 0.3 });
      gsap.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, duration: 0.3 });
      gsap.fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.5, delay: 0.1 });
      gsap.fromTo(
        menuLinks,
        { yPercent: 140, rotate: 6 },
        { yPercent: 0, rotate: 0, stagger: 0.05, duration: 0.5, delay: 0.3 }
      );
    } else {
      navWrap?.setAttribute("data-nav", "closed");
      gsap.to(menuButtonTexts, { yPercent: 0, duration: 0.3 });
      gsap.to(menuButtonIcon, { rotate: 0, duration: 0.3 });

      const timer = setTimeout(() => {
        if (navWrap) navWrap.style.display = "none";
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  // Échap pour fermer
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: MouseEvent, item: NavItem) => {
    if (item.type === "download") {
      closeMenu();
      return;
    }

    e.preventDefault();
    closeMenu();

    if (item.type === "route") {
      navigate(item.target);
      return;
    }

    if (location.pathname === "/") {
      setTimeout(() => document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth" }), 350);
    } else {
      navigate("/");
      setTimeout(() => document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth" }), 450);
    }
  };

  return (
    <div ref={containerRef}>
      <header className="site-header">
        <div className="nav-row">
          <Link to="/" className="logo">Noémie Gil<span> / dev</span></Link>

          <div className="nav-row__right">
            <label className="theme-switch" aria-label="Changer le thème">
              <input type="checkbox" checked={theme === "light"} onChange={toggleTheme} />
              <span className="theme-switch-track">
                <span className="theme-switch-thumb">
                  <span className="icon-moon">🌚</span>
                  <span className="icon-sun">🌝</span>
                </span>
              </span>
            </label>

            <button className="lang-toggle" onClick={toggleLang}>
              <span className="lang-label">{lang === "fr" ? "EN" : "FR"}</span>
            </button>

            <button className="nav-close-btn" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Menu">
              <div className="menu-button-text">
                <p>Menu</p>
                <p>Close</p>
              </div>
              <div className="icon-wrap">
                <svg viewBox="0 0 16 16" fill="none" className="menu-button-icon" width="14" height="14">
                  <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor" />
                  <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx={80} cy={120} r={40} fill="var(--glow-a)" />
                  <circle className="shape-element" cx={300} cy={80} r={60} fill="var(--glow-b)" />
                  <circle className="shape-element" cx={200} cy={300} r={80} fill="var(--glow-c)" />
                </svg>
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="var(--glow-a)" strokeWidth={50} fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="var(--glow-b)" strokeWidth={35} fill="none" />
                </svg>
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx={80} cy={80} r={10} fill="var(--glow-c)" />
                  <circle className="shape-element" cx={200} cy={120} r={14} fill="var(--glow-a)" />
                  <circle className="shape-element" cx={320} cy={80} r={10} fill="var(--glow-b)" />
                  <circle className="shape-element" cx={150} cy={250} r={12} fill="var(--glow-b)" />
                  <circle className="shape-element" cx={280} cy={290} r={8} fill="var(--glow-c)" />
                </svg>
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="var(--glow-a)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q380 250, 340 290 Q300 330, 250 290 Q220 250, 250 200" fill="var(--glow-c)" />
                </svg>
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1={0} y1={100} x2={300} y2={400} stroke="var(--glow-a)" strokeWidth={26} />
                  <line className="shape-element" x1={100} y1={0} x2={400} y2={300} stroke="var(--glow-b)" strokeWidth={20} />
                  <line className="shape-element" x1={200} y1={0} x2={400} y2={200} stroke="var(--glow-c)" strokeWidth={16} />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {NAV_ITEMS.map((item, index) => (
                  <li className="menu-list-item" data-shape={(index % 5) + 1} key={item.key}>
                    <a
                      href={item.target}
                      className="nav-link"
                      onClick={(e) => handleNavClick(e, item)}
                      {...(item.type === "download" ? { download: true } : {})}
                    >
                      <p className="nav-link-text">{t(item.key)}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
