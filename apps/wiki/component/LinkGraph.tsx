'use client'
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ForceGraphInstance } from 'force-graph'

export const LinkGraph: FC<Props> = (props) => {
  const { graphData } = props
  const ref = useRef()
  const [xl3, setXl3] = useState(globalThis.offsetWidth > 1792)
  const refGraph = useRef<ForceGraphInstance>(null)

  useLayoutEffect(() => {
    function updateScaleState() {
      setXl3(globalThis.innerWidth > 1792)
    }

    // module 에서 window is not find 에러 발생에 대한 우회 처리
    import('force-graph').then(({default: ForceGraph}) => {
      refGraph.current = ForceGraph()
      draw(refGraph, ref, graphData, xl3)
      updateScaleState()
    })

    window.addEventListener('resize', updateScaleState)

    return () => {
      window.removeEventListener('resize', updateScaleState)
    }
  }, [])
  useEffect(() => {
    if (refGraph.current) {
        draw(refGraph, ref, graphData, xl3)
    }
  }, [xl3, refGraph.current])

  return (
    <div className="w-96 h-96 relative">
      <div ref={ref}/>
    </div>

  )
}

type Props = {
  graphData: any
}

function draw(refGraph, refElement, graphData, xl3) {
  const [width, height, zoom] = xl3
    ? [384, 384, 2.5]
    : [1024, 384, 3.5]
  refGraph.current(refElement.current)
    .nodeLabel('id')
    .nodeAutoColorBy('id')
    .width(width)
    .height(height)
    .zoom(zoom)
    .graphData(graphData)
    .linkCanvasObjectMode(() => 'after')
    .onNodeClick(node => location.href=`http://localhost:3001/wiki/${node.id}`)
    .nodeCanvasObject((node, ctx, globalScale) => {
      const label = node.id;
      const fontSize = 16/globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = node.color;
      ctx.fillText(label, node.x, node.y);

      node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
    })
    .nodePointerAreaPaint((node, color, ctx) => {
      ctx.fillStyle = color;
      const bckgDimensions = node.__bckgDimensions;
      bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
    });
}
