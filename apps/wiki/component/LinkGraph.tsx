'use client'

import React, { FC, useRef } from 'react'
import { useForceGraphLayoutEffect } from '../lib/force-graph'

export const LinkGraph: FC<Props> = (props) => {
  const { wiki, graphData } = props
  const ref = useRef(null)

  useForceGraphLayoutEffect(ref, wiki, graphData)

  return (
    <div className="w-full h-fit 3xl:w-96 3xl:h-96 min-h-24 relative">
      <div ref={ref}/>
    </div>
  )
}

type Props = {
  wiki: string
  graphData: any
}
