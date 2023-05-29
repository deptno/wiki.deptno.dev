export function code(code: string, infoString: string , escaped: boolean) {
  // TODO: support language
  // console.debug({code, infoString, escaped})

  return `<code class="whitespace-pre-wrap">${code}</code>`
}
