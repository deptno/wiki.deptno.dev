import { execSync } from 'node:child_process'
import { DIR_WIKI } from '../constant'
import { Wiki } from '../wiki.config'
import path from 'node:path'

export function getLastModifiedFiles(wiki: Wiki): string[] {
  const dir = path.join(DIR_WIKI, wiki.dir)
  const command = `
git -C ${dir} diff $(git -C ${dir} log --since="30 days ago" --pretty=format:"%H" | tail -1).. --stat |
sed '$d' |
awk -F'|' '{ print $2 $1 }' |
sort -nr |
awk '{ print $1 " " $3 " " $4 " " $5 }'`
  const result = execSync(command).toString()
  const handleAwkResult = (l: string): [number, string] => {
    const [modifiedLineCount, ...rest] = l.split(' ')

    return [ Number(modifiedLineCount), rest.reverse().find(Boolean) ]
  }

  return result.split('\n')
    .map(handleAwkResult)
    .filter((v) => v[0] > 0)
    .map((v) => v[1])
    .filter((v) => !v.startsWith(`${wiki.diaryDir}/`))
}
