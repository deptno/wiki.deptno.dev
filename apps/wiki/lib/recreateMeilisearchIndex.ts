import { makeMeilisearchDocumentIdContent } from './makeMeilisearchDocumentIdContent'
import { DIR_DATA, MEILI_MASTER_KEY, MEILISEARCH_HOST } from '../constant'
import path from 'path'
import { getAllMd } from './getAllMd'
import { basename } from 'node:path'

export async function recreateMeilisearchIndex(params: Params) {
  console.debug({ file, params })
  const { index } = params

  // Helper to build common headers
  const msHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (MEILI_MASTER_KEY) {
    msHeaders['Authorization'] = `Bearer ${MEILI_MASTER_KEY}`
  }

  // Delete index if it exists
  await fetch(`${MEILISEARCH_HOST}/indexes/${index}`, {
    method: 'DELETE',
    headers: msHeaders,
  })

  // Recreate index with primary key
  await fetch(`${MEILISEARCH_HOST}/indexes`, {
    method: 'POST',
    headers: msHeaders,
    body: JSON.stringify({
      uid: index,
      primaryKey: 'id',
    }),
  })

  // Map file paths to Meilisearch document IDs
  const files = getAllMd(path.join(DIR_DATA, index))
    .map(t => makeMeilisearchDocumentIdContent(t, basename(t)))

  // Upsert (create/update) documents for added and modified files
  if (files.length > 0) {
    const upsertRes = await fetch(`${MEILISEARCH_HOST}/indexes/${index}/documents`, {
      method: 'POST',
      headers: msHeaders,
      body: JSON.stringify(files),
    })
    const upsertJson = await upsertRes.json()
    console.dir(
      {
        action: 'upsert',
        index,
        documents: files,
        task: upsertJson,
      },
      { depth: null, maxArrayLength: 2, maxStringLength: 80 },
    )
  }
}

type Params = {
  index: string
}

const file = import.meta.url
