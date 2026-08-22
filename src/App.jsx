import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="portfolio">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;