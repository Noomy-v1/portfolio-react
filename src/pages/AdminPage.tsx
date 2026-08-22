import { useState, useEffect } from 'react';

const API_URL = 'https://blog-api-umz6.onrender.com';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

export function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [unlockFeedback, setUnlockFeedback] = useState('');

  const [articles, setArticles] = useState<Article[]>([]);
  const [editingSlug, setEditingSlug] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadArticles = async () => {
    const response = await fetch(`${API_URL}/api/articles`);
    const data = await response.json();
    setArticles(data);
  };

  useEffect(() => {
    if (unlocked) loadArticles();
  }, [unlocked]);

  const handleUnlock = async () => {
    if (!adminKey) {
      setUnlockFeedback('Entre une clé.');
      return;
    }

    setUnlockFeedback('Vérification...');

    try {
      const response = await fetch(`${API_URL}/api/articles/__verification__`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({}),
      });

      if (response.status === 401) {
        setUnlockFeedback('Clé incorrecte.');
        return;
      }

      setUnlocked(true);
    } catch (err) {
      setUnlockFeedback('Erreur réseau, réessaie.');
    }
  };

  const resetForm = () => {
    setEditingSlug('');
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
  };

  const startEdit = (article: Article) => {
    setEditingSlug(article.slug);
    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt);
    setContent(article.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (articleSlug: string) => {
    const confirmed = confirm(`Supprimer l'article "${articleSlug}" ? Cette action est irréversible.`);
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/articles/${articleSlug}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });

      if (!response.ok) {
        alert('Erreur lors de la suppression.');
        return;
      }

      loadArticles();
    } catch (err) {
      alert('Erreur réseau.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEditing = Boolean(editingSlug);
    const url = isEditing ? `${API_URL}/api/articles/${editingSlug}` : `${API_URL}/api/articles`;
    const method = isEditing ? 'PUT' : 'POST';

    setFeedback(isEditing ? 'Modification en cours...' : 'Publication en cours...');

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ slug, title, excerpt, content }),
      });

      if (!response.ok) {
        const error = await response.json();
        setFeedback(`Erreur : ${error.error}`);
        return;
      }

      setFeedback(isEditing ? 'Article modifié avec succès!' : 'Article publié avec succès!');
      resetForm();
      loadArticles();
    } catch (err) {
      setFeedback('Erreur réseau, vérifie ta connexion.');
    }
  };

  if (!unlocked) {
    return (
      <div className="lock-screen">
        <div className="hero-tag">Zone privée</div>
        <h1>Accès <em>admin</em></h1>
        <div className="lock-form">
          <input
            type="password"
            placeholder="Clé admin"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          />
          <button className="btn-primary" onClick={handleUnlock}>Déverrouiller</button>
        </div>
        <p className="feedback-text">{unlockFeedback}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="hero-tag">Zone privée</div>
      <h1>Gérer les <em>articles</em></h1>

      <div className="section-label">Articles existants</div>
      <div className="blog-list">
        {articles.length === 0 ? (
          <p className="feedback-text">Aucun article pour l'instant.</p>
        ) : (
          articles.map((article) => (
            <div key={article.slug} className="project-card admin-article-row">
              <div className="project-title">{article.title}</div>
              <div className="project-desc">{article.excerpt}</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button className="btn-secondary" onClick={() => startEdit(article)}>Modifier</button>
                <button className="btn-secondary" onClick={() => handleDelete(article.slug)}>Supprimer</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="section-label">{editingSlug ? `Modifier : ${title}` : 'Nouvel article'}</div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre de l'article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="slug-de-larticle"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={Boolean(editingSlug)}
          required
        />
        <textarea
          placeholder="Résumé court"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenu en Markdown..."
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn-primary">
            {editingSlug ? 'Enregistrer les modifications' : "Publier l'article"}
          </button>
          {editingSlug && (
            <button type="button" className="btn-secondary" onClick={resetForm}>Annuler</button>
          )}
        </div>
      </form>
      <p className="feedback-text">{feedback}</p>
    </section>
  );
}