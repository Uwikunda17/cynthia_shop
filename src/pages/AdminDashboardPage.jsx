import { useEffect, useState } from 'react'
import { api } from '../api'

export default function AdminDashboardPage({ token }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({
    name: '',
    price: '',
    sizes: '',
    colors: '',
    image: '',
    description: '',
    category_id: '',
  })
  const [catForm, setCatForm] = useState({
    slug: '',
    title: '',
    description: '',
    image: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, prods, ords] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
          token ? api.getOrders(token) : [],
        ])
        setCategories(cats)
        setProducts(prods)
        if (token) setOrders(ords)
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [token])

  const saveProduct = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
        price: Number(form.price || 0),
      }
      const created = await api.createProduct(payload, token)
      setProducts([created, ...products])
      setForm({
        name: '',
        price: '',
        sizes: '',
        colors: '',
        image: '',
        description: '',
        category_id: '',
      })
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const saveCategory = async (e) => {
    e.preventDefault()
    try {
      const created = await api.createCategory(catForm, token)
      setCategories([created, ...categories])
      setCatForm({ slug: '', title: '', description: '', image: '' })
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const removeProduct = async (id) => {
    await api.deleteProduct(id, token)
    setProducts((p) => p.filter((prod) => prod.id !== id))
  }

  const updateOrderStatus = async (id, status) => {
    const updated = await api.updateOrder(id, status, token)
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
  }

  if (!token) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center text-slate-100">
        <p className="text-lg">Admin access required.</p>
        <a className="btn-primary mt-4 inline-block" href="/admin/login">
          Go to admin login
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-10 text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="badge bg-slate-800 text-slate-100 border-slate-700">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-slate-300">Manage products, categories, and orders.</p>
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={saveCategory} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-semibold text-white">Add category</h2>
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2"
            placeholder="slug"
            value={catForm.slug}
            onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2"
            placeholder="title"
            value={catForm.title}
            onChange={(e) => setCatForm({ ...catForm, title: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2"
            placeholder="image url"
            value={catForm.image}
            onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
          />
          <textarea
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2"
            placeholder="description"
            value={catForm.description}
            onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
          />
          <button className="btn-primary w-full" type="submit">
            Save category
          </button>
        </form>

        <form onSubmit={saveProduct} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-semibold text-white">Add product</h2>
          <input className="input-dark" placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input-dark" placeholder="price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input className="input-dark" placeholder="sizes (comma separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
          <input className="input-dark" placeholder="colors (comma separated)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
          <div className="space-y-2">
            <input className="input-dark" placeholder="image url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-32 object-cover rounded-xl border border-slate-800"
                onError={() => setForm((f) => ({ ...f, image: '' }))}
              />
            )}
          </div>
          <textarea className="input-dark" placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select
            className="input-dark"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <button className="btn-primary w-full" type="submit">
            Save product
          </button>
        </form>
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 overflow-x-auto">
        <h2 className="text-xl font-semibold text-white">Products</h2>
        <table className="min-w-full text-sm text-slate-200">
          <thead className="text-left text-slate-400">
            <tr className="border-b border-slate-800">
              <th className="py-2 pr-3">Image</th>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Category</th>
              <th className="py-2 pr-3">Price</th>
              <th className="py-2 pr-3">Sizes</th>
              <th className="py-2 pr-3">Colors</th>
              <th className="py-2 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-slate-900 hover:bg-slate-900/60">
                <td className="py-2 pr-3">
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-lg border border-slate-800" />
                  )}
                </td>
                <td className="py-2 pr-3 font-semibold text-white">{p.name}</td>
                <td className="py-2 pr-3 text-slate-400">{p.category_title || p.category_id}</td>
                <td className="py-2 pr-3 text-accent font-semibold">${p.price}</td>
                <td className="py-2 pr-3 text-slate-300">{(p.sizes || []).join(', ')}</td>
                <td className="py-2 pr-3 text-slate-300">{(p.colors || []).join(', ')}</td>
                <td className="py-2 pr-3">
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-xl font-semibold text-white">Orders</h2>
        <div className="grid gap-3">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div>
                <p className="font-semibold text-white">Order #{o.id}</p>
                <p className="text-sm text-slate-400">{o.user_email || 'Guest'}</p>
              </div>
              <select
                className="input-dark w-32"
                value={o.status}
                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
              >
                {['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
