import { createRelativeLinkReplacer } from 'parser-vimwiki'
import { getMarkdown } from './getMarkdown'
import { marked } from './marked'

export async function getHtml(params: Params) {
  const { path, currentPath } = params
  const replacer = createRelativeLinkReplacer(currentPath)
  const markdown = await getMarkdown(path).then(replacer)

  return marked(markdown)
}

type Params = {
  path: string
  currentPath: string
}
