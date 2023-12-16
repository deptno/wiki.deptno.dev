import { getAllMd } from "./getAllMd"
import { getLastModifiedFiles } from "./getLastModifiedFiles"
import { basename } from "node:path"
import { DIR_WIKI } from "../constant"
import { random } from "./random"

export const getAllList = () => {
  if (cache) {
    return cache
  }

  const toMarkdown = (files: string[]) => {
    return files
      .map((f: string) => f.replace(DIR_WIKI, '').slice(0, -3))
      .reduce((markdowns: string[], file: string) => {
        return [
          ...markdowns,
          `- [${file}](${file})`,
        ]
      }, [])
      .join('\n')
  }
  const files = getAllMd(DIR_WIKI)
  const lastModified = getLastModifiedFiles()

  cache = {
    files: toMarkdown(files),
    lastModified: toMarkdown(lastModified),
    getRandomLatestModifiedFileName() {
      if (lastModified.length === 0) {
        return
      }
      const index = random(lastModified.length)

      return basename(lastModified[index], '.md')
    },
  }

  return cache
}

let cache = undefined
