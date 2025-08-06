import React, { FC } from 'react'
import { getGraph } from '../getGraph'
import { ChildrenWithSearchResult } from './ChildrenWithSearchResult'
import { tryToGetWiki } from '../lib/tryToGetWiki'
import { CONFIG } from '../constant'
import { FullLinkGraph } from './FullLinkGraph'
import { FullPageSearchResult } from './FullPageSearchResult'

export const GraphAside: FC<Props> = props => {
  const { wiki } = props
  const graph = getGraph(wiki)
  const g = graph.getTotalLinkGraphData()

  return (
    <>
      <FullPageSearchResult />
      <FullLinkGraph wiki={wiki} graphData={g}/>
    </>
  )
}

type Props = {
  wiki: string
}

const file = import.meta.url
