import ForceGraphInstance from 'force-graph'

export function clusterBy(params: Params)  {
  const { graphData, instance, key } = params

  // group별 center force
  const groups = [...new Set(graphData.nodes.map(n => n[key]))] as any

  // 폴더별 중심을 반지름 3000~6000 정도로 멀리
  const groupCenters = getGroupCenters(groups, 4000)

  // charge(퍼짐) 매우 강하게!
  instance.d3Force('charge').strength(-1200)

  // group cluster force도 더 강하게!
  instance.d3Force('groupCluster', function (alpha) {
    graphData.nodes.forEach(node => {
      const group = node[key]
      const center = groupCenters[group]
      // 계수 0.18~0.3까지 세게 (0.1 → 0.2 이상)
      node.vx += (center.x - node.x) * 0.25 * alpha
      node.vy += (center.y - node.y) * 0.25 * alpha
    })
  })

  // link(forceLink)는 기본값보다 strength를 0.01~0.03 정도로 약하게!
  instance.d3Force('link').strength(0.01)
}

type Params = {
  graphData: any
  instance: ForceGraphInstance
  key: string
}

function getGroupCenters(groups: string[], radius = 800) {
  const angleStep = (2 * Math.PI) / groups.length
  return Object.fromEntries(
    groups.map((g, i) => [
      g,
      {
        x: Math.cos(i * angleStep) * radius,
        y: Math.sin(i * angleStep) * radius,
      },
    ]),
  )
}
