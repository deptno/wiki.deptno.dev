import fs from 'node:fs'
import { join, extname } from 'node:path'

export function getLastModifiedFiles(args: Args): string[] {
  const { rootDir, subDir, _inLoop } = args
  const all = fs.readdirSync(rootDir, { withFileTypes: true })
  const md = all
    .filter((f) => f.isFile())
    .filter((f) => extname(f.name) === '.md')
    .map((f) => `${rootDir}/${f.name}`)
  const subDirAllMd = subDir
    ? all
        .filter((f) => f.isDirectory())
        .filter((f) => !f.name.startsWith('.'))
        .flatMap((d) => getLastModifiedFiles({
          rootDir: join(rootDir, d.name),
          _inLoop: true,
          subDir,
        }))
    : []
  const ret = [
    ...md,
    ...subDirAllMd
  ]

  if (_inLoop) {
    return ret
  }

  return ret
    .map((name) => {
      return {
        name,
        time: fs.statSync(name).mtime.getTime(),
      }
    })
    .sort((a, b) => b.time - a.time)
    .map((f) => f.name)
}

type Args = {
  rootDir: string
  subDir?: boolean
  _inLoop?: boolean
}
