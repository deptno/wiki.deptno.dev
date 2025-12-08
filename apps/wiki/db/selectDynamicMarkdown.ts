import { fileURLToPath } from 'url'
import { getPool } from './getPool'

export async function selectDynamicMarkdown(params: Params) {
  console.debug({ file, params })

  const { schema = 'public', table, idColumn, markdownColumn, idValue } = params
  const pool = getPool()

  if ([schema, table, idColumn, markdownColumn].some(part => !VALID_IDENTIFIER.test(part))) {
    console.error({ file, params }, '잘못된 식별자 감지')

    return null
  }

  const client = await pool.connect()

  try {
    const query = `select "${markdownColumn}" from "${schema}"."${table}" where "${idColumn}" = $1 limit 1`
    const result = await client.query<Row>(query, [idValue])
    const row = result.rows.at(0)

    if (!row) {
      return null
    }

    const value = row[markdownColumn]

    if (typeof value === 'string') {
      return value
    }

    return null
  } finally {
    client.release()
  }
}

type Params = {
  schema?: string
  table: string
  idColumn: string
  markdownColumn: string
  idValue: string
}

type Row = Record<string, string | null>

const VALID_IDENTIFIER = /^[A-Za-z0-9_]+$/
const file = fileURLToPath(import.meta.url)
