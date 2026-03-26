import { useMemo, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../api'

export default function CategoryPage({ onSelectProduct }) {
  const { slug } = useParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error)
    api.getProducts().then(setProducts).catch(console.error)
  }, [])

  const category = categories.find((c) => c.slug === slug)
  const items = useMemo(
    () => products.filter((p) => p.category_slug === slug),
    [products, slug],
  )

  if (!category) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-xl font-semibold text-charcoal">Category not found</p>
        <Link to="/" className="btn-primary inline-block">
          Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-cloud bg-white">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-3">
          <p className="badge">Curated {category.title}</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-charcoal">
            {category.title}
          </h1>
          <p className="text-slate-600">{category.description}</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-charcoal">
            Materials & pieces
          </h2>
          <p className="text-sm text-slate-500">
            Tap a product to view sizes, colors, and details.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      </section>
    </div>
  )
}
