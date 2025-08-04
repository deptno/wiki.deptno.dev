import { getAllMd } from './getAllMd'
import { getLastModifiedFiles } from './getLastModifiedFiles'
import { basename, join } from 'node:path'
import { CONFIG, DIR_DATA } from '../constant'
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

  const dir = join(DIR_DATA, wiki.dir)
  const files = getAllMd(dir).map((f: string) => stripExt(f.replace(DIR_DATA, '')))
  const lastModified = getLastModifiedFiles(wiki)

  return {
    files,
    getMarkdowns() {
      return toMarkdown(files)
    },
    getLastModified() {
      return toMarkdown(lastModified.map(stripExt))
    },
    getRandomLatestModifiedFileName() {
      if (lastModified.length === 0) {
        return
      }
      const index = random(lastModified.length - 1)

      return basename(lastModified[index], '.md')
    },
  }
}

const file = import.meta.url
const stripExt = (f: string) => f.slice(0, -3)

export const getAllList = prodCache(_getAllList)
