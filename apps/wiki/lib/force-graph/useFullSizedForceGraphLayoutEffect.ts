import { RefObject, useLayoutEffect, useRef } from 'react'
import ForceGraphInstance from 'force-graph'
import { draw } from './draw'

export function useFullSizedForceGraphLayoutEffect(elementRef: RefObject<HTMLElement>, wiki: string, graphData: any) {
  let ran = useRef(false)

  useLayoutEffect(() => {
    if (ran.current) {
      return
    }
    ran.current = true
    let refGraph: ForceGraphInstance

    const element = elementRef.current

    function getOptions() {
      const width = window.innerWidth
      const height = window.innerHeight
      const zoom = 1

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
          console.log('option' , { width, height, zoom })

          refGraph
            .width(width)
            .height(height)
            .zoom(zoom)
        })
      }
    }


    const options = getOptions()
    draw({ element, wiki, graphData, options }).then((instance) => {
      refGraph = instance

      window.addEventListener('resize', updateGraph)
    })

    return () => {
      window.removeEventListener('resize', updateGraph)
    }
  }, [elementRef, graphData, wiki])
}
