import { Commit, getFinalChanges } from './getFinalChanges'
import { makeMeilisearchDocumentId } from './makeMeilisearchDocumentId'
import { MEILI_MASTER_KEY, MEILISEARCH_HOST } from '../constant'

export async function updateMeilisearchDocuments(params: Params) {
  const { index, commits } = params
  const { added, modified, removed } = getFinalChanges(commits)

  // Map file paths to Meilisearch document IDs
  const addedIds = added.map(makeMeilisearchDocumentId)
  const modifiedIds = modified.map(makeMeilisearchDocumentId)
  const removedIds = removed.map(makeMeilisearchDocumentId)

  const allUpserts = [...addedIds, ...modifiedIds]

  // Helper to build common headers
  const msHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (MEILI_MASTER_KEY) {
    msHeaders['Authorization'] = `Bearer ${MEILI_MASTER_KEY}`
  }

  // 1. Upsert (create/update) documents for added and modified files
  if (allUpserts.length > 0) {
    const upsertPayload = allUpserts.map(id => ({ id }))
    const upsertRes = await fetch(`${MEILISEARCH_HOST}/indexes/${index}/documents`, {
      method: 'POST',
      headers: msHeaders,
      body: JSON.stringify(upsertPayload),
    })
    const upsertJson = await upsertRes.json()
    console.info({
      action: 'upsert',
      index,
      documents: allUpserts,
      task: upsertJson,
    })
  }

  // 2. Delete documents for removed files
  if (removedIds.length > 0) {
    const deleteRes = await fetch(`${MEILISEARCH_HOST}/indexes/${index}/documents/delete-batch`, {
      method: 'POST',
      headers: msHeaders,
      body: JSON.stringify(removedIds),
    })
    const deleteJson = await deleteRes.json()
    console.info({
      action: 'delete',
      index,
      documents: removedIds,
      task: deleteJson,
    })
  }
}

type Params = {
  index: string
  commits: Commit[]
}
