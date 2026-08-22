import { useLang } from '../context/LangContext';
import { BlogList } from '../components/BlogList';

export function BlogPage() {
  const { t } = useLang();

  return (
    <>
      <div className="hero">
        <div className="hero-tag">{t('blog.tag')}</div>
        <h1 dangerouslySetInnerHTML={{ __html: t('blog.title') }} />
        <p>{t('blog.desc')}</p>
      </div>

      <section id="blog-articles">
        <div className="section-label">{t('blog.label')}</div>
        <p className="feedback-text">{t('blog.notice')}</p>
        <BlogList />
      </section>
    </>
  );
}