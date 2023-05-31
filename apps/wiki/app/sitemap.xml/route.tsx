import React from 'react'
import { SitemapStream, streamToPromise } from 'sitemap'
import { DIR_WIKI } from '../../constant'
import { getAllMd } from '../../lib/getAllMd'

export const revalidate = 3600
export async function GET(req, res) {
  console.info({ ua: req.headers.get('user-agent') })

  const list = getAllMd(DIR_WIKI)
    .map((f) => f
      .replace(DIR_WIKI, '')
      .slice(0, -3)
    )
  const stream = new SitemapStream({
    hostname: 'https://deptno.dev',
  })
  console.info({ count: list.length })

  for (const url of list) {
    // @see: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
    // TODO: lastModified 추가
    stream.write({ changefreq: 'daily', url: `/wiki${url}` })
  }
  stream.end()

  const sitemap = await streamToPromise(stream)

  return new Response(sitemap, {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
