export function heading(text: string, level: boolean, raw: string, slugger) {
  return `<h${level} class="text-lg">${text}<h${level}>`
}
