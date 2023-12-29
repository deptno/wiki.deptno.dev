import { RE_INDEXED_VIMWIKI } from 'parser-vimwiki/constant'
import { CONFIG } from '../../constant'

export function link(href: string, title: string, text: string) {
  try {
    const url = new URL(href)
    const { protocol } = url
    const protocolName = protocol.slice(0, -1)

    if (protocol) {
      // @ref :h vimwiki-syntax-links
      if (protocol == 'diary:') {
        // FIXME: 첫 공개 위키가 아니라 링크를 발생시킨 `Wiki.diaryDir` 로 변경해야한다
        // 렌더링이 SSR 타이밍인지라 고민을 더해야함
        const firstPublicWiki = CONFIG.find(w => !w.private)

        if (firstPublicWiki) {
          const { dir, diaryDir } = firstPublicWiki
          const diaryLink = `/${dir}/${diaryDir}/${href.slice(protocol.length)}`

          return `<a href="${diaryLink}">[${protocolName}] ${text}</a>`
        }

        return `<strike>[${protocolName}] ${text}</strike>`
      }
      if (protocol == 'https:' || protocol === 'http:') {
        const decoded = [
          url.origin,
          decodeURI(url.pathname),
          decodeURIComponent(url.search),
          decodeURIComponent(url.hash),
        ].join('')

        return `<a href="${href}" target="_blank">[URL] ${decoded}</a>`
      }
      if (
        protocol === 'file:' ||
        protocol === 'local:' ||
        protocol.startsWith('wn.') || // TODO: support wiki name
        RE_INDEXED_VIMWIKI.test(protocol)
      ) {
        return `<strike>[${protocolName}] ${text}</strike>`
      }
      if (protocol === 'mailto:') {
        const email = href.slice(protocol.length)

        // FIXME: remove hardcoded domain
        return `<a href="${href}" target="_blank">${email}</a> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}&body=from deptno.dev" target="_blank">[지메일로 보내기]</a>`
      }

      return `<a href="${href}">${text}</a>`
    }
  } catch (err) {
    // 내부링크 보정 2depth 정도 가정으로 작성됨
    const splited = href.split('/')
    const parentIndex = splited.findIndex(p => p === '..')

    if (parentIndex > 0) {
      const stripHref = splited.filter((_, i) => i >= parentIndex)
      const nextHref = stripHref.join('/')

      return link(nextHref, title, text)
    }
    if (href.startsWith('/')) {
      return `<a href="${href}">${text}</a>`
    }
    if (href.startsWith('../')) {
      return `<a href="${href}">${text}</a>`
    }
    if (href.includes(text) && href !== text) {
      return `<a href="${text}">${text}</a>`
    }

    return `<a href="${href}">${text}</a>`
  }
}
