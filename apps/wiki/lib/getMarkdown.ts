import { DIR_WIKI_ROOT } from '../constant'
import { prodCache } from './prodCache'
import fs from 'node:fs/promises'

export const getMarkdown = prodCache(async (path: string) => {
  const filepath = decodeURIComponent(`${DIR_WIKI_ROOT}/${path}.md`).toLowerCase()

  return await fs.readFile(filepath).then(buffer => buffer.toString())
})

const file = import.meta.url
