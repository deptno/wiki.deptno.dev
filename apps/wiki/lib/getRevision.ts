import { readFileSync } from 'fs'
import { join } from 'path'
import { CURRENT_REVISION, DIR_WIKI } from '../constant'

export const getRevision = () => {
  try {
    return readFileSync(join(DIR_WIKI, CURRENT_REVISION)).toString()
  } catch (e) {}
}
