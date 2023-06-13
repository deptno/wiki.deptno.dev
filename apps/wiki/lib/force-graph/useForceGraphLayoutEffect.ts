import { RefObject, useLayoutEffect } from 'react'
import { ForceGraphInstance } from 'force-graph'
import { draw } from './draw'

export function useForceGraphLayoutEffect(elementRef: RefObject<HTMLElement>, graphData) {
  let ran = false

  useLayoutEffect(() => {
    if (ran) {
      return
    }
    ran = true
    let refGraph: ForceGraphInstance

    const element = elementRef.current

    function getOptions() {
      const xl3 = globalThis.innerWidth > 1792
      const [width, height, zoom] = xl3
        ? [384, 384, 3]
        : [Math.min(globalThis.innerWidth, 1024) - 8, 384, 3.5]

      return {
        width,
        height,
        zoom,
      }
    }
    function updateGraph() {
      if (refGraph) {
        requestAnimationFrame(() => {
          const { width, height, zoom } = getOptions()

          refGraph
            .width(width)
            .height(height)
            .zoom(zoom)
        })
      }
    }


    const options = getOptions()
    draw({ element, graphData, options }).then((instance) => {
      refGraph = instance

      window.addEventListener('resize', updateGraph)
    })

    return () => {
      window.removeEventListener('resize', updateGraph)
    }
  }, [])
}
