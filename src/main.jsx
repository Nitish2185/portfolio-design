import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/tasa-orbiter/400.css'
import '@fontsource/tasa-orbiter/600.css'
import '@fontsource/tasa-orbiter/700.css'
import '@fontsource/inter-tight/400.css'
import '@fontsource/inter-tight/500.css'
import '@fontsource/inter-tight/600.css'
import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'
import './styles/base.css'
import App from './App'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
