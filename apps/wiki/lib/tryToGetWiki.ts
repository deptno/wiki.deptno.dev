import { CONFIG } from '../constant'

export function tryToGetWiki(wikiName: string) {
  const wiki = CONFIG.find(w => w.dir === wikiName)

  if (!wiki) {
    throw new Error(`Unknown wiki(${wikiName})`)
  }

  return wiki
}
