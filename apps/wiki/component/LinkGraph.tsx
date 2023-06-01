import React, { FC } from 'react'
import { DIR_WIKI } from '../constant'
import { getGraph } from '../getGraph'

// @ts-expect-error
export const LinkGraph: FC<Props> = async (props) => {
  const { path  } = props
  const graph = await getGraph(DIR_WIKI)
  const ie = graph.getIncomingEdges(path)
  const oe = graph.getOutgoingEdges(path)

  return (
    <div className="w-full overflow-x-hidden">
      <div>from</div>
      {
        ie.map((e) => {
          return <div key={e.target}>{e.source} to {e.target}</div>
        })
      }
      <div>to</div>
      {
        oe.map((e) => {
          return <div key={e.target}>{e.source} to {e.target}</div>
        })
      }
    </div>
  )
}

type Props = {
  path: string
}
