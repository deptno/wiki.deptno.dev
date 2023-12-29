import { isPublicWiki } from './isPublicWiki'
import { prodCache } from './prodCache'

export const getPath = prodCache((paths: string[]) => {
  const [wiki, ...md] = paths.map(decodeURIComponent)
  if (!isPublicWiki(wiki)) {
    return
  }

  const path = paths.join('/')
  const isIndex = paths[paths.length - 1] === 'index'
  const currentPath = isIndex
    ? `/${wiki}/${md.slice(0, -1).join('/')}`
    : md.slice(0, -1).join('/')

  return {
    wiki,
    path,
    currentPath,
  }
})
