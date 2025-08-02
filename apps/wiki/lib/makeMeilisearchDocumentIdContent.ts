import { readFileSync } from 'fs'
import { makeMeilisearchDocumentId } from './makeMeilisearchDocumentId'

export function makeMeilisearchDocumentIdContent(filepath: string, key: string): T {
  const id = makeMeilisearchDocumentId(key)
  console.log(`id: ${id}, md: ${key}, filepath: ${filepath}`)
  const content = readFileSync(filepath, 'utf8').toString()


  return {
    id,
    content
  }
}

type T = {
  id: string
  content: string
}
