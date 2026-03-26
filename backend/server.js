import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from './db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

function authGuard(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.admin = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

function userGuard(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/auth/admin/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const adminRes = await query('SELECT id, email, password_hash FROM admins WHERE email=$1', [email])
  const admin = adminRes.rows[0]
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' })
  const match = await bcrypt.compare(password, admin.password_hash)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '12h' })
  res.json({ token })
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const existing = await query('SELECT 1 FROM users WHERE email=$1', [email])
  if (existing.rowCount) return res.status(400).json({ error: 'Email already registered' })
  const hash = await bcrypt.hash(password, 10)
  const { rows } = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id, email',
    [email, hash],
  )
  const token = jwt.sign({ id: rows[0].id, email }, JWT_SECRET, { expiresIn: '12h' })
  res.status(201).json({ token })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const { rows } = await query('SELECT id, email, password_hash FROM users WHERE email=$1', [email])
  const user = rows[0]
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' })
  res.json({ token })
})

app.get('/api/me', userGuard, async (req, res) => {
  const { rows } = await query('SELECT id, email FROM users WHERE id=$1', [req.user.id])
  res.json(rows[0])
})

app.get('/api/me/orders', userGuard, async (req, res) => {
  const { rows } = await query(
    'SELECT id, status, total, created_at FROM orders WHERE user_id=$1 ORDER BY created_at DESC',
    [req.user.id],
  )
  res.json(rows)
})

app.get('/api/categories', async (_req, res) => {
  const { rows } = await query('SELECT id, slug, title, description, image FROM categories ORDER BY title')
  res.json(rows)
})

app.post('/api/categories', authGuard, async (req, res) => {
  const { slug, title, description, image } = req.body || {}
  const { rows } = await query(
    'INSERT INTO categories (slug, title, description, image) VALUES ($1,$2,$3,$4) RETURNING *',
    [slug, title, description, image],
  )
  res.status(201).json(rows[0])
})

app.get('/api/products', async (_req, res) => {
  const { rows } = await query(
    'SELECT p.*, c.title AS category_title, c.slug AS category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC',
  )
  res.json(rows)
})

app.post('/api/products', authGuard, async (req, res) => {
  const { name, price, sizes = [], colors = [], image, description, category_id } = req.body || {}
  const { rows } = await query(
    `INSERT INTO products (name, price, sizes, colors, image, description, category_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [name, price, sizes, colors, image, description, category_id],
  )
  res.status(201).json(rows[0])
})

app.put('/api/products/:id', authGuard, async (req, res) => {
  const { id } = req.params
  const { name, price, sizes = [], colors = [], image, description, category_id } = req.body || {}
  const { rows } = await query(
    `UPDATE products SET name=$1, price=$2, sizes=$3, colors=$4, image=$5, description=$6, category_id=$7, updated_at=now()
     WHERE id=$8 RETURNING *`,
    [name, price, sizes, colors, image, description, category_id, id],
  )
  res.json(rows[0])
})

app.delete('/api/products/:id', authGuard, async (req, res) => {
  const { id } = req.params
  await query('DELETE FROM products WHERE id=$1', [id])
  res.status(204).end()
})

app.get('/api/orders', authGuard, async (_req, res) => {
  const { rows } = await query(
    'SELECT o.*, u.email as user_email FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC',
  )
  res.json(rows)
})

app.patch('/api/orders/:id', authGuard, async (req, res) => {
  const { id } = req.params
  const { status } = req.body || {}
  const { rows } = await query(
    'UPDATE orders SET status=$1, updated_at=now() WHERE id=$2 RETURNING *',
    [status, id],
  )
  res.json(rows[0])
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
