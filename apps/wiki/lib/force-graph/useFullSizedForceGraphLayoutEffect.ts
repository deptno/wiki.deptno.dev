import { RefObject, useLayoutEffect, useRef } from 'react'
import ForceGraphInstance from 'force-graph'
import { fullSizeDraw } from './fullSizeDraw'

export function useFullSizedForceGraphLayoutEffect(elementRef: RefObject<HTMLElement>, wiki: string, graphData: any) {
  let ran = useRef(false)
  const ref = useRef<ForceGraphInstance>(null)

  useLayoutEffect(() => {
    if (ran.current) {
      return
    }
    ran.current = true

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
      if (ref) {
        requestAnimationFrame(() => {
          const { width, height, zoom } = getOptions()

          ref.current
            .width(width)
            .height(height)
            .centerAt(0, 0, 500)
        })
      }
    }


    const options = getOptions()
    fullSizeDraw({ element, wiki, graphData, options }).then((instance) => {
      ref.current = instance

      window.addEventListener('resize', updateGraph)
    })

    return () => {
      window.removeEventListener('resize', updateGraph)
    }
  }, [elementRef, graphData, wiki])

  return ref
}
