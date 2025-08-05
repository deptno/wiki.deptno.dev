import React, { FC } from 'react'
import { TOC } from '../lib/TOC'
import { LinkGraph } from './LinkGraph'
import { getGraph } from '../getGraph'
import { LinkList } from './LinkList'
import { ChildrenWithSearchResult } from './ChildrenWithSearchResult'
import { DiaryNavigation } from './DiaryNavigation'
import { tryToGetWiki } from '../lib/tryToGetWiki'
import { CONFIG } from '../constant'

export const MarkdownAside: FC<Props> = props => {
  const { data, wiki, path = '' } = props
  const graph = getGraph(wiki)
  const wikiBasedPath = path.slice(wiki.length + 1)
  const g = graph.getLinkGraphData(decodeURIComponent(wikiBasedPath))
  const branch = CONFIG.find(t => t.dir === wiki).branch
  const cw = tryToGetWiki(wiki)

  return (
    <div className="p-2">
      <ChildrenWithSearchResult>
        <div className="flex justify-end gap-2 border-b-2 3xl:py-2">
          <a
            className="underline border-l-blue-400"
            href={`${cw.url}/edit/${branch}/${wikiBasedPath}.md`}
            target="_blank"
            rel="noreferrer"
          >
            수정
          </a>
          <a
            className="underline border-l-blue-800"
            href={`${cw.url}/commits/${branch}/${wikiBasedPath}.md`}
            target="_blank"
            rel="noreferrer"
          >
            기록
          </a>
          <a
            className="underline border-l-blue-800"
            href={`${cw.url}/blame/${branch}/${wikiBasedPath}.md`}
            target="_blank"
            rel="noreferrer"
          >
            추적
          </a>
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

const file = import.meta.url
