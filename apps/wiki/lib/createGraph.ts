
export function createGraph<N = string, E = Edge<N>>(): Graph<N> {
  const nodes: Set<N> = new Set()
  const edges: Edge<N>[] = []

  return {
    addNode(node: N) {
      if (nodes.has(node)) {
        return
      }
      nodes.add(node)
    },
    addEdge(edge: Edge<N>) {
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
    }
  }
}

export type Graph<N> = {
  addNode(node: N): void
  addEdge(edge: Edge<N>): void
  getOutgoingEdges(nodeId: N): readonly Edge<N>[]
  getIncomingEdges(nodeId: N): readonly Edge<N>[]
  getNodes(): readonly N[]
  getStats(): { nodeCount: number, edgeCount: number}
}
type Edge<N> = {
  source: N
  target: N
}
