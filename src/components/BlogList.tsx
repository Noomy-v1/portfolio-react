import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const API_URL = 'https://blog-api-umz6.onrender.com';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  created_at: string;
}

export function BlogList() {
  const { t } = useLang();
  const [articles, setArticles] = useState<Article[]>([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadArticles() {
      setStatus('loading');
      try {
        const response = await fetch(`${API_URL}/api/articles`);
        const data: Article[] = await response.json();

        if (data.length === 0) {
          setStatus('empty');
          return;
        }

        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setArticles(data);
        setStatus('ready');
      } catch (err) {
        setStatus('error');
      }
    }

    loadArticles();
  }, []);

  if (status === 'loading') return <p className="feedback-text">{t('blog.loading')}</p>;
  if (status === 'empty') return <p className="feedback-text">{t('blog.noArticles')}</p>;
  if (status === 'error') return <p className="feedback-text">{t('blog.loadError')}</p>;

  return (
    <div className="blog-list">
      {articles.map((article) => (
        <Link key={article.slug} to={`/blog/${article.slug}`} className="project-card">
          <div className="project-title">{article.title}</div>
          <div className="project-desc">{article.excerpt}</div>
          <div className="project-tags">
            <span className="tag">{new Date(article.created_at).toLocaleDateString('fr-CA')}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}