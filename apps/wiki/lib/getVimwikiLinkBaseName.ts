import { dirname } from 'node:path'

export function getVimwikiLinkBaseName(source: string, link: string) {
  if (link.includes('](/')) {
    return ''
  }
  return dirname(source)
}
