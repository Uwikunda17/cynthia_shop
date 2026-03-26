export default function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null

  return (
    <div className="overlay">
      <div className="relative bg-slate-950 text-slate-100 rounded-3xl max-w-4xl w-full shadow-soft border border-slate-800 overflow-hidden grid md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-slate-900/85 border border-slate-800 rounded-full p-2 hover:bg-slate-800"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-8 flex flex-col gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-slate-400">
              {product.id}
            </p>
            <h3 className="text-2xl font-semibold text-white">
              {product.name}
            </h3>
            <p className="text-xl font-semibold text-accent">{product.price}</p>
          </div>
          <p className="text-slate-300">{product.description}</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="badge bg-slate-900 border-slate-800 text-slate-100"
              >
                {size}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <span
                key={color}
                className="badge bg-slate-800 border-slate-700 text-slate-100"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onAdd(product)} className="btn-primary">
              Add to cart
            </button>
            <button className="btn-ghost" aria-label="Wishlist">
              ♥ Wishlist
            </button>
            <button className="btn-ghost bg-charcoal text-white border-charcoal hover:bg-slate-800">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
