import fs from 'node:fs'
import { join, extname } from 'node:path'

export function getAllMd(rootDir: string) {
  const files = fs.readdirSync(rootDir, {
    withFileTypes: true,
  })

  const subDirAllMd = files
      .filter((f) => f.isDirectory())
      .filter((f) => !f.name.startsWith('.'))
      .flatMap((d) => getAllMd(join(rootDir, d.name)))

  return files
    .filter((f) => {
      return f.isFile()
    })
    .filter((f) => {
      return extname(f.name) === '.md'
    })
    .map((f) => `${rootDir}/${f.name}`)
    .concat(subDirAllMd)
}
