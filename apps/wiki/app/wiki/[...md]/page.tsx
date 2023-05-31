import React, { cache } from 'react'
import fs from 'node:fs/promises'
import { createRelativeLinkReplacer, parse } from 'parser-vimwiki'
import { DIR_WIKI, RE_RELATION } from '../../../constant'
import { marked } from '../../../lib/marked'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'
import { channel } from 'diagnostics_channel'

export default async (props: Props) => {
  const { md } = props.params
  const nested = Array.isArray(md)
  console.log({nested})
  const path = nested
    ? md.join('/')
    : md
  const currentPath = nested
    ? md.slice(0, -1).join('/')
    : undefined

  try {
    const markdown = await getData(path)
      .then(createRelativeLinkReplacer(currentPath))
      .then(parse)
    const html = marked(markdown)

    return (
      <>
        <Header/>
        <Markdown path={path} data={html}/>
      </>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(decodeURIComponent(`/wiki/${path}/index`))
    }

    return <NoPage name={path}/>
  }
}
type Props = {
  params: {
    md: string[]
  }
}

export async function generateMetadata({ params }: Props) {
  const path = params.md.join('/')
  const markdown = await getData(path)
  const [title, ...lines] = markdown.split('\n')
  const index = lines.findLastIndex((l) => l.includes('# related'))
  console.log({index})
  const keywords = index !== -1
    ? lines
      .slice(index + 1)
      .map((l) => {
        return RE_RELATION.exec(l)?.[1]
      })
      .filter(Boolean)
      .slice(0, 12)
    : []
  const description = lines.join('\n').slice(0, 150)
  console.log({
    path,
        title,
        description,
        keywords,
        openGraph: {
          title,
          description,
          locale: 'ko',
          siteName: 'https://deptno.dev',
          url: 'https://deptno.dev/wiki/' + path,
        },
      })

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      locale: 'ko',
      siteName: 'https://deptno.dev',
      url: 'https://deptno.dev/wiki/' + path,
    },
  }
}

const getData = cache(async (path: string) => {
  const file = decodeURIComponent(`${DIR_WIKI}/${path}.md`)

  return fs.readFile(file).then((buffer) => buffer.toString())
})
