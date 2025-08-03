import { execSync } from 'node:child_process'
import { DIR_DATA } from '../constant'
import path from 'node:path'

export function getLastModifiedFiles(wiki: Wiki): string[] {
  const dir = path.join(DIR_DATA, wiki.dir)
  const hash = execSync(`git -C ${dir} log --since="30 days ago" --pretty=format:"%H" | tail -1`)
    .toString()
    .trim()

  if (!hash) {
    return []
  }

  const command = `git -C ${dir} diff ${hash}.. --numstat | cat`
  const result = execSync(command, { encoding: 'utf-8' }).toString()
  const handleAwkResult = (l: string): string => {
    const [_, __, filename] = l.split('\t')

    return filename
  }

  return result
    .split('\n')
    .filter(Boolean)
    .map(handleAwkResult)
    .filter((v) => !v.startsWith(`${wiki.diaryDir}/`))
    .map((v) => path.join(wiki.dir, v))
}
