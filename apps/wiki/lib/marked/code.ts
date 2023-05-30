export function code(code: string, infoString: string , escaped: boolean) {
  // TODO: support language
  // console.debug({code, infoString, escaped}, code.includes('\n'))

  return `<code>${code}</code>`
}
