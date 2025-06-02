import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MedEnfsProvider } from './context/MedEnfsContext.jsx'


createRoot(document.getElementById('root')).render(
      <MedEnfsProvider>
            <App />
      </MedEnfsProvider>


)
