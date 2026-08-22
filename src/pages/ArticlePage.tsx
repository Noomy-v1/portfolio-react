import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { marked } from 'marked';

const API_URL = 'https://blog-api-umz6.onrender.com';

interface Article {
  title: string;
  content: string;
  created_at: string;
}

export function ArticlePage() {
  const { slug } = useParams();
  const { t } = useLang();
  const [article, setArticle] = useState<Article | null>(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadArticle() {
      setStatus('loading');
      try {
        const response = await fetch(`${API_URL}/api/articles/${slug}`);

        if (!response.ok) {
          setStatus('notfound');
          return;
        }

        const data: Article = await response.json();
        setArticle(data);
        setStatus('ready');
      } catch (err) {
        setStatus('error');
      }
    }

    loadArticle();
  }, [slug]);

  return (
    <>
      

      <article className="article-content">
        <div className="back-link">
            <Link to="/blog">{t('article.back')}</Link>
        </div>

        {status === 'loading' && <p className="feedback-text">{t('blog.loading')}</p>}
        {status === 'notfound' && <p className="feedback-text">Article introuvable.</p>}
        {status === 'error' && <p className="feedback-text">{t('blog.loadError')}</p>}

        {status === 'ready' && article && (
          <>
            <div className="hero-tag article-date">
              {new Date(article.created_at).toLocaleDateString('fr-CA')}
            </div>
            <h1 className="article-title">{article.title}</h1>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: marked.parse(article.content) as string }}
            />
          </>
        )}
      </article>
    </>
  );
}