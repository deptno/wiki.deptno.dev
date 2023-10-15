import { readFileSync } from 'node:fs'
import { getAllMd } from './getAllMd.mjs'

export const getMarkdownFiles = async (dir: string) => {
  const files = getAllMd(dir)
  const contents = files.map((md: string) => {
    const name = md
      .replace(`${dir}/`, '')
      .slice(0, -3)
    const id = Buffer.from(name).toString('hex')

    return {
      id: id,
      content: readFileSync(md).toString()
    }
  })

  return contents
}
