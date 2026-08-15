export function Hero(){
    return (
        <div className="hero">
            <div className="hero-tag" data-i18n="hero.tag">Étudiante en recherche de stage</div>
            <h1 data-i18n="hero.title">Développeuse <em>Web</em><br/>& Mobile</h1>
            <p data-i18n="hero.desc">Étudiante en informatique passionnée par la création d'applications et de jeux. Mon objectif : coder des projets interactifs, du mobile jusqu'à l'intelligence artificielle.</p>
            <div className="hero-cta">
                <a href="#projects" className="btn-primary" data-i18n="hero.ctaProjects">Voir mes projets</a>
                <a href="#contact" className="btn-secondary" data-i18n="hero.ctaContact">Me contacter</a>
            </div>
        </div>
    )
}