export function heading(text: string, level: boolean, raw: string, slugger) {
  return `<h${level}>${text}<h${level}>`
}
