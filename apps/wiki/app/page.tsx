import React from 'react'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'
import { CONFIG } from '../constant'
import { getMarked } from '../lib/getMarked'

export default async function Page() {
  const markdownWiki = CONFIG.map(w => `- [${w.dir}](${w.dir})`).join('\n')
  const wiki = CONFIG.find(w => !w.private)?.dir ?? ''

  try {
    const { parse } = getMarked({ wiki })

    return (
      <>
        <Header wiki={wiki}/>
        <ChildrenWithSearchResult />
        <div className="p-4 text-lg">위키</div>
        <Markdown data={parse(markdownWiki)} />
      </>
    )
  } catch (err) {
    console.error({ file }, err.message)

    return null
  }
}

const file = import.meta.url
