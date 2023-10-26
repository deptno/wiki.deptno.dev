import { createGraph, Graph } from './lib/createGraph'
import { join } from 'node:path'
import { getAllMd } from './lib/getAllMd'
import { RE_MARKDOWN_LINK, RE_VIMWIKI_LINK } from 'parser-vimwiki/constant'
import { readFileSync } from 'fs'
import { DIR_WIKI } from './constant'
import { getNameFromLink } from './lib/getNameFromLink'
import { getVimwikiLinkBaseName } from './lib/getVimwikiLinkBaseName'
import { getMakrdownLinkBaseName } from './lib/getMarkdownLinkBaseName'

export const getGraph = () => {
  if (_cache.current) {
    return _cache.current
  }

  const graph = createGraph()
  const map = getAllMd(DIR_WIKI)
    .map((filepath: string) => {
      const markdown = readFileSync(filepath).toString()
      const source = filepath.replace(`${DIR_WIKI}/`, '').slice(0, -3)
      const vimwikiLinks = (markdown.match(RE_VIMWIKI_LINK) ?? [])
        .map((l: string) => {
          return join(
            getVimwikiLinkBaseName(source, l),
            l.replace(RE_VIMWIKI_LINK, getNameFromLink)
          )
        })
      const markdownLinks = (markdown.match(RE_MARKDOWN_LINK) ?? [])
        .map((l: string) => {
          return join(
            getMakrdownLinkBaseName(source, l),
            l.replace(RE_MARKDOWN_LINK, getNameFromLink)
          )
        })
      const links = [
        ...vimwikiLinks,
        ...markdownLinks,
      ]

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
