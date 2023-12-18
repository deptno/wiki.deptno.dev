import React from 'react'
import { marked } from '../../lib/marked'
import { Header } from '../../component/Header'
import { Markdown } from '../../component/Markdown'
import { ChildrenWithSearchResult } from '../../component/ChildrenWithSearchResult'
import { getAllList } from '../../lib/getAllList'

export default async (props: Props) => {
  const { markdowns, lastModified, getRandomLatestModifiedFileName } = getAllList(props.params.wiki)

  try {
    return (
      <>
        <Header placeholder={getRandomLatestModifiedFileName()}/>
        <ChildrenWithSearchResult/>
        <div className="p-4 text-lg">최근 수정</div>
        <Markdown data={marked(lastModified)}/>
        <div className="p-4 text-lg">전체 파일</div>
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
    wiki: string
  }
}
