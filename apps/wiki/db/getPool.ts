import { createPool } from 'db/createPool'
import { fileURLToPath } from 'url'
import { PG_MAX_CONNECTION } from '../constant'

export function getPool(params: Params = {}) {
  console.debug({ file, params })

  if (__pool) {
    return __pool
  }

  __pool = createPool({
    max: PG_MAX_CONNECTION,
  })

  return __pool
}

type Params = Record<string, never>

let __pool: ReturnType<typeof createPool>
const file = fileURLToPath(import.meta.url)
