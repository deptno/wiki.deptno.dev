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
  // 렌더링할 파일에 대한 path
  path: string
  // 링크를 그릴때 base 가 될 path
  currentPath: string
}
