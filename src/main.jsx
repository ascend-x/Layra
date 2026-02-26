import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import { SiteProvider } from './context/SiteContext'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SiteProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </SiteProvider>
    </AuthProvider>
  </StrictMode>,
)
