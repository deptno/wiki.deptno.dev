import { readFileSync } from 'node:fs'
import { getAllMd } from './getAllMd.mjs'

export const getMarkdownFiles = async (dir: string) => {
  const files = getAllMd(dir)
  const contents = files
    .map((md: string) => md.toLowerCase())
    .map((md: string) => {
      const name = md.replace(`${dir}/`, '').slice(0, -3)
      const id = Buffer.from(name).toString('hex')

      console.log(`id: ${id}, md: ${md}, name: ${name}`)

      return {
        id: id,
        content: readFileSync(md).toString(),
      }
    })

  return contents
}
