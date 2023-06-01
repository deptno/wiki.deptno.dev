import { createGraph, Graph } from './lib/createGraph'
import { dirname, join } from 'node:path'
import { getAllMd } from './lib/getAllMd'
import { RE_VIMWIKI_LINK } from 'parser-vimwiki/constant'
import { readFileSync } from 'fs'
import { DIR_WIKI } from './constant'

export const getGraph = () => {
  if (_cache.current) {
    return _cache.current
  }

  const graph = createGraph()
  const map = getAllMd(DIR_WIKI)
    .map((filepath) => {
      const markdown = readFileSync(filepath).toString()
      const source = filepath.replace(`${DIR_WIKI}/`, '').slice(0, -3)
      const links = (markdown.match(RE_VIMWIKI_LINK) ?? [])
        .map((l) => l.replace(RE_VIMWIKI_LINK, (match, $1) => {
          return $1
            .split('|')[0]
            .split('#')[0]
        }))
        .map((l) => join(dirname(source), l))

      return {
        source,
        links,
      }
    })

  for (const {source, links} of map) {
    graph.addNode(source)
    for (const target of links) {
      graph.addEdge({ source, target })
    }
  }

  return _cache.current = graph
}

const _cache = {
  current: undefined as Graph<string>,
}
