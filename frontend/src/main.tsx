import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/App/App.tsx'
import { AuthProvider } from './Services/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
