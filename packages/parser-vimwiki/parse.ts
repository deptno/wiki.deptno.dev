import { link } from './link'

export function parse(markdown: string) {
  return markdown.replace(/\[\[(.+)\]\]/g, link)
}
