import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { checkSupabaseConnection } from './lib/supabase.js'

// Dev only: log once whether the Supabase keys in .env work.
if (import.meta.env.DEV) checkSupabaseConnection().then((msg) => console.log(msg))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
