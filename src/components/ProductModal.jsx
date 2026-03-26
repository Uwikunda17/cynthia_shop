export default function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          animation: fadeIn 0.3s ease-out;
          padding: 16px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .modal-content {
          background: #0a0a0a;
          border: 1px solid #202020;
          border-radius: 8px;
          max-width: 1000px;
          width: 100%;
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.33, 1, 0.68, 1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-height: 90vh;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .modal-content {
            grid-template-columns: 1fr;
            max-height: 95vh;
          }
        }

        .modal-image {
          position: relative;
          overflow: hidden;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: slideInLeft 0.5s ease-out;
        }

        .modal-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #303030;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          animation: slideInLeft 0.5s ease-out 0.1s both;
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid #303030;
          border-radius: 50%;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          border-color: #505050;
        }

        .modal-body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          overflow-y: auto;
        }

        @media (max-width: 640px) {
          .modal-body {
            padding: 24px;
            gap: 20px;
          }
        }

        .product-header {
          animation: slideInLeft 0.5s ease-out 0.2s both;
        }

        .product-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #808080;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        .product-title {
          font-family: 'EB Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .product-price {
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .product-description {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: #b0b0b0;
          animation: slideInLeft 0.5s ease-out 0.3s both;
        }

        .section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #808080;
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .size-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
          gap: 10px;
          animation: slideInLeft 0.5s ease-out 0.35s both;
        }

        .size-btn {
          padding: 10px 16px;
          border: 1.5px solid #303030;
          background: transparent;
          color: #e0e0e0;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .size-btn:hover {
          border-color: #606060;
          background: #1a1a1a;
        }

        .size-btn.active {
          border-color: #ffffff;
          background: #ffffff;
          color: #000000;
        }

        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          animation: slideInLeft 0.5s ease-out 0.4s both;
        }

        .color-option {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #303030;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .color-option:hover {
          border-color: #606060;
          transform: scale(1.1);
        }

        .color-option.active {
          border-color: #ffffff;
          box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px #ffffff;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
          animation: slideInLeft 0.5s ease-out 0.45s both;
        }

        .btn-primary {
          background: #ffffff;
          color: #000000;
          padding: 13px 24px;
          border: none;
          border-radius: 4px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
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
          border-radius: 4px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          border-color: #606060;
          background: #1a1a1a;
        }

        .wishlist-icon {
          font-size: 18px;
          margin-right: 6px;
        }

        .divider {
          height: 1px;
          background: #202020;
          margin: 8px 0;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #b0b0b0;
          animation: slideInLeft 0.5s ease-out 0.25s both;
        }

        .stars {
          color: #ffd700;
          letter-spacing: 2px;
        }

        @media (max-width: 768px) {
          .product-title {
            font-size: 24px;
          }

          .product-price {
            font-size: 20px;
          }

          .size-grid {
            grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
          }
        }
      `}</style>

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Image Section */}
          <div className="modal-image">
            <span className="modal-badge">{product.id}</span>
            <button
              onClick={onClose}
              className="close-btn"
              aria-label="Close modal"
            >
              ✕
            </button>
            <img src={product.image} alt={product.name} />
          </div>

          {/* Content Section */}
          <div className="modal-body">
            {/* Header */}
            <div className="product-header">
              <span className="product-label">Premium Collection</span>
              <h2 className="product-title">{product.name}</h2>
              <p className="product-price">${product.price}</p>
              {product.rating && (
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span>(24 reviews)</span>
                </div>
              )}
            </div>

            <div className="divider"></div>

            {/* Description */}
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="section-title">Select Size</span>
                <div className="size-grid">
                  {product.sizes.map((size) => (
                    <button key={size} className="size-btn">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="section-title">Select Color</span>
                <div className="color-grid">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="actions">
              <button
                onClick={() => onAdd(product)}
                className="btn-primary"
              >
                Add to cart
              </button>
              <button className="btn-secondary">
                <span className="wishlist-icon">♥</span>
                Save to wishlist
              </button>
              <button className="btn-secondary">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}