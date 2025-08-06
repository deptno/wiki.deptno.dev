import React from 'react'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'
import { MarkdownAside } from '../../../component/MarkdownAside'
import { getAllList } from '../../../lib/getAllList'
import { getHtml } from '../../../lib/getHtml'
import { getMarkdownMetadata } from '../../../lib/generateMetadata'
import { getPath } from '../../../lib/getPath'
import { Footer } from '../../../component/Footer'
import { HotKey } from '../../../component/HotKey'
import { CONFIG } from '../../../constant'
import { UnknownWiki } from '../../../error/UnknownWiki'

export const dynamic = 'force-static'
export default async function Page(props: Props) {
  const params = await props.params
  const { wiki, md } = params

  if (CONFIG.every(w => w.dir !== wiki)) {
    throw new UnknownWiki(wiki)
  }

  const { path, currentPath } = getPath([wiki, ...md])

  try {
    const html = await getHtml({ wiki, path, currentPath })
    const { getRandomLatestModifiedFileName } = getAllList(wiki)

    return (
      <main className="grow w-full max-w-screen-lg lg:border border-gray-800 h-full flex flex-col">
        <HotKey overlay/>
        <Header wiki={wiki} placeholder={getRandomLatestModifiedFileName()}/>
        <div className="grow">
          <Markdown data={html}>
            <MarkdownAside data={html} wiki={wiki} path={path}/>
          </Markdown>
        </div>
        <Footer wiki={wiki}/>
      </main>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(`/${path}/index`)
    }

    return (
      <main className="grow w-full max-w-screen-lg lg:border border-gray-800 h-full flex flex-col">
        <NoPage name={path}/>
      </main>
    )
  }
}
type Props = {
  params: Promise<{
    wiki: string
    md: string[]
  }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params

  return getMarkdownMetadata([params.wiki, ...params.md])
}

const file = import.meta.url
