'use client'
import React, { FC, useRef } from 'react'
import { useForceGraphLayoutEffect } from '../lib/force-graph'

export const LinkGraph: FC<Props> = (props) => {
  const { graphData } = props
  const ref = useRef()

  useForceGraphLayoutEffect(ref, graphData)

  return (
    <div className="w-full h-fit 3xl:w-96 3xl:h-96 relative">
      <div ref={ref}/>
    </div>
  )
}

type Props = {
  graphData: any
}
