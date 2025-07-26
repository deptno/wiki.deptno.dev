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

export const dynamic = 'force-static'
export default async function Page(props: Props) {
  const params = await props.params

  try {
    const { path, wiki } = getPath([params.wiki, 'index'])
    const { markdowns, lastModified, getRandomLatestModifiedFileName } =
      getAllList(wiki)
    const html = await getHtml({ wiki, path, currentPath: `/${wiki}` })
    const { parse } = getMarked({ wiki })

    return (
      <>
        <Header wiki={wiki} placeholder={getRandomLatestModifiedFileName()}/>
        <Markdown data={html}>
          <MarkdownAside data={html} wiki={wiki} path={path}/>
        </Markdown>
        <hr className="my-4"/>
        <div className="p-4 text-4xl">최근 수정</div>
        <Markdown data={parse(lastModified)}/>
        <div className="p-4 text-lg">전체 파일</div>
        <Markdown data={parse(markdowns)}/>
      </>
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
