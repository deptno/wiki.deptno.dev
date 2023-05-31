import { RE_MARKDOWN_LINK } from 'parser-vimwiki/constant'
import { sanitize } from '../sanitize'

export function code(code: string, infoString: string , escaped: boolean) {
  // TODO: support language
  // console.debug({code, infoString, escaped}, code.includes('\n'))
  return `<code>${sanitize(code.replace(RE_MARKDOWN_LINK, '$1'))}</code>`
}
