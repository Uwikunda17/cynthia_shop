import { useMemo, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../api'

export default function CategoryPage({ onSelectProduct }) {
  const { slug } = useParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.getCategories().then(setCategories),
      api.getProducts().then(setProducts),
    ])
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const category = categories.find((c) => c.slug === slug)
  const items = useMemo(
    () => products.filter((p) => p.category_slug === slug),
    [products, slug],
  )

  if (!category && !loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

          .error-container {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            text-align: center;
            background: #000000;
          }

          .error-title {
            font-family: 'EB Garamond', serif;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
          }

          .error-desc {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            color: #b0b0b0;
            margin-bottom: 16px;
          }

          .btn-back {
            background: #ffffff;
            color: #000000;
            padding: 12px 28px;
            border: none;
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-block;
          }

          .btn-back:hover {
            background: #f0f0f0;
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(255, 255, 255, 0.15);
          }
        `}</style>

        <div className="error-container">
          <h1 className="error-title">Category not found</h1>
          <p className="error-desc">Sorry, we couldn't find the category you're looking for.</p>
          <Link to="/" className="btn-back">
            Back to home
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .category-page {
          background: #000000;
          min-height: 100vh;
        }

        .category-hero {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid #202020;
          height: 400px;
          display: flex;
          align-items: flex-end;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .category-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
        }

        .category-hero-content {
          position: relative;
          z-index: 10;
          padding: 40px 32px;
          width: 100%;
          animation: slideInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .category-hero {
            height: 300px;
          }

          .category-hero-content {
            padding: 28px 20px;
          }
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #ffffff;
          margin-bottom: 12px;
          animation: slideInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.1s both;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
        }

        .category-title {
          font-family: 'EB Garamond', serif;
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 12px;
          animation: slideInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.2s both;
        }

        .category-description {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: #d0d0d0;
          max-width: 500px;
          line-height: 1.6;
          animation: slideInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.3s both;
        }

        @media (max-width: 640px) {
          .category-title {
            font-size: 32px;
          }

          .category-description {
            font-size: 13px;
          }
        }

        .products-section {
          margin-top: 56px;
          animation: fadeIn 0.6s ease-out 0.4s both;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        @media (min-width: 768px) {
          .section-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .section-title {
          font-family: 'EB Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
        }

        .section-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          color: #808080;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .products-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-state-title {
          font-family: 'EB Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .empty-state-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: #b0b0b0;
          margin-bottom: 24px;
        }

        .btn-primary {
          background: #ffffff;
          color: #000000;
          padding: 12px 28px;
          border: none;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-primary:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(255, 255, 255, 0.15);
        }

        .loading-skeleton {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .skeleton {
          height: 400px;
          background: linear-gradient(
            90deg,
            #1a1a1a 0%,
            #2a2a2a 50%,
            #1a1a1a 100%
          );
          background-size: 200% 100%;
          animation: loading 2s infinite;
          border-radius: 8px;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      <div className="category-page">
        {/* Hero Section */}
        {category && (
          <section className="category-hero">
            <img
              src={category.image}
              alt={category.title}
              className="category-hero-image"
            />
            <div className="category-hero-overlay"></div>
            <div className="category-hero-content">
              <span className="category-badge">
                <span className="badge-dot"></span>
                Curated {category.title}
              </span>
              <h1 className="category-title">{category.title}</h1>
              <p className="category-description">{category.description}</p>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">
              {items.length > 0 ? `${items.length} items` : 'Products'}
            </h2>
            <p className="section-subtitle">
              Click on any product to view details, sizes, colors, and more.
            </p>
          </div>

          {loading ? (
            <div className="loading-skeleton">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton"></div>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="products-grid">
              {items.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="products-grid">
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3 className="empty-state-title">No products found</h3>
                <p className="empty-state-desc">
                  This category doesn't have any products yet. Check back soon!
                </p>
                <Link to="/" className="btn-primary">
                  Explore other categories
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}