export default function CartOverlay({ items, onClose, onRemove }) {
  const total = items.reduce((sum, item) => sum + (item.priceNumber || 0), 0)

  return (
    <div className="overlay">
      <div className="bg-slate-950 text-slate-100 w-full max-w-lg rounded-3xl shadow-soft border border-slate-800 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-slate-900/85 border border-slate-800 rounded-full p-2 hover:bg-slate-800"
          aria-label="Close cart"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold text-charcoal mb-4">Your cart</h3>
        {items.length === 0 ? (
          <p className="text-slate-300">Cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center gap-3 border border-slate-800 rounded-2xl p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-100">{item.name}</p>
                  <p className="text-sm text-slate-300">{item.price}</p>
                </div>
                <button
                  onClick={() => onRemove(idx)}
                  className="text-sm text-slate-400 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <p className="font-semibold text-slate-100">Subtotal</p>
              <p className="font-semibold text-accent">
                {total ? `$${total.toFixed(2)}` : '$0.00'}
              </p>
            </div>
            <button className="btn-primary w-full">Checkout</button>
          </div>
        )}
      </div>
    </div>
  )
}
