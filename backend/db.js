import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:jules098765@localhost:5432/cynthia_shop'

export const pool = new pg.Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
})

export async function query(text, params) {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}
