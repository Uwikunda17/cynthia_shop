import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function AdminLoginPage({ onAuthed }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      const { token } = await api.adminLogin(email, password)
      onAuthed?.(token)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-soft p-8 space-y-6 text-slate-100 mt-16">
      <div className="space-y-2 text-center">
        <p className="badge bg-slate-800 text-slate-100 border-slate-700">
          Admin access
        </p>
        <h1 className="text-3xl font-semibold text-white">Admin sign in</h1>
        <p className="text-slate-300">Restricted area. Use admin credentials.</p>
      </div>
      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2 focus:border-accent focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
      </form>
    </div>
  )
}
