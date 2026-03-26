import { useEffect, useState } from 'react'
import { api } from '../api'

export default function DashboardPage({ token }) {
  const [orders, setOrders] = useState([])
  const [me, setMe] = useState(null)

  useEffect(() => {
    if (!token) return
    api.getMe(token).then(setMe).catch(() => setMe(null))
    api.getMyOrders(token).then(setOrders).catch(() => setOrders([]))
  }, [token])

  const cards = [
    { label: 'Orders', value: orders.length.toString(), hint: 'Latest below' },
    { label: 'Wishlist', value: '—', hint: 'Coming soon' },
    { label: 'Credits', value: '$0', hint: 'Earn with purchases' },
  ]

  return (
    <div className="space-y-8 text-slate-100">
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="badge bg-slate-800 text-slate-100 border-slate-700">Client dashboard</p>
            <h1 className="text-3xl font-semibold text-white">
              Welcome back{me ? `, ${me.email}` : ''}
            </h1>
            <p className="text-slate-300">
              Track your shopping, style notes, and perks in one place.
            </p>
          </div>
          <button className="btn-primary">Start styling</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <p className="text-sm text-slate-400">{c.label}</p>
              <p className="text-3xl font-semibold text-white">{c.value}</p>
              <p className="text-sm text-slate-300">{c.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-white">Your orders</h2>
        <div className="grid gap-3">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div>
                <p className="font-semibold text-white">Order #{o.id}</p>
                <p className="text-sm text-slate-400">Status: {o.status}</p>
              </div>
              <span className="text-accent font-semibold">${o.total || '0.00'}</span>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-slate-400 text-sm">No orders yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
