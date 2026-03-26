import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { api } from '../api'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive ? 'text-accent' : 'text-slate-200 hover:text-accent'
  }`

export default function Header({ cartCount = 0, onOpenCart, userToken, onLogout }) {
  const [open, setOpen] = useState(false)
  const [me, setMe] = useState(null)
  const navigate = useNavigate()
  const clickRef = useRef({ count: 0, timeout: null })

  useEffect(() => {
    if (!userToken) {
      setMe(null)
      return
    }
    api.getMe(userToken).then(setMe).catch(() => setMe(null))
  }, [userToken])

  const handleLogoClick = () => {
    const ref = clickRef.current
    ref.count += 1
    clearTimeout(ref.timeout)
    ref.timeout = setTimeout(() => {
      ref.count = 0
    }, 800)
    if (ref.count >= 3) {
      ref.count = 0
      navigate('/admin/login')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 select-none">
          <div className="gradient-border">
            <div className="bg-slate-950 rounded-[18px] px-2 py-1">
              <img
                src="https://i.ibb.co/LDxmV89q/White-minimalist-log.png"
                alt="Cynthia Shop"
                className="h-9 w-auto"
              />
            </div>
          </div>
          <span className="hidden sm:block text-sm font-semibold text-slate-200">
            Boutique Marketplace
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/category/clothes" className={navLinkClass}>
            Clothes
          </NavLink>
          <NavLink to="/category/shoes" className={navLinkClass}>
            Shoes
          </NavLink>
          <NavLink to="/category/luxury" className={navLinkClass}>
            Luxury
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative rounded-full p-2 border border-slate-800 hover:border-accent transition text-slate-100"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5h2l1.5 12h11L19 9H7"
              />
              <circle cx="10" cy="19" r="1" />
              <circle cx="16" cy="19" r="1" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-900 shadow-sm border border-slate-800 transition text-slate-100">
              <div className="w-9 h-9 rounded-full bg-accent text-slate-950 font-bold grid place-items-center uppercase">
                {me?.email?.[0] || 'U'}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-slate-100">
                {me?.email || 'Guest'}
              </span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-xl shadow-soft border border-slate-800 p-2">
                {me ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-semibold text-slate-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-semibold text-slate-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-semibold text-slate-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-semibold text-slate-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-sm font-semibold text-slate-100"
                    >
                      Join
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {!me && (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm text-slate-100 border-slate-800">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
