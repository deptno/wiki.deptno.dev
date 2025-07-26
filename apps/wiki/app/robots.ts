import { MetadataRoute } from 'next'
import { NEXT_PUBLIC_ENDPOINT, CONFIG } from '../constant'

export default function robots(): MetadataRoute.Robots {
  const publicW = CONFIG.filter(w => !w.private)
  const privateW = CONFIG.filter(w => w.private)
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
    sitemap: `${NEXT_PUBLIC_ENDPOINT}/sitemap.xml`,
  }
}

function withSlash(a: string) {
  return `/${a}/`
}
