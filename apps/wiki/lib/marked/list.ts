export function list(text: string, ordered: boolean, start: number) {
  const tag = ordered ? 'ol' : 'ul'

  return `<${tag} class="list-disc">${text}</${tag}>`
}
