import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { api } from '../api'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        header {
          background: #000000;
          border-bottom: 1px solid #202020;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        @media (max-width: 640px) {
          .header-content {
            padding: 0 16px;
            height: 64px;
          }
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
          user-select: none;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }

        .logo-section:hover {
          opacity: 0.8;
        }

        .logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: #ffffff00;
          border-radius: 8px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
        }

        .logo-badge img {
          width: 28px;
          height: auto;
        }

        .logo-text {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #ffffff;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .logo-text {
            display: none;
          }
        }

        nav {
          display: none;
          gap: 32px;
          flex: 1;
          margin-left: 48px;
        }

        @media (min-width: 1024px) {
          nav {
            display: flex;
          }
        }

        nav a {
          position: relative;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #b0b0b0;
          transition: all 0.3s ease;
          text-decoration: none;
          padding: 4px 0;
        }

        nav a:hover,
        nav a.active {
          color: #ffffff;
        }

        nav a.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 2px;
          background: #ffffff;
          border-radius: 1px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: auto;
        }

        @media (max-width: 640px) {
          .header-actions {
            gap: 12px;
          }
        }

        .icon-button {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #303030;
          background: transparent;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 18px;
        }

        .icon-button:hover {
          border-color: #505050;
          background: #1a1a1a;
          transform: translateY(-2px);
        }

        .icon-button svg {
          width: 20px;
          height: 20px;
          stroke-width: 1.5;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          min-width: 20px;
          height: 20px;
          background: #ffffff;
          color: #000000;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
        }

        .profile-menu {
          position: relative;
        }

        .profile-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border: 1.5px solid #303030;
          background: transparent;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .profile-button:hover {
          border-color: #505050;
          background: #1a1a1a;
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #ffffff;
          color: #000000;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .profile-name {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .profile-name {
            display: none;
          }
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          width: 220px;
          background: #0a0a0a;
          border: 1px solid #202020;
          border-radius: 8px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          animation: slideDown 0.3s cubic-bezier(0.33, 1, 0.68, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 12px 16px;
          text-align: left;
          background: transparent;
          border: none;
          color: #b0b0b0;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          border-bottom: 1px solid #202020;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: #1a1a1a;
          color: #ffffff;
        }

        .dropdown-divider {
          height: 1px;
          background: #202020;
          margin: 6px 0;
        }

        .auth-buttons {
          display: none;
          gap: 8px;
        }

        @media (min-width: 768px) {
          .auth-buttons {
            display: flex;
          }
        }

        .btn-ghost {
          padding: 10px 18px;
          border: 1.5px solid #303030;
          background: transparent;
          color: #ffffff;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-ghost:hover {
          border-color: #505050;
          background: #1a1a1a;
        }

        .btn-primary {
          padding: 10px 18px;
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 640px) {
          .btn-ghost,
          .btn-primary {
            padding: 8px 14px;
            font-size: 11px;
          }
        }

        .mobile-nav {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-nav {
            display: flex;
            gap: 24px;
            flex: 1;
            margin-left: 24px;
            justify-content: center;
          }

          .mobile-nav a {
            font-size: 12px;
          }
        }

        @media (max-width: 640px) {
          .mobile-nav {
            display: none;
          }
        }
      `}</style>

      <header>
        <div className="header-content">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="logo-section">
            <div className="logo-badge">
              <img
                src="https://i.ibb.co/LDxmV89q/White-minimalist-log.png"
                alt="Shop"
              />
            </div>
            <span className="logo-text">Boutique</span>
          </Link>

          {/* Desktop Navigation */}
          <nav>
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

          {/* Mobile Navigation */}
          <nav className="mobile-nav">
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

          {/* Actions */}
          <div className="header-actions">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="icon-button"
              aria-label="Open cart"
              title="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 5h2l1.5 12h11L19 9H7" />
                <circle cx="10" cy="19" r="1" />
                <circle cx="16" cy="19" r="1" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div
              className="profile-menu"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="profile-button">
                <div className="profile-avatar">
                  {me?.email?.[0] || 'U'}
                </div>
                <span className="profile-name">
                  {me?.email || 'Account'}
                </span>
              </button>

              {open && (
                <div className="dropdown-menu">
                  {me ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="dropdown-item"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={onLogout}
                        className="dropdown-item"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="dropdown-item"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="dropdown-item"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Auth Buttons (Desktop only) */}
            {!me && (
              <div className="auth-buttons">
                <Link to="/login" className="btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}