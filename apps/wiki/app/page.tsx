import React from 'react'
import { marked } from '../lib/marked'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'
import { CONFIG } from '../constant'

export default async (props: Props) => {
  const markdownWiki = CONFIG
    .map((w) => `- [${w.dir}](${w.dir})`)
    .join('\n')

  try {
    return (
      <>
        <Header />
        <ChildrenWithSearchResult/>
        <div className="p-4 text-lg">위키</div>
        <Markdown data={marked(markdownWiki)}/>
      </>
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

type Props = {
  params: {
    md: string
  }
}
