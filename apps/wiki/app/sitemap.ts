import { MetadataRoute } from 'next'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI, ENDPOINT } from '../constant'

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllMd(DIR_WIKI)
    .filter((url) => {
      return !url.startsWith(`${DIR_WIKI}/diary`)
    })
    .map((url) => {
      return url
        .replace(DIR_WIKI, '')
        .slice(0, -3)
    })
    .map((url) => {
      return {
        url: `${ENDPOINT}/wiki${url}`,
        lastModified: new Date(),
      }
    })
}
