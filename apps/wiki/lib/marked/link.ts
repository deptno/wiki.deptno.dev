import { RE_INDEXED_VIMWIKI } from 'parser-vimwiki/constant'
import { DIR_DIARY } from '../../constant'

export function link(href: string, title: string, text: string) {
  try {
    const url = new URL(href)
    const { protocol } = url
    const protocolName = protocol.slice(0, -1)

    if (protocol) {
      // @ref :h vimwiki-syntax-links
      if (protocol == 'diary:') {
        return `<a href="/wiki/${DIR_DIARY}/${href.slice(
          protocol.length,
        )}">[${protocolName}] ${text}</a>`
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

        return `<a href="${href}" target="_blank">${email}</a> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}&body=from deptno.dev" target="_blank">[지메일로 보내기]</a>`
      }

      return `<a href="/wiki/${href}">${text}</a>`
    }
  } catch (err) {
    return `<a href="/wiki/${href}">${text}</a>`
  }
}
