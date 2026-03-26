import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'

export default function DashboardPage({ token }) {
  const [orders, setOrders] = useState([])
  const [me, setMe] = useState(null)

  useEffect(() => {
    if (!token) return
    api.getMe(token).then(setMe).catch(() => setMe(null))
    api.getMyOrders(token).then(setOrders).catch(() => setOrders([]))
  }, [token])

  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + Number(o.total || 0), 0),
    [orders],
  )
  const lastOrder = orders[0]
  const tier =
    totalSpent > 1000 ? 'Platinum' : totalSpent > 500 ? 'Gold' : totalSpent > 200 ? 'Silver' : 'Starter'
  const nextTierTarget = tier === 'Platinum' ? 0 : tier === 'Gold' ? 1000 : tier === 'Silver' ? 500 : 200
  const progress = nextTierTarget
    ? Math.min(100, Math.round((totalSpent / nextTierTarget) * 100))
    : 100

  if (!token) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center text-slate-100 space-y-3">
        <p className="text-lg font-semibold">Please log in</p>
        <p className="text-slate-400">Sign in to see your orders and perks.</p>
        <a href="/login" className="btn-primary inline-block">Login</a>
      </div>
    )
  }

  const cards = [
    { label: 'Orders', value: orders.length.toString(), hint: 'Latest below' },
    { label: 'Total spend', value: `$${totalSpent.toFixed(2)}`, hint: lastOrder ? `Last ${new Date(lastOrder.created_at).toLocaleDateString()}` : 'No orders yet' },
    { label: 'Tier', value: tier, hint: tier === 'Platinum' ? 'Top tier' : `${100 - progress}% to next` },
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

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 overflow-x-auto">
          <h2 className="text-xl font-semibold text-white">Your orders</h2>
          <table className="min-w-full text-sm text-slate-200">
            <thead className="text-left text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Placed</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-slate-900">
                  <td className="py-2 pr-3 font-semibold text-white">#{o.id}</td>
                  <td className="py-2 pr-3 text-slate-300">
                    {o.created_at ? new Date(o.created_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-2 pr-3">
                    <span className="badge bg-slate-800 border-slate-700 text-slate-100">{o.status}</span>
                  </td>
                  <td className="py-2 pr-3 text-accent font-semibold">${Number(o.total || 0).toFixed(2)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td className="py-3 pr-3 text-slate-400" colSpan={4}>
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Loyalty tier</p>
              <p className="text-2xl font-semibold text-white">{tier}</p>
            </div>
            <span className="badge bg-slate-800 border-slate-700 text-slate-100">
              ${totalSpent.toFixed(2)} spent
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-slate-300">
            {tier === 'Platinum'
              ? 'You are at the top tier.'
              : `${100 - progress}% to next tier (${nextTierTarget} total).`}
          </p>
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <p className="text-sm text-slate-400">Next perk</p>
            <p className="text-white font-semibold">Free express shipping</p>
            <p className="text-slate-300 text-sm">Unlocked at next tier.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
