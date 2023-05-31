import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/wiki',
      },
      {
        userAgent: '*',
        disallow: '/wiki/diary',
      }
    ],
    sitemap: 'https://deptno.dev/sitemap.xml',
  }
}
