import React, { FC } from 'react'
import { getGraph } from '../getGraph'
import { ChildrenWithSearchResult } from './ChildrenWithSearchResult'
import { tryToGetWiki } from '../lib/tryToGetWiki'
import { CONFIG } from '../constant'
import { FullLinkGraph } from './FullLinkGraph'

export const GraphAside: FC<Props> = props => {
  const { data, wiki, path = '' } = props
  const graph = getGraph(wiki)
  const wikiBasedPath = path.slice(wiki.length + 1)
  const g = graph.getTotalLinkGraphData()
  const branch = CONFIG.find(t => t.dir === wiki).branch
  const cw = tryToGetWiki(wiki)

  return (
    <>
      <ChildrenWithSearchResult />
      <FullLinkGraph wiki={wiki} graphData={g}/>
    </>
  )
}

type Props = {
  wiki: string
  data: string
  path?: string
}

const file = import.meta.url
