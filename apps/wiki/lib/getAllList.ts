import { getAllMd } from './getAllMd'
import { getLastModifiedFiles } from './getLastModifiedFiles'
import { basename, join } from 'node:path'
import { CONFIG, DIR_WIKI_ROOT } from '../constant'
import { random } from './random'
import { prodCache } from './prodCache'

function _getAllList(wikiName: string) {
  const toMarkdown = (files: string[]) => {
    return files
      .reduce((markdowns: string[], file: string) => {
        return [...markdowns, `- [${file}](${file})`]
      }, [])
      .join('\n')
  }

  const wiki = CONFIG.find(w => w.dir === wikiName)
  if (!wiki) {
    throw new Error(`Unknown wiki(${wikiName})`)
  }

  const dir = join(DIR_WIKI_ROOT, wiki.dir)
  const files = getAllMd(dir)
    .map((f: string) => f.replace(DIR_WIKI_ROOT, ''))
    .map(stripExt)

  const markdowns = toMarkdown(files)
  const lastModified = getLastModifiedFiles(wiki)

  return {
    files,
    markdowns,
    lastModified: toMarkdown(lastModified.map(stripExt)),
    getRandomLatestModifiedFileName() {
      if (lastModified.length === 0) {
        return
      }
      const index = random(lastModified.length)

      return basename(lastModified[index], '.md')
    },
  }
}

const file = import.meta.url
const stripExt = (f: string) => f.slice(0, -3)

export const getAllList = prodCache(_getAllList)
