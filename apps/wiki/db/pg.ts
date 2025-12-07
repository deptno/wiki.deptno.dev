import { Pool } from 'pg'
import process from 'node:process'
import { fileURLToPath } from 'url'
import { PG_MAX_CONNECTION } from '../constant'

export async function pg(params: Params = {}) {
  try {
    return await pool.connect()
  } catch (err) {
    console.error({ file, err }, 'DB 연결 오류:')
    const maybeErr = err as Error & { code?: string }

    if (maybeErr.code === 'ECONNREFUSED') {
      console.error({ file }, 'DB 연결 거부 감지, 프로세스 종료')
      queueMicrotask(() => {
        process.exit(1)
      })
    }

    throw err
  }
}

type Params = Record<string, never>

const pool = new Pool({
  max: PG_MAX_CONNECTION
})

const file = fileURLToPath(import.meta.url)
