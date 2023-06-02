import { ENDPOINT } from '../../constant'
import { ForceGraphInstance } from 'force-graph'

export function draw(args: Args): Promise<ForceGraphInstance> {
  const { element, graphData, options } = args

  return new Promise((resolve) => {
    // window is not find 에러 발생에 대한 우회 처리
    import('force-graph').then(({ default: ForceGraph }) => {
      const { width, height, zoom } = options
      const instance = ForceGraph()

      resolve(instance)

      requestAnimationFrame(() => {
        instance(element)
          .nodeLabel('id')
          .nodeAutoColorBy('id')
          .width(width)
          .height(height)
          .zoom(zoom)
          .graphData(graphData)
          .linkCanvasObjectMode(() => 'after').onNodeClick(node => location.href = `${ENDPOINT}/wiki/${node.id}`)
          .nodeCanvasObject((node, ctx, globalScale) => {
            const label = node.id
            const fontSize = 16 / globalScale
            ctx.font = `${fontSize}px Sans-Serif`
            const textWidth = ctx.measureText(label as string).width
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2) // some padding

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            // @ts-ignore
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            // @ts-ignore
            ctx.fillStyle = node.color
            // @ts-ignore
            ctx.fillText(label, node.x, node.y)

            // @ts-ignore
            node.__bckgDimensions = bckgDimensions // to re-use in nodePointerAreaPaint
          })
          .nodePointerAreaPaint((node, color, ctx) => {
            ctx.fillStyle = color
            // @ts-ignore
            const bckgDimensions = node.__bckgDimensions
            // @ts-ignore
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)
          })

      })
    })
  })
}

type Args = {
  element: HTMLElement
  graphData
  options: ForceGraphOption
}
type ForceGraphOption = { width, height, zoom }
