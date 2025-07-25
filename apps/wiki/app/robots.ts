import { MetadataRoute } from 'next'
import config from '../wiki.config'
import { ENDPOINT } from '../constant'

export default function robots(): MetadataRoute.Robots {
  const publicW = (config as Wiki[]).filter(w => !w.private)
  const privateW = (config as Wiki[]).filter(w => w.private)
  const rules = {
    userAgent: '*',
    allow: publicW.map(w => w.dir).map(withSlash),
    disallow: [
      ...privateW.map(w => w.dir).map(withSlash),
      ...publicW.map(w => [w.dir, w.diaryDir].join('/')).map(withSlash),
    ],
    crawlDelay: 1,
  }

  return {
    rules,
    sitemap: `${ENDPOINT}/sitemap.xml`,
  }
}

function withSlash(a: string) {
  return `/${a}/`
}
