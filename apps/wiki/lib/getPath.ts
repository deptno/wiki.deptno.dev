import { prodCache } from './prodCache'

export const getPath = prodCache((paths: string[]) => {
  const decodedPaths = paths.map(decodeURIComponent)
  const last = decodedPaths.pop()
  const [wiki, ...md] = decodedPaths

  const path = paths.join('/')
  const isIndex = last === 'index'
  const currentPath = isIndex
    ? `/${decodedPaths.join('/')}`
    : md.join('/')

  return {
    wiki,
    path,
    currentPath,
  }
})
