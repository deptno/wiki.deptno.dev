import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
import { getAllMd } from './getAllMd.mjs'

export const getMarkdownFiles = async (dir: string) => {
  const files = getAllMd(dir)
  const contents = files.map((md) => {
    const name = basename(md, '.md')
    const id = Buffer.from(name).toString('hex')

    return {
      id: id,
      content: readFileSync(md).toString()
    }
  })

  console.dir(contents, { maxArrayLength: 1, depth: null })

  return contents
}
