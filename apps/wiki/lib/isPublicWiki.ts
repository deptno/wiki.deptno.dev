import { CONFIG } from '../constant'

export async function isPublicWiki(wiki: string): boolean {
  return CONFIG.filter(w => !w.private)
    .map(w => w.dir)
    .includes(wiki)
}
