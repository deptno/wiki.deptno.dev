import React from 'react'
import { marked } from '../lib/marked'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'
import { getAllList } from '../lib/getAllList'
import { CONFIG } from '../constant'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const { markdowns, lastModified, getRandomLatestModifiedFileName } = getAllList()
  const markdownWiki = CONFIG
    .map((w) => {
      return `- [${w.dir}](${w.dir})`
    })
    .join('\n')

  try {
    return (
      <>
        <Header placeholder={getRandomLatestModifiedFileName()}/>
        <ChildrenWithSearchResult/>
        <div className="p-4 text-lg">위키</div>
        <Markdown data={marked(markdownWiki)}/>
        <div className="p-4 text-lg">최근 수정</div>
        <Markdown data={marked(lastModified)}/>
        <div className="p-4 text-lg">files</div>
        <Markdown data={marked(markdowns)}/>
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
