import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function AdminRegisterPage({ onAuthed }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      const { token } = await api.adminRegister(email, password, secret)
      onAuthed?.(token)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-soft p-8 space-y-6 text-slate-100">
      <div className="space-y-2 text-center">
        <p className="badge bg-slate-800 text-slate-100 border-slate-700">Admin registration</p>
        <h1 className="text-3xl font-semibold text-white">Create admin</h1>
        <p className="text-slate-300">Enter the secret to create an admin account.</p>
      </div>
      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-dark"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-dark"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Admin secret</label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="input-dark"
            placeholder="Secret phrase"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" className="btn-primary w-full">
          Register admin
        </button>
      </form>
    </div>
  )
}
