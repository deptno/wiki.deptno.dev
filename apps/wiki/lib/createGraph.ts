export function createGraph<N = string, E = Edge<N>>(): Graph<N> {
  const nodes: Set<N> = new Set()
  const nodeMap: Map<N, number> = new Map()
  const edges: Edge<N>[] = []

  return {
    addNode(node: N) {
      if (!nodeMap.get(node)) {
        nodeMap.set(node, 1)
      }

      if (nodes.has(node)) {
        return
      }
      nodes.add(node)
    },
    addEdge(edge: Edge<N>) {
      const n = nodeMap.get(edge.source) ?? 0
      nodeMap.set(edge.source, n + 1)

      edges.push(edge)
    },
    getOutgoingEdges(nodeId: N): readonly Edge<N>[] {
      return edges.filter((e) => e.source === nodeId)
    },
    getIncomingEdges(nodeId: N): readonly Edge<N>[] {
      return edges.filter((e) => e.target === nodeId)
    },
    getNodes() {
      return Array.from(nodes)
    },
    getStats() {
      return {
        nodeCount: nodes.size,
        edgeCount: edges.length,
      }
    },
    getLinkGraphData(nodeId: N) {
      const oe = this.getOutgoingEdges(nodeId)
      const ie = this.getIncomingEdges(nodeId)
      const nodes = Array.from(new Set([
        nodeId,
        ...oe.map((e: Edge<N>) => e.target),
        ...ie.map((e: Edge<N>) => e.source),
      ]))
        .map((id) => {
          if (id === nodeId) {
            return {
              id,
              name: id,
              val: nodeMap.get(id),
            }
          }

          return {
            id,
            name: id,
            val: nodeMap.get(id),
          }
        })

      return {
        nodes,
        links: [
          ...oe,
          ...ie
        ],
      }
    },
  }
}

export type Graph<N> = {
  addNode(node: N): void
  addEdge(edge: Edge<N>): void
  getOutgoingEdges(nodeId: N): readonly Edge<N>[]
  getIncomingEdges(nodeId: N): readonly Edge<N>[]
  getNodes(): readonly N[]
  getStats(): { nodeCount: number, edgeCount: number }
  getLinkGraphData(node: N): { nodes, links }
}
type Edge<N> = {
  source: N
  target: N
}
