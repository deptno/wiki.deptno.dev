export function heading(text: string, level: boolean, raw: string, slugger) {
  console.log('heading', {text, level, raw, slugger})
  return `<h${level}>${text}<h${level}>`
}
