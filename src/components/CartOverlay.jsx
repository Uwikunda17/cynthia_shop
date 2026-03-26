export default function CartOverlay({ items, onClose, onRemove, onCheckout, state }) {
  const total = items.reduce((sum, item) => sum + (item.priceNumber || 0), 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          animation: fadeInOverlay 0.3s ease-out;
          padding: 16px;
        }

        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .cart-container {
          background: #0a0a0a;
          border: 1px solid #202020;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUpCart 0.4s cubic-bezier(0.33, 1, 0.68, 1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        @keyframes slideUpCart {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cart-header {
          position: relative;
          padding: 24px;
          border-bottom: 1px solid #202020;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cart-title {
          font-family: 'EB Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .close-button {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid #303030;
          border-radius: 6px;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          padding: 0;
          flex-shrink: 0;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #404040;
        }

        .cart-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border: 1px solid #202020;
          border-radius: 6px;
          background: #0a0a0a;
          transition: all 0.3s ease;
          animation: slideInItem 0.4s ease-out;
        }

        @keyframes slideInItem {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .cart-item:hover {
          border-color: #303030;
          background: #1a1a1a;
        }

        .cart-item-image {
          width: 64px;
          height: 64px;
          border-radius: 4px;
          overflow: hidden;
          flex-shrink: 0;
          background: #1a1a1a;
        }

        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 4px;
          min-width: 0;
        }

        .cart-item-name {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          word-break: break-word;
        }

        .cart-item-price {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #b0b0b0;
          margin: 0;
        }

        .cart-item-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .remove-button {
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #ff6b6b;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 4px 8px;
          border-radius: 3px;
        }

        .remove-button:hover {
          color: #ff5252;
          background: rgba(255, 107, 107, 0.1);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 16px;
          text-align: center;
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .empty-message {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: #b0b0b0;
          margin: 0;
        }

        .cart-footer {
          padding: 16px;
          border-top: 1px solid #202020;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #000000;
          border-radius: 0 0 8px 8px;
        }

        .cart-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0 12px 0;
        }

        .summary-label {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #b0b0b0;
        }

        .summary-value {
          font-family: 'EB Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }

        .checkout-button {
          width: 100%;
          padding: 14px 24px;
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .checkout-button:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(255, 255, 255, 0.15);
        }

        .checkout-button:active {
          transform: translateY(0);
        }

        /* Scrollbar styling */
        .cart-container::-webkit-scrollbar {
          width: 6px;
        }

        .cart-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .cart-container::-webkit-scrollbar-thumb {
          background: #303030;
          border-radius: 3px;
        }

        .cart-container::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }

        .cart-content::-webkit-scrollbar {
          width: 6px;
        }

        .cart-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .cart-content::-webkit-scrollbar-thumb {
          background: #303030;
          border-radius: 3px;
        }

        .cart-content::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }

        @media (max-width: 640px) {
          .cart-container {
            max-width: 100%;
            border-radius: 12px 12px 0 0;
          }

          .cart-header {
            padding: 20px;
          }

          .cart-title {
            font-size: 20px;
          }

          .cart-content {
            padding: 12px;
          }

          .cart-footer {
            padding: 12px;
          }
        }
      `}</style>

      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-container" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="cart-header">
            <h3 className="cart-title">Shopping cart</h3>
            <button
              onClick={onClose}
              className="close-button"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="cart-content">
            {items.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <p className="empty-message">Your cart is empty</p>
              </div>
            ) : (
              <div className="cart-items">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        onClick={() => onRemove(idx)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="cart-footer">
              <div className="cart-summary">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">
                  {total ? `$${total.toFixed(2)}` : '$0.00'}
                </span>
              </div>
              {state?.error && (
                <p className="text-sm text-red-400">{state.error}</p>
              )}
              <button
                className="checkout-button"
                onClick={onCheckout}
                disabled={state?.status === 'loading'}
              >
                {state?.status === 'loading' ? 'Processing…' : 'Proceed to checkout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
