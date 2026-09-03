import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LangProvider } from './context/LangContext.jsx'

const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== window.location.href) {
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
)
