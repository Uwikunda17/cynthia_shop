import { useMemo, useState } from 'react'
import clsx from 'clsx'

export default function ShowcaseCard({ items = [], onSelect }) {
  const safeItems =
    items.length > 0
      ? items
      : [
          {
            name: 'Lounge Chair',
            description: 'Soft boucle upholstery with sculpted wood legs.',
            image:
              'https://images.unsplash.com/photo-1616594039964-c2c8c53c0c93?auto=format&fit=crop&w=1400&q=80',
            thumb:
              'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=400&q=80',
            price: '$820',
            label: 'Sofa',
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
    <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-soft border border-slate-800 p-6 md:p-8 text-slate-100">
      {/* background accents */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-10 w-64 h-64 bg-accent/20 blur-3xl rounded-full" />
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-accent/10 blur-3xl rounded-full" />
      </div>

      {/* top controls */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-full px-3 py-1 shadow">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActive(idx)}
              className={clsx(
                'text-xs font-semibold px-3 py-1 rounded-full transition',
                active === idx
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-black'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-full px-3 py-1 shadow">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <p className="text-xs font-semibold text-slate-700">In stock</p>
        </div>
      </div>

      {/* main media */}
        <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-[1.8fr_1fr] items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] bg-slate-900">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[380px] object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-[22px] px-5 py-3 flex items-center justify-between shadow-soft">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                Our team
              </p>
              <h3 className="text-lg font-semibold text-white">
                {product.name}
              </h3>
              <p className="text-slate-300 text-sm truncate">
                {product.description}
              </p>
            </div>
            <button
              className="w-10 h-10 rounded-full bg-accent text-white grid place-items-center"
              onClick={handleSelect}
            >
              →
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow">
            <p className="text-sm font-semibold text-white">Exclusive</p>
            <p className="text-slate-300 text-sm">
              Sleek minimal curves for relaxed posture and airy comfort.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={product.thumb || product.image}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-white">{product.price}</p>
                <p>4.9 ★ rating</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow flex flex-col gap-2">
            <p className="text-sm font-semibold text-white">
              Chair sales growth
            </p>
            <div className="h-28 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 grid place-items-center text-slate-400 text-xs">
              <span>Chart placeholder</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Total orders</span>
              <span className="font-semibold text-white">8,500</span>
            </div>
            <div className="h-10 bg-black rounded-2xl flex items-center px-3 text-white text-xs">
              Furniture sales analytics
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
