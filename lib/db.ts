import mysql from 'mysql2/promise'

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3310'),
  user: process.env.DB_USER || 'drwfoundation',
  password: process.env.DB_PASSWORD || 'drw123456',
  database: process.env.DB_NAME || 'drwfoundation',
}

// Create connection pool
let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }
  return pool
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const connection = await getPool().getConnection()
  try {
    const [rows] = await connection.execute(sql, params)
    return rows as T[]
  } finally {
    connection.release()
  }
}

export default { getPool, query }
