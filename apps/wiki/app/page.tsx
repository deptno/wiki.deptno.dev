import React from 'react'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'
import { CONFIG } from '../constant'
import { getMarked } from '../lib/getMarked'
import { Footer } from '../component/Footer'
import { HotKey } from '../component/HotKey'

export const dynamic = 'force-static'
export default async function Page() {
  const markdownWiki = CONFIG.map(w => `- [${w.dir}](${w.dir})`).join('\n')
  const wiki = CONFIG.find(w => !w.private)?.dir ?? ''

  try {
    const { parse } = getMarked({ wiki })

    return (
      <main className="grow w-full max-w-screen-lg lg:border border-gray-800 h-full flex flex-col">
        <HotKey overlay/>
        <Header wiki={wiki}/>
        <ChildrenWithSearchResult />
        <div className="p-4 text-lg">위키</div>
        <Markdown data={parse(markdownWiki)} />
        <Footer wiki={wiki}/>
      </main>
    )
  } catch (err) {
    console.error({ file }, err.message)

    return null
  }
}

const file = import.meta.url
