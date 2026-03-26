const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  getCategories: () => request('/categories'),
  getProducts: () => request('/products'),
  getMe: (token) => request('/me', { token }),
  getMyOrders: (token) => request('/me/orders', { token }),
  userRegister: (email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  userLogin: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  adminLogin: (email, password) =>
    request('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  adminRegister: (email, password, secret) =>
    request('/auth/admin/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, secret }),
    }),
  createProduct: (data, token) =>
    request('/products', { method: 'POST', body: JSON.stringify(data), token }),
  updateProduct: (id, data, token) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data), token }),
  deleteProduct: (id, token) =>
    request(`/products/${id}`, { method: 'DELETE', token }),
  createCategory: (data, token) =>
    request('/categories', { method: 'POST', body: JSON.stringify(data), token }),
  getOrders: (token) => request('/orders', { token }),
  updateOrder: (id, status, token) =>
    request(`/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }), token }),
}
