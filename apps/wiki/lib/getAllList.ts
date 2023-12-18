import { getAllMd } from './getAllMd'
import { getLastModifiedFiles } from './getLastModifiedFiles'
import path, { basename } from 'node:path'
import { CONFIG, DIR_WIKI } from '../constant'
import { random } from './random'

export const getAllList = () => {
  if (cache) {
    return cache
  }

  const toMarkdown = (files: string[]) => {
    return files
      .reduce((markdowns: string[], file: string) => {
        return [...markdowns, `- [${file}](${file})`]
      }, [])
      .join('\n')
  }

  const wikis = CONFIG
    .filter((w) => !w.private)
    .map((w) => w.dir)
  const files = wikis.flatMap((wiki) => {
    const dir = path.join(DIR_WIKI, wiki)

    return getAllMd(dir)
      .map((f: string) => f.replace(DIR_WIKI, ''))
      .map(stripExt)
  })

  const markdowns = toMarkdown(files)
  // FIXME: CONFIG[0],  getAllList 함수가 wiki를 인자로 받는게 안전할 것
  const lastModified = getLastModifiedFiles(CONFIG[0])
  console.table(lastModified)

  cache = {
    files,
    markdowns,
    lastModified: toMarkdown(lastModified.map(stripExt)),
    getRandomLatestModifiedFileName() {
      if (lastModified.length === 0) {
        return
      }
      const index = random(lastModified.length)

      return stripExt(lastModified[index])
    },
  }

  return cache
}

let cache = undefined
const stripExt = (f: string) => basename(f, '.md')
