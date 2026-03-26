import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductModal from './components/ProductModal'
import CartOverlay from './components/CartOverlay'
import Landing from './pages/Landing'
import CategoryPage from './pages/CategoryPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminRegisterPage from './pages/AdminRegisterPage'
import './index.css'

function LayoutShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      {children}
    </div>
  )
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '')
  const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken') || '')

  const addToCart = (product) => {
    const priceNumber = Number(
      (product.price || '').replace(/[^0-9.]/g, ''),
    )
    setCart((prev) => [...prev, { ...product, priceNumber }])
    setShowCart(true)
  }

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Router>
      <LayoutShell>
        <Header
          cartCount={cart.length}
          onOpenCart={() => setShowCart(true)}
          userToken={userToken}
          onLogout={() => {
            localStorage.removeItem('userToken')
            setUserToken('')
          }}
        />
        <main className="space-y-12 pb-12 bg-slate-950">
          <Routes>
            <Route
              path="/"
              element={<Landing onSelectProduct={setSelectedProduct} />}
            />
            <Route
              path="/category/:slug"
              element={<CategoryPage onSelectProduct={setSelectedProduct} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage token={userToken} />} />
            <Route
              path="/login"
              element={
                <AuthPage
                  mode="login"
                  onAuthed={(t) => {
                    setUserToken(t)
                    localStorage.setItem('userToken', t)
                  }}
                />
              }
            />
            <Route
              path="/register"
              element={
                <AuthPage
                  mode="register"
                  onAuthed={(t) => {
                    setUserToken(t)
                    localStorage.setItem('userToken', t)
                  }}
                />
              }
            />
            <Route
              path="/admin/login"
              element={<AdminLoginPage onAuthed={(t) => { setToken(t); localStorage.setItem('adminToken', t) }} />}
            />
            <Route
              path="/admin/register"
              element={<AdminRegisterPage onAuthed={(t) => { setToken(t); localStorage.setItem('adminToken', t) }} />}
            />
            <Route path="/admin" element={<AdminDashboardPage token={token} />} />
            <Route
              path="*"
              element={
                <div className="text-center py-16 space-y-3">
                  <p className="text-2xl font-semibold text-charcoal">
                    Page not found
                  </p>
                  <a href="/" className="btn-primary inline-block">
                    Back home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="border-t border-cloud bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Made for modern shoppers.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="hover:text-accent">
                Privacy
              </a>
              <a href="/" className="hover:text-accent">
                Terms
              </a>
              <a href="/" className="hover:text-accent">
                Support
              </a>
            </div>
          </div>
        </footer>
      </LayoutShell>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
        />
      )}
      {showCart && (
        <CartOverlay
          items={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
        />
      )}
    </Router>
  )
}
