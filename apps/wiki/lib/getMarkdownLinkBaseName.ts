import { dirname } from 'node:path'

export function getMakrdownLinkBaseName(source: string, link: string) {
  if (link.includes('](/')) {
    return ''
  }
  return dirname(source)
}
