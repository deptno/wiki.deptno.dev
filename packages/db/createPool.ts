import { Pool } from 'pg'
import { fileURLToPath } from 'url'

export function createPool(params: Params) {
  const { max } = params
  const databaseUrl = process.env.DATABASE_URL

  if (databaseUrl && !databaseUrl.startsWith('postgres://') && !databaseUrl.startsWith('postgresql://')) {
    console.warn({ file }, 'DATABASE_URL이 postgres 프로토콜이 아니라서 무시합니다')
    delete process.env.DATABASE_URL
  }

  const host = process.env.PGHOST

  if (host?.startsWith('http://') || host?.startsWith('https://')) {
    try {
      const parsed = new URL(host)
      process.env.PGHOST = parsed.hostname
      if (!process.env.PGPORT && parsed.port) {
        process.env.PGPORT = parsed.port
      }
    } catch (err) {
      console.error({ file, err }, 'PGHOST 파싱 실패')
    }
  }

  return new Pool({
    max,
  })
}

type Params = {
  max?: number
}

const file = fileURLToPath(import.meta.url)
