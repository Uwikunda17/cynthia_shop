import { useEffect, useMemo, useState } from 'react'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import ProductCard from '../components/ProductCard'
import ShowcaseCard from '../components/ShowcaseCard'
import { api } from '../api'

export default function Landing({ onSelectProduct }) {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error)
    api.getProducts().then(setProducts).catch(console.error)
  }, [])

  const heroImages = categories.map((c) => c.image).filter(Boolean)
  const featured = useMemo(() => products.slice(0, 3), [products])

  return (
    <div className="space-y-12">
      <Hero images={heroImages.length ? heroImages : ['/placeholder.jpg']} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Quick jump to categories
              </h2>
              <p className="text-slate-300">
                Tap a card to dive into full materials & looks.
              </p>
            </div>
          </div>
          <CategoryGrid categories={categories} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Signature showcase
              </h2>
              <p className="text-slate-300">
                Inspired by the luxe furniture UI you shared.
              </p>
            </div>
          </div>
          <ShowcaseCard
            items={products.slice(0, 4)}
            onSelect={onSelectProduct}
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Featured this week
              </h2>
              <p className="text-slate-300">
                Editor picks you can explore in one tap.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
