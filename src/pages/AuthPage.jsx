import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function AuthPage({ mode = 'login', onAuthed }) {
  const isLogin = mode === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      const fn = isLogin ? api.userLogin : api.userRegister
      const { token } = await fn(email, password)
      localStorage.setItem('userToken', token)
      onAuthed?.(token)
      setMessage(isLogin ? 'Signed in' : 'Account created')
      setTimeout(() => navigate('/dashboard'), 400)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-soft p-8 space-y-6 text-slate-100">
      <div className="space-y-2 text-center">
        <p className="badge mx-auto bg-slate-800 text-slate-100 border-slate-700">
          {isLogin ? 'Welcome back' : 'Join us'}
        </p>
        <h1 className="text-3xl font-semibold text-white">
          {isLogin ? 'Sign in' : 'Create account'}
        </h1>
        <p className="text-slate-300">
          {isLogin
            ? 'Access your dashboard, profile, and saved looks.'
            : 'Set up your profile to get personalized drops.'}
        </p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2 focus:border-accent focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 text-slate-100 px-3 py-2 focus:border-accent focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {message && <p className="text-sm text-green-400">{message}</p>}
        <button type="submit" className="btn-primary w-full">
          {isLogin ? 'Login' : 'Create account'}
        </button>
        {isLogin ? (
          <p className="text-sm text-slate-300 text-center">
            New here? <a href="/register" className="text-accent">Create an account</a>
          </p>
        ) : (
          <p className="text-sm text-slate-300 text-center">
            Already registered? <a href="/login" className="text-accent">Log in</a>
          </p>
        )}
      </form>
    </div>
  )
}
