import { MetadataRoute } from 'next'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI_ROOT, ENDPOINT, CONFIG } from '../constant'
import path from 'node:path'
import { getLastModifiedTime } from '../lib/getlastModifiedTime'

export default function sitemap(): MetadataRoute.Sitemap {
  const publicW = CONFIG.filter(w => !w.private)

  return publicW
    .flatMap(w => {
      const dir = path.join(DIR_WIKI_ROOT, w.dir)
      const diaryDir = path.join(dir, w.diaryDir)

      return getAllMd(dir)
        .filter(url => !url.startsWith(diaryDir))
        .map(url => {
          const wikiPath = url.slice(`${DIR_WIKI_ROOT}/`.length).slice(0, -3)
          const pathname = url.slice(`${dir}/`.length)

          return {
            url: `${ENDPOINT}/${wikiPath}`,
            lastModified: getLastModifiedTime({ dir, pathname }),
            changeFrequency: 'yearly',
          }
        })
    })
}
