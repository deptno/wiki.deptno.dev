import React from 'react'
import { SitemapStream, streamToPromise } from 'sitemap'
import { DIR_WIKI } from '../../constant'
import { getAllMd } from '../../lib/getAllMd'

export const revalidate = 3600
export async function GET(req, res) {
  console.info({ ua: req.headers.get('user-agent') })
  const list = getAllMd(DIR_WIKI)
    .map((f) => f.replace(DIR_WIKI, ''))
  const stream = new SitemapStream({
    hostname: 'https://deptno.dev',
  })

  console.info({ count: list.length })

  for (const url of list) {
    stream.write({ changefreq: 'weekly', url: `/wiki${url}` })
  }
  stream.end()

  const sitemap = await streamToPromise(stream)

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
