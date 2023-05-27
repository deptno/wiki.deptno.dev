export function link(matched, $1) {
  const [link, text = link] = $1.split('|')

  return `[${text}](${link})`
}
