export function list(text: string, ordered: boolean, start: number) {
  const tag = ordered ? 'ol' : 'ul'

  return `<${tag}>${text}</${tag}>`
}
