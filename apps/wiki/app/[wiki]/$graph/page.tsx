import React from 'react'
import { Header } from '../../../component/Header'
import { getMarkdownMetadata } from '../../../lib/generateMetadata'
import { Metadata } from 'next'
import { Footer } from '../../../component/Footer'
import { HotKey } from '../../../component/HotKey'
import { GraphAside } from '../../../component/GraphAside'
import { CONFIG } from '../../../constant'
import { UnknownWiki } from '../../../error/UnknownWiki'

export const dynamic = 'force-static'
export default async function Page(props: Props) {
  const params = await props.params
  const { wiki } = params

  if (CONFIG.every(w => w.dir !== wiki)) {
    throw new UnknownWiki(wiki)
  }

  try {
    return (
      <main className="grow w-dvw h-screen flex flex-col">
        <HotKey/>
        <Header wiki={wiki} placeholder={''}/>
        <div className="grow overflow-hidden">
          <GraphAside data={''} wiki={wiki}/>
        </div>
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
