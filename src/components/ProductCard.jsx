export default function ProductCard({ product, onSelect }) {
  return (
    <button
      onClick={() => onSelect(product)}
      className="text-left bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl overflow-hidden card-hover w-full"
    >
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold border border-slate-800">
          {product.price}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-slate-100">{product.name}</h3>
        <p className="text-sm text-slate-300 h-10 overflow-hidden">
          {product.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="badge bg-slate-800 text-slate-200 border-slate-700">
            Sizes {product.sizes.join(', ')}
          </span>
        </div>
      </div>
    </button>
  )
}
