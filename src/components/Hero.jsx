import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero({ images = [] }) {
  // Default images if none provided
  const defaultImages = [
    'https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80',
    'https://images.unsplash.com/photo-1591047990623-aeb5e1e53cbb?w=1200&q=80',
    'https://images.unsplash.com/photo-1574180045827-48cf960f8ce0?w=1200&q=80',
  ]

  const imageList = images && images.length > 0 ? images : defaultImages
  const [index, setIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageList.length)
      setNextIndex((prev) => (prev + 2) % imageList.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [imageList.length])

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % imageList.length)
    setNextIndex((prev) => (prev + 2) % imageList.length)
  }

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .hero-serif {
          font-family: 'EB Garamond', serif;
          font-weight: 700;
        }

        .hero-sans {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .hero-content {
          animation: slideInLeft 1.2s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .hero-image-main {
          animation: slideInRight 1.2s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .hero-cards {
          animation: fadeIn 1s ease-out 0.4s both;
        }

        .badge-animate {
          animation: fadeIn 0.8s ease-out;
        }

        .text-balance {
          text-wrap: balance;
        }

        .image-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          grid-template-areas:
            "main main"
            "side1 side2";
        }

        .grid-main {
          grid-area: main;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          aspect-ratio: 16 / 9;
        }

        .grid-side {
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 2px;
          position: relative;
        }

        .grid-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease-out;
        }

        .grid-side:hover img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #404040;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .nav-dot.active {
          background: #ffffff;
          transform: scale(1.4);
        }

        .btn-base {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
          text-transform: uppercase;
          font-size: 13px;
          border: none;
          cursor: pointer;
        }

        .btn-dark {
          background: #ffffff;
          color: #000000;
          padding: 14px 32px;
          border-radius: 2px;
        }

        .btn-dark:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(255,255,255,0.15);
        }

        .btn-outline {
          background: transparent;
          color: #ffffff;
          padding: 14px 32px;
          border: 1.5px solid #ffffff;
          border-radius: 2px;
        }

        .btn-outline:hover {
          background: #ffffff;
          color: #000000;
        }

        .divider {
          width: 3px;
          height: 32px;
          background: #ffffff;
          border-radius: 2px;
        }

        .card-preview {
          border: 1px solid #303030;
          border-radius: 2px;
          overflow: hidden;
          background: #0a0a0a;
          animation: scaleIn 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.6s both;
        }

        .card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: #1a1a1a;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease-out;
        }

        .card-preview:hover .card-image img {
          transform: scale(1.08);
        }

        .card-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #808080;
          text-transform: uppercase;
          font-weight: 600;
        }

        .card-title {
          font-family: 'EB Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
        }

        .card-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #b0b0b0;
        }

        .meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1a1a1a;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .text-clamped {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="relative min-h-screen">
        {/* Background image with fallback */}
        <div className="absolute inset-0 bg-gray-900">
          {imageList && imageList[index] && (
            <img
              src={imageList[index]}
              alt="Featured background"
              className="w-full h-full object-cover opacity-15"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          )}
        </div>

        {/* Main container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Content */}
            <div className="hero-content space-y-10 pt-8">
              {/* Badge */}
              <div className="badge-animate">
                <div className="meta-badge">
                  <span className="pulse-dot"></span>
                  <span>Limited Time Offer</span>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-6">
                <h1 className="hero-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-white">
                  Summer <br />
                  <span className="relative inline-block">
                    <span className="relative z-10">Collection</span>
                    <svg
                      className="absolute -bottom-3 left-0 w-full"
                      height="20"
                      viewBox="0 0 200 20"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,10 Q50,0 100,10 T200,10"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="hero-sans text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg text-balance">
                Discover the latest trends with up to 40% off. Premium quality styles that elevate your wardrobe. Shop now and get free shipping on orders over $100.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
                <Link to="/category/luxury" className="btn-base btn-dark">
                  Shop now
                </Link>
                <Link to="/category/clothes" className="btn-base btn-outline">
                  View all deals
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 pt-8">
                <div className="divider"></div>
                <p className="hero-sans text-xs text-gray-400 uppercase tracking-widest">
                  Fast Shipping &amp; Easy Returns
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="hero-serif text-3xl font-bold text-white">50K+</p>
                  <p className="hero-sans text-xs text-gray-400 uppercase tracking-widest mt-2">
                    Happy customers
                  </p>
                </div>
                <div>
                  <p className="hero-serif text-3xl font-bold text-white">4.8★</p>
                  <p className="hero-sans text-xs text-gray-400 uppercase tracking-widest mt-2">
                    Customer rating
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Images */}
            <div className="hero-image-main">
              <div className="space-y-8">
                {/* Main grid */}
                <div className="image-grid">
                  <div className="grid-main">
                    {imageList && imageList.length > 0 && imageList[index] && (
                      <>
                        <img
                          src={imageList[index]}
                          alt="Featured main"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg'
                          }}
                        />
                        <div className="image-overlay"></div>
                      </>
                    )}
                  </div>
                  <div className="grid-side">
                    {imageList && imageList.length > 0 && imageList[nextIndex] && (
                      <>
                        <img
                          src={imageList[nextIndex]}
                          alt="Featured side 1"
                          onError={(e) => {
                            e.target.src = 'https://instagram.fkgl4-2.fna.fbcdn.net/v/t51.82787-15/548885719_17855948976520277_2495964635354657246_n.webp?_nc_cat=110&ig_cache_key=MzcyMzA4ODI1NDM0MzE2NDkxOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Fy6SrKJt6hQQ7kNvwFyBb-w&_nc_oc=AdoVcfg-HLbiDlCyHjGQgGqGRyZh9zdRQphpf5HboBOm4qdPmiHG0sXw3UYvyMbjjEU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkgl4-2.fna&_nc_gid=92HXXuLj41m8rUq6T_ZEYw&_nc_ss=7a32e&oh=00_AfzTsn2GZ2pAjT6zHnh31-YYedn7Ql364XUaB5sGeVqE8A&oe=69CAE0D9'
                          }}
                        />
                        <div className="image-overlay"></div>
                      </>
                    )}
                  </div>
                  <div className="grid-side">
                    {imageList && imageList.length > 0 && imageList[(nextIndex + 1) % imageList.length] && (
                      <>
                        <img
                          src={imageList[(nextIndex + 1) % imageList.length]}
                          alt="Featured side 2"
                          onError={(e) => {
                            e.target.src = 'https://i.pinimg.com/1200x/f7/0b/97/f70b97626e9cc8db8b4789edbef3eec0.jpg'
                          }}
                        />
                        <div className="image-overlay"></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="hero-cards flex justify-between items-center">
                  <div className="flex gap-2">
                    {imageList?.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setIndex(i)
                          setNextIndex((i + 1) % imageList.length)
                        }}
                        className={`nav-dot ${i === index ? 'active' : ''}`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    className="hero-sans text-xs font-bold text-white uppercase tracking-widest hover:opacity-60 transition-opacity"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured card - below on mobile, sidebar on desktop */}
          <div className="mt-16 lg:absolute lg:bottom-8 lg:right-8 lg:w-72">
            <div className="card-preview">
              <div className="card-image">
                {imageList && imageList.length > 0 && imageList[index] && (
                  <img
                    src={imageList[index]}
                    alt="Featured product"
                    onError={(e) => {
                      e.target.src = 'https://i.pinimg.com/1200x/95/36/54/953654e032aadd1847d5921b1d0abc5a.jpg'
                    }}
                  />
                )}
              </div>
              <div className="p-5 space-y-3">
                <p className="card-label">Featured Product</p>
                <h3 className="card-title">Best Sellers</h3>
                <p className="card-desc text-clamped">
                  Shop our most popular items. Trending styles loved by thousands.
                </p>
                <button
                  onClick={handleNext}
                  className="btn-base btn-dark w-full mt-4"
                >
                  Shop bestsellers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}