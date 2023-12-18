import { readFileSync } from 'fs'
import { join } from 'path'
import { CURRENT_REVISION, DIR_WIKI_ROOT } from '../constant'

export const getRevision = (wiki: string) => {
  try {
    return readFileSync(join(DIR_WIKI_ROOT, wiki, CURRENT_REVISION)).toString()
  } catch (e) {}
}
