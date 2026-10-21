import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// The "share" build is a single self-contained page for hosted previews, where
// the page can't own its URL, so navigation stays in memory.
const Router = import.meta.env.MODE === 'share' ? MemoryRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
