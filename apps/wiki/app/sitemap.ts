import { MetadataRoute } from 'next'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI_ROOT, ENDPOINT } from '../constant'
import config from '../wiki.config'
import path from 'node:path'

export default function sitemap(): MetadataRoute.Sitemap {
  const publicW = (config as Wiki[]).filter(w => !w.private)

  return publicW
    .flatMap(w => {
      const dir = path.join(DIR_WIKI_ROOT, w.dir)
      const diaryDir = path.join(dir, w.diaryDir)

      return getAllMd(dir)
        .filter(url => !url.startsWith(diaryDir))
        .map(url => url.replace(DIR_WIKI_ROOT, '').slice(0, -3))
        .map(url => {
          return {
            url: `${ENDPOINT}${url}`,
            // TODO: git 으로 부터 수정시간 기입
            lastModified: new Date(),
            changeFrequency: 'daily',
          }
        })
    })
}
