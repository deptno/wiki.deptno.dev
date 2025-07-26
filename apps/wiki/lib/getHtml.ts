import { createRelativeLinkReplacer } from 'parser-vimwiki'
import { getMarkdown } from './getMarkdown'
import { getMarked } from './getMarked'

export async function getHtml(params: Params) {
  const { wiki, path, currentPath } = params
  const replacer = createRelativeLinkReplacer(currentPath)
  const markdown = await getMarkdown(path).then(replacer)
  const { parse } = getMarked({ wiki })

  return parse(markdown)
}

type Params = {
  wiki: string
  // 렌더링할 파일에 대한 path
  path: string
  // 링크를 그릴때 base 가 될 path
  currentPath: string
}
