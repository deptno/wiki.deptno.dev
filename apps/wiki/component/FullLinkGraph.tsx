'use client'

import React, { FC, useRef } from 'react'
import { useFullSizedForceGraphLayoutEffect } from '../lib/force-graph/useFullSizedForceGraphLayoutEffect'
import { useHotkeys } from 'react-hotkeys-hook'
import { clusterBy } from '../lib/force-graph/clusterBy'

export const FullLinkGraph: FC<Props> = (props) => {
  const { wiki, graphData } = props
  const ref = useRef(null)
  const instanceRef = useFullSizedForceGraphLayoutEffect(ref, wiki, graphData)

  useHotkeys('1', () => {
    if (instanceRef.current) {
      clusterBy({ graphData, instance: instanceRef.current, key: 'dir' })
    }
  })

  return (
    <div className="grow relative h-full">
      <div className="grow h-full flex justify-center items-center" ref={ref}>
        불러오는중
      </div>
      <div className="hidden md:flex flex-col absolute top-0 left-0 gap-1 z-50 pointer-events-none select-none items-start opacity-70 p-1 text-sm">
        <div className="text-center p-1 bg-gray-800 text-green-400 rounded-md">1: directory</div>
      </div>
    </div>

  )
}

type Props = {
  wiki: string
  graphData: any
}
