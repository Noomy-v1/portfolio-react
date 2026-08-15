export function About(){
    return (
        <section id="about">
      <div className="section-label" data-i18n="about.label">À propos</div>
      <div className="about-grid">
        <p className="about-text" data-i18n="about.text">
          Je suis actuellement en dernière année au DEC en Techniques de l'informatique. Ce que j'aime le plus dans la programmation, 
          c'est le côté concret : partir d'un simple concept et le voir prendre vie à l'écran. Pendant mon cursus, j'ai eu l'occasion 
          de toucher à un peu de tout (des applications Android aux jeux 2D/3D, en passant par des systèmes de gestion). Ces projets ont
          vraiment confirmé mon envie d'aller vers le mobile et le gamedev. Aujourd'hui, je cherche un stage pour sortir du cadre scolaire, 
          mettre les mains dans du vrai code et apprendre comment ça se passe concrètement dans l'industrie.
        </p>
        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-num">3+</div>
            <div className="stat-desc" data-i18n="about.stat1">Projets académique réalisés</div>
          </div>
          <div className="stat-item">
            <div className="stat-num" data-i18n="about.stat3">6e</div>
            <div className="stat-desc" data-i18n="about.stat2">Session au DEC</div>
          </div>
        </div>
      </div>
    </section>

    )
}