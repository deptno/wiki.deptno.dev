import { RE_VIMWIKI_LINK } from './constant'

/**
 * 마크다운을 받아서 처리한다 currentPath 가 있고 로컬 링크인 경우(protocol 이 없는 경우) 루트 기준의 로컬 링크 생성
 * @param currentPath
 */
export function createRelativeLinkReplacer(currentPath?: string) {
  return (markdown: string) => {
    return markdown.replace(RE_VIMWIKI_LINK, (matched, $1) => {
      const [link, text = link] = $1.split('|')

      try {
        new URL(link)
      } catch (err) {
        if (currentPath) {
          return `[${text}](${currentPath}/${link})`
        }
      }

      return `[${text}](${link})`
    })
  }
}
