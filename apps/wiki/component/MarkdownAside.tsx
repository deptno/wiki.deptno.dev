import React, { FC } from 'react'
import { GIT_BRANCH, URL_WIKI } from '../constant'
import { TOC } from '../lib/TOC'
import { LinkGraph } from './LinkGraph'
import { getGraph } from '../getGraph'
import { LinkList } from './LinkList'
import { ChildrenWithSearchResult } from './ChildrenWithSearchResult'
import { DiaryNavigation } from './DiaryNavigation'

export const MarkdownAside: FC<Props> = (props) => {
  const { data, wiki, path = '' } = props
  const graph = getGraph(wiki)
  const g = graph.getLinkGraphData(path.slice(wiki.length + 1))
  const branch = GIT_BRANCH

  return (
    <div className="p-2">
      <ChildrenWithSearchResult>
        <div className="flex justify-end gap-2 border-b-2">
          <a className="underline border-l-blue-400" href={`${URL_WIKI}/edit/${branch}/${path}.md`} target="_blank">수정</a>
          <a className="underline border-l-blue-800" href={`${URL_WIKI}/commits/${branch}/${path}.md`} target="_blank">기록</a>
          <a className="underline border-l-blue-800" href={`${URL_WIKI}/blame/${branch}/${path}.md`} target="_blank">추적</a>
        </div>
        <LinkGraph wiki={wiki} graphData={g}/>
        <hr/>
        <LinkList wiki={wiki} graphData={g}/>
        <hr/>
        <TOC html={data}/>
        <DiaryNavigation wiki={wiki} path={path}/>
      </ChildrenWithSearchResult>
    </div>
  )
}

type Props = {
  wiki: string
  data: string
  path?: string
}
