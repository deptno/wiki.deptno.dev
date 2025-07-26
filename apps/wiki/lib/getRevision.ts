import { readFileSync } from 'fs'
import { join } from 'path'
import { CURRENT_REVISION, DIR_DATA } from '../constant'

export const getRevision = (wiki: string) => {
  try {
    return readFileSync(join(DIR_DATA, wiki, CURRENT_REVISION)).toString()
  } catch (e) {}
}
