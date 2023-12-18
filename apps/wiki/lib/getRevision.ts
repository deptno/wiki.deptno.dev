import { readFileSync } from 'fs'
import { join } from 'path'
import { CURRENT_REVISION, DIR_WIKI } from '../constant'

export const getRevision = (wiki: string) => {
  try {
    return readFileSync(join(DIR_WIKI, wiki, CURRENT_REVISION)).toString()
  } catch (e) {}
}
