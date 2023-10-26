export function handleVimwikiPrefix(link: string) {
  if (link.startsWith('diary:')) {
    // FIXME: diary:
    // `diary:` prefix 는 `diary/` 와 달리 vimwiki 설정에 의해서 디렉토리명이 정해진다
    // 환경값으로 받아야한다, default: diary
    // 아래코드는 markdown 렌더링쪽에서 핸들링하는데 같은 로직으로 동작해야한다
    // https://github.com/deptno/deptno.dev/blob/21b5cf10e3593f220311acb999830470cb4716b2/apps/wiki/lib/marked/link.ts#L9
    return link.replace('diary:', 'diary/')
  }
  if (reWikiRef.test(link)) {
    // TODO: wn.[WIKINAME]:[PATH] 패턴 처리
    // 현재는 위키가 하나라서 추후 여기서 핸들링해야한다. 마크다운 렌더러 처리도 함께 진행 필요
    // https://github.com/deptno/deptno.dev/blob/21b5cf10e3593f220311acb999830470cb4716b2/apps/wiki/lib/marked/link.ts#L22
    return
  }

  return link
}

const reWikiRef = /wn\.\w+:\w+/
