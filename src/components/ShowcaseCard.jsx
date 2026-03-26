import { useMemo, useState } from 'react'
import clsx from 'clsx'

export default function ShowcaseCard({ items = [], onSelect }) {
  const safeItems =
    items.length > 0
      ? items
      : [
          {
            name: 'Premium Lounge Chair',
            description: 'Soft boucle upholstery with sculpted wood legs.',
            image:
              'https://images.unsplash.com/photo-1616594039964-c2c8c53c0c93?auto=format&fit=crop&w=1400&q=80',
            thumb:
              'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=400&q=80',
            price: '$820',
            label: 'Furniture',
            rating: 4.9,
            reviews: 128,
            inStock: true,
          },
        ]

  const [active, setActive] = useState(0)
  const product = safeItems[active]

  const tabs = useMemo(
    () => safeItems.map((i) => i.label || i.name.split(' ')[0]),
    [safeItems],
  )

  const handleSelect = () => {
    if (onSelect) onSelect(product)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .showcase-container {
          background: #000000;
          border: 1px solid #202020;
          border-radius: 12px;
          padding: 32px;
          overflow: hidden;
          position: relative;
        }

        .showcase-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          z-index: 10;
          position: relative;
        }

        .tab-group {
          display: flex;
          gap: 8px;
          background: rgba(30, 30, 30, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 6px;
        }

        .tab-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #808080;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .tab-btn:hover:not(.active) {
          color: #c0c0c0;
        }

        .stock-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(30, 30, 30, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #b0b0b0;
        }

        .stock-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
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

        .showcase-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 32px;
          align-items: center;
          z-index: 10;
          position: relative;
        }

        @media (max-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        .image-section {
          position: relative;
        }

        .main-image {
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease-out;
        }

        .main-image:hover img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .content-section {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .product-header {
          animation: slideInUp 0.6s ease-out;
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

        .product-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #808080;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .product-name {
          font-family: 'EB Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .product-description {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: #b0b0b0;
          line-height: 1.6;
        }

        .rating-section {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid #202020;
          border-bottom: 1px solid #202020;
          animation: slideInUp 0.6s ease-out 0.1s both;
        }

        .price-display {
          font-family: 'EB Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
        }

        .rating-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #b0b0b0;
        }

        .stars {
          color: #ffd700;
          font-size: 14px;
          letter-spacing: 1px;
        }

        .review-count {
          font-size: 12px;
          color: #808080;
        }

        .product-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          animation: slideInUp 0.6s ease-out 0.2s both;
        }

        .info-box {
          background: #0a0a0a;
          border: 1px solid #202020;
          border-radius: 8px;
          padding: 16px;
        }

        .info-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #808080;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        .info-value {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: slideInUp 0.6s ease-out 0.3s both;
        }

        .btn-primary {
          background: #ffffff;
          color: #000000;
          padding: 13px 24px;
          border: none;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(255, 255, 255, 0.15);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          padding: 13px 24px;
          border: 1.5px solid #303030;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .btn-secondary:hover {
          border-color: #606060;
          background: #1a1a1a;
        }

        .thumbnail-row {
          display: flex;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #202020;
          animation: slideInUp 0.6s ease-out 0.15s both;
        }

        .thumbnail {
          width: 60px;
          height: 60px;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .thumbnail:hover {
          border-color: #606060;
          transform: scale(1.05);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .accent-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.05;
          pointer-events: none;
        }

        .accent-glow-1 {
          width: 400px;
          height: 400px;
          background: #ffffff;
          bottom: -100px;
          right: -100px;
        }

        .accent-glow-2 {
          width: 300px;
          height: 300px;
          background: #ffffff;
          top: -50px;
          left: -50px;
        }
      `}</style>

      <div className="showcase-container">
        {/* Accent glows */}
        <div className="accent-glow accent-glow-1"></div>
        <div className="accent-glow accent-glow-2"></div>

        {/* Header */}
        <div className="showcase-header">
          <div className="tab-group">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActive(idx)}
                className={clsx('tab-btn', { active: active === idx })}
              >
                {tab}
              </button>
            ))}
          </div>
          {product.inStock !== false && (
            <div className="stock-badge">
              <span className="stock-indicator"></span>
              <span>In stock</span>
            </div>
          )}
        </div>

        {/* Main grid */}
        <div className="showcase-grid">
          {/* Left: Image */}
          <div className="image-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
              <div className="image-overlay"></div>
            </div>
            {safeItems.length > 1 && (
              <div className="thumbnail-row">
                {safeItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className="thumbnail"
                    style={{
                      borderColor: active === idx ? '#ffffff' : 'transparent',
                    }}
                  >
                    <img src={item.thumb || item.image} alt={item.name} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="content-section">
            {/* Product Header */}
            <div className="product-header">
              <span className="product-label">{product.label || 'Featured'}</span>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
            </div>

            {/* Price & Rating */}
            <div className="rating-section">
              <div className="price-display">{product.price}</div>
              {product.rating && (
                <div style={{ flex: 1 }}>
                  <div className="rating-info">
                    <span className="stars">★★★★★</span>
                    <span>{product.rating}</span>
                  </div>
                  {product.reviews && (
                    <div className="review-count">
                      ({product.reviews} reviews)
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info boxes */}
            <div className="product-info">
              <div className="info-box">
                <span className="info-label">Availability</span>
                <span className="info-value">In stock</span>
              </div>
              <div className="info-box">
                <span className="info-label">Shipping</span>
                <span className="info-value">Free</span>
              </div>
            </div>

            {/* Actions */}
            <div className="actions">
              <button className="btn-primary" onClick={handleSelect}>
                <span>Add to cart</span>
                <span>→</span>
              </button>
              <button className="btn-secondary">Save to wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}