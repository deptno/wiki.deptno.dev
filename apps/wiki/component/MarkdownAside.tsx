import React, { FC } from 'react'
import { GIT_BRANCH, URL_WIKI } from '../constant'
import { TOC } from '../lib/TOC'
import { LinkGraph } from './LinkGraph'
import { getGraph } from '../getGraph'
import { LinkList } from './LinkList'
import { ChildrenWithSearchResult } from './ChildrenWithSearchResult'

export const MarkdownAside: FC<Props> = (props) => {
  const { data, path = '' } = props
  const graph = getGraph()
  const g = graph.getLinkGraphData(path)
  const branch = GIT_BRANCH

  return (
    <div className="p-2">
      <ChildrenWithSearchResult>
        {!path.includes('/') && <div className="flex justify-end gap-2 border-b-2">
          <a className="underline border-l-blue-400" href={`${URL_WIKI}/edit/${branch}/${path}.md`} target="_blank">수정</a>
          <a className="underline border-l-blue-800" href={`${URL_WIKI}/commits/${branch}/${path}.md`} target="_blank">기록</a>
          <a className="underline border-l-blue-800" href={`${URL_WIKI}/blame/${branch}/${path}.md`} target="_blank">추적</a>
        </div>}
        <TOC html={data}/>
        <LinkList graphData={g}/>
        <LinkGraph graphData={g}/>
      </ChildrenWithSearchResult>
    </div>
  )
}

type Props = {
  data: string
  path?: string
}
