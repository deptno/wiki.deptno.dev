import { DIR_WIKI_ROOT } from '../constant'
import { prodCache } from './prodCache'
import fs from 'node:fs/promises'

export const getMarkdown = prodCache(async (path: string) => {
  const file = decodeURIComponent(`${DIR_WIKI_ROOT}/${path}.md`).toLowerCase()

  return await fs.readFile(file).then(buffer => buffer.toString())
})
