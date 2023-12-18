import { isPublicWiki } from "./isPublicWiki"
import { prodCache } from "./prodCache"

export const getPath = prodCache((paths: string[]) => {
  const [wiki, ...md] = paths.map(decodeURIComponent)
  if (!isPublicWiki(wiki)) {
    return
  }

  const path = paths.join('/')
  const currentPath = md.slice(0, -1).join('/')

  return {
    wiki,
    path,
    currentPath,
  }
})
