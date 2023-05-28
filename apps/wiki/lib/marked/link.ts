export function link(href: string, title: string, text: string) {
  try {
    const {protocol} = new URL(href)
    const protocolName = protocol.slice(0, -1)

    switch (protocol) {
      case 'diary:':
        return `<a href="/wiki/${href}">[${protocolName}] ${text}</a>`
      case 'https:':
      // fall through
      case 'http:':
        return `<a href="${href}" target="_blank">[URL] ${text}</a>`
      default:
        return `<strike href=${href}>[${protocolName}] ${text}</strike>`
    }
  } catch (err) {
    // local 링크
    return `<a href="/wiki/${href}">${text}</a>`
  }
}
