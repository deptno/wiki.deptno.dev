import React from 'react'
import { Header } from '../../component/Header'
import { Markdown } from '../../component/Markdown'
import { getAllList } from '../../lib/getAllList'
import { MarkdownAside } from '../../component/MarkdownAside'
import { getHtml } from '../../lib/getHtml'
import { getPath } from '../../lib/getPath'
import { getMarkdownMetadata } from '../../lib/generateMetadata'
import { Metadata } from 'next'
import { getMarked } from '../../lib/getMarked'
import { Footer } from '../../component/Footer'
import { HotKey } from '../../component/HotKey'
import { CONFIG } from '../../constant'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export default async function Page(props: Props) {
  const params = await props.params
  const { wiki } = params

  if (CONFIG.every(w => w.dir !== wiki)) {
    return notFound()
  }

  try {
    const { path } = getPath([wiki, 'index'])
    const html = await getHtml({ wiki, path, currentPath: `/${wiki}` })
    const { getMarkdowns, getLastModified, getRandomLatestModifiedFileName } = getAllList(wiki)
    const { parse } = getMarked({ wiki })

    return (
      <main className="grow w-full max-w-screen-lg lg:border border-gray-800 h-full flex flex-col">
        <HotKey overlay/>
        <Header wiki={wiki} placeholder={getRandomLatestModifiedFileName()}/>
        <div className="grow">
          <Markdown data={html}>
            <MarkdownAside data={html} wiki={wiki} path={path}/>
          </Markdown>
        </div>
        <hr className="my-4"/>
        <div className="p-4 text-4xl">최근 수정</div>
        <Markdown data={parse(getLastModified())}/>
        <div className="p-4 text-lg">전체 파일</div>
        <Markdown data={parse(getMarkdowns())}/>
        <Footer wiki={wiki}/>
      </main>
    )
  } catch (err) {
    console.error({ file }, err.message)

    throw err
  }
}

type Props = {
  params: Promise<{
    wiki: string
  }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const metadata = await getMarkdownMetadata([params.wiki, 'index'])
  const url = metadata
    ? (metadata.openGraph.url as string).slice(0, '/index'.length)
    : ''

  return {
    ...metadata,
    openGraph: {
      ...metadata?.openGraph,
      url,
    },
    alternates: {
      // canonical: url,
    },
  } as Metadata
}

const file = import.meta.url
