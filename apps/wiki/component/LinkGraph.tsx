'use client'
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ForceGraph, { ForceGraphInstance } from 'force-graph'

export const LinkGraph: FC<Props> = (props) => {
  const { graphData } = props
  const ref = useRef()
  const [xl3, setXl3] = useState(globalThis.offsetWidth > 1792)
  const refGraph = useRef<ForceGraphInstance>(null)

  useLayoutEffect(() => {
    function updateScaleState() {
      setXl3(globalThis.innerWidth > 1792)
    }

    refGraph.current = ForceGraph()
    updateScaleState()
    window.addEventListener('resize', updateScaleState)

    return () => {
      window.removeEventListener('resize', updateScaleState)
    }
  }, [])
  useEffect(() => {
    if (refGraph.current) {
      const [width, height] = xl3
        ? [384, 384]
        : [1024, 384]
      refGraph.current(ref.current)
        .graphData(graphData)
        .width(width)
        .height(height)
    }
  }, [xl3, refGraph.current])

  return (
    <div style={{ width: '300px', height: '400px' }} className="w-96 h-80">
      <div ref={ref}/>
    </div>

  )
}

type Props = {
  graphData: any
}
