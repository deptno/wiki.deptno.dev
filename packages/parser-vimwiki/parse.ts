import { link } from './link'
import { RE_VIMWIKI_LINK } from './constant'

export function parse(markdown: string) {
  return markdown.replace(RE_VIMWIKI_LINK, link)
}
