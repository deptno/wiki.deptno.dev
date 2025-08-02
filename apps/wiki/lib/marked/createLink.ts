import { CONFIG, NEXT_PUBLIC_ENDPOINT } from '../../constant'
import { RE_INDEXED_VIMWIKI } from 'parser-vimwiki/constant'

export function createLink(params: Params) {
  const { wiki } = params
  const { dir, diaryDir } = CONFIG.find(w => w.dir === wiki)

  return function link(href: string, title: string, text: string) {
    try {
      const url = new URL(href)
      const { protocol } = url
      const protocolName = protocol.slice(0, -1)

      if (protocol) {
        // @ref :h vimwiki-syntax-links
        if (protocol === 'diary:') {
          const diaryLink = `/${dir}/${diaryDir}/${href.slice(protocol.length)}`

            return `<a href="${diaryLink}">[${protocolName}] ${text}</a>`

          return `<strike>[${protocolName}] ${text}</strike>`
        }
        if (protocol.startsWith('wn.')) {
          const name = protocol.slice('wn.'.length, -1)
          const wiki = CONFIG.find(w => w.name === name)
          if (wiki) {
            const diaryLink = `/${wiki.dir}/${href.slice(protocol.length)}`

            return `<a href="${diaryLink}">[${protocolName}] ${text}</a>`
          }
          return `<strike>[error:${protocolName}] ${text}</strike>`
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
          RE_INDEXED_VIMWIKI.test(protocol)
        ) {
          return `<strike>[${protocolName}] ${text}</strike>`
        }
        if (protocol === 'mailto:') {
          const email = href.slice(protocol.length)

          return `<a href="${href}" target="_blank">${email}</a> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}&body=from ${NEXT_PUBLIC_ENDPOINT}" target="_blank">[지메일로 보내기]</a>`
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
}

type Params = {
  wiki: string
}
