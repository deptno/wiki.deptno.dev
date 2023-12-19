import React from 'react'
import { marked } from '../../lib/marked'
import { Header } from '../../component/Header'
import { Markdown } from '../../component/Markdown'
import { getAllList } from '../../lib/getAllList'
import { MarkdownAside } from '../../component/MarkdownAside'
import { getHtml } from '../../lib/getHtml'
import { getPath } from '../../lib/getPath'
import { getMarkdownMetadata } from '../../lib/generateMetadata'

export default async function Page(props: Props) {
  try {
    const { path, wiki } = getPath([props.params.wiki, 'index'])
    const { markdowns, lastModified, getRandomLatestModifiedFileName } =
      getAllList(wiki)
    const html = await getHtml({ path, currentPath: `/${wiki}` })

    return (
      <>
        <Header wiki={wiki} placeholder={getRandomLatestModifiedFileName()} />
        <Markdown data={html}>
          <MarkdownAside data={html} wiki={wiki} path={path} />
        </Markdown>
        <hr className="my-4" />
        <div className="p-4 text-4xl">최근 수정</div>
        <Markdown data={marked(lastModified)} />
        <div className="p-4 text-lg">전체 파일</div>
        <Markdown data={marked(markdowns)} />
      </>
    )
  } catch (err) {
    console.error(err)

    throw err
  }
}

type Props = {
  params: {
    wiki: string
  }
}

export async function generateMetadata(props: Props) {
  const metadata = await getMarkdownMetadata([props.params.wiki, 'index'])
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: (metadata.openGraph.url as string).slice(0, '/index'.length),
    },
  }
}
