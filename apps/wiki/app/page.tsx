import React from 'react'
import { marked } from '../lib/marked'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'
import { getAllList } from '../lib/getAllList'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const { files, lastModified, mostModified } = getAllList()

  try {
    return (
      <>
        <Header placeholder={mostModified}/>
        <ChildrenWithSearchResult/>
        <div className="p-4 text-lg">위키</div>
        <Markdown data={marked('- [public-wiki](/)')}/>
        <div className="p-4 text-lg">최근 수정</div>
        <Markdown data={marked(lastModified)}/>
        <div className="p-4 text-lg">files</div>
        <Markdown data={marked(files)}/>
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
