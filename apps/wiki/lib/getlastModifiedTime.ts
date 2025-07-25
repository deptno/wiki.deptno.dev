import { execSync } from 'node:child_process'

export function getLastModifiedTime(params: Params): Date {
  const { dir, pathname } = params

  try {
    const command = `git -C ${dir} log -1 --format="%cI" -- "${pathname}"`
    const result = execSync(command)
      .toString()
      .trim()

    return new Date(result)
  } catch(err) {
    console.warn({ err, file, dir, pathname }, 'fail to get log')

    return new Date()
  }
}

const file = import.meta.url

type Params = {
  dir: string
  pathname: string
}
