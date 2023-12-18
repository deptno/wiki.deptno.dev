import { CONFIG } from '../constant'

export function isPublicWiki(wiki: string): boolean {
  return CONFIG.filter(w => !w.private)
    .map(w => w.dir)
    .some(w => w === wiki)
}
