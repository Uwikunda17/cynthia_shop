export default function ProductCard({ product, onSelect }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .product-card {
          position: relative;
          text-align: left;
          background: #0a0a0a;
          border: 1px solid #202020;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card:hover {
          border-color: #404040;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
          transform: translateY(-4px);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background: #1a1a1a;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .price-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid #303030;
          border-radius: 20px;
          padding: 6px 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          animation: slideInRight 0.5s ease-out;
          z-index: 2;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .stock-indicator {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid #303030;
          border-radius: 20px;
          padding: 6px 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #b0b0b0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          animation: slideInLeft 0.5s ease-out;
          z-index: 2;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .product-content {
          padding: 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: space-between;
        }

        .product-title {
          font-family: 'EB Garamond', serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 0;
        }

        .product-description {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          line-height: 1.5;
          color: #b0b0b0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        .product-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .size-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: #1a1a1a;
          border: 1px solid #303030;
          border-radius: 4px;
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #b0b0b0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: fit-content;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #b0b0b0;
        }

        .stars {
          color: #ffd700;
          font-size: 13px;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .product-image-wrapper {
            aspect-ratio: 4 / 5;
          }

          .product-content {
            padding: 14px;
            gap: 10px;
          }

          .product-title {
            font-size: 15px;
          }

          .product-description {
            font-size: 11px;
          }
        }
      `}</style>

      <button
        onClick={() => onSelect(product)}
        className="product-card"
      >
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="image-overlay"></div>

          {/* Stock indicator */}
          {product.inStock !== false && (
            <div className="stock-indicator">
              <span>●</span>
              <span>In stock</span>
            </div>
          )}

          {/* Price badge */}
          <div className="price-badge">
            {product.price}
          </div>
        </div>

        <div className="product-content">
          <div>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="product-meta">
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-badge">
                {product.sizes.length} sizes
              </div>
            )}

            {product.rating && (
              <div className="rating-row">
                <span className="stars">★★★★★</span>
                <span>{product.rating}</span>
              </div>
            )}
          </div>
        </div>
      </button>
    </>
  )
}