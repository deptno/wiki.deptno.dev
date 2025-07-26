import { RE_INDEXED_VIMWIKI, RE_NAMED_VIMWIKI } from 'parser-vimwiki/constant'

export function createVimwikiPrefixHandler(diaryDir: string) {
  return  function handleVimwikiPrefix(link: string) {
    if (link.startsWith('diary:')) {
      return link.replace('diary:', `${diaryDir}/`)
    }
    if (RE_NAMED_VIMWIKI.test(link) || RE_INDEXED_VIMWIKI.test(link)) {
      // TODO: wn.[WIKINAME]:[PATH] 패턴 처리
      // TODO: wiki1:[PATH] 패턴 처리
      // 현재는 위키가 하나라서 추후 여기서 핸들링해야한다. 마크다운 렌더러 처리도 함께 진행 필요
      // https://github.com/deptno/wiki.deptno.dev/blob/21b5cf10e3593f220311acb999830470cb4716b2/apps/wiki/lib/marked/link.ts#L22
      return
    }

    return link
  }
}
