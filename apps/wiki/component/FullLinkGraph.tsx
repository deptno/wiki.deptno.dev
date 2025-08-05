'use client'

import React, { FC, useRef } from 'react'
import { useFullSizedForceGraphLayoutEffect } from '../lib/force-graph/useFullSizedForceGraphLayoutEffect'

export const FullLinkGraph: FC<Props> = (props) => {
  const { wiki, graphData } = props
  const ref = useRef(null)

  useFullSizedForceGraphLayoutEffect(ref, wiki, graphData)

  return (
      <div className="grow" ref={ref}/>
  )
}

type Props = {
  wiki: string
  graphData: any
}
