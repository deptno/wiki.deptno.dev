import { createGraph, Graph } from './lib/createGraph'
import { join } from 'node:path'
import { getAllMd } from './lib/getAllMd'
import { RE_MARKDOWN_LINK, RE_VIMWIKI_LINK } from 'parser-vimwiki/constant'
import { readFileSync } from 'fs'
import { CONFIG, DIR_DATA, IS_PROD } from './constant'
import { getNameFromLink } from './lib/getNameFromLink'
import { getVimwikiLinkBaseName } from './lib/getVimwikiLinkBaseName'
import { getMakrdownLinkBaseName } from './lib/getMarkdownLinkBaseName'
import { createVimwikiPrefixHandler } from './lib/createVimwikiPrefixHandler'

export const getGraph = (wiki: string) => {
  if (IS_PROD) {
    if (_cache.current[wiki]) {
      return _cache.current[wiki]
    }
  }

  const graph = createGraph()
  const wikiDir = join(DIR_DATA, wiki)
  const handleVimwikiPrefix = createVimwikiPrefixHandler(
    CONFIG.find(w => w.dir === wiki)?.diaryDir ?? 'diary',
  )
  const map = getAllMd(wikiDir)
    .map((filepath: string) => filepath.toLowerCase())
    .map((filepath: string) => {
      const markdown = readFileSync(filepath).toString()
      const source = filepath.replace(`${wikiDir}/`, '').slice(0, -3)
      const vimwikiLinks = (markdown.match(RE_VIMWIKI_LINK) ?? []).map(
        (l: string) => {
          return join(
            getVimwikiLinkBaseName(source, l),
            l.replace(RE_VIMWIKI_LINK, getNameFromLink),
          )
        },
      )
      const markdownLinks = (
        markdown
          // vimwiki markdown 설정에서 enter 를 치면 `-` 대신 space가 이름에 입력됨
          .replace(/ /g, '-')
          .match(RE_MARKDOWN_LINK) ?? []
      ).map((l: string) => {
        return join(
          getMakrdownLinkBaseName(source, l),
          l.replace(RE_MARKDOWN_LINK, getNameFromLink),
        )
      })
      const links = [...vimwikiLinks, ...markdownLinks]
        .map(handleVimwikiPrefix)
        .filter(Boolean)

      return {
        source,
        links,
      }
    })

  for (const { source, links } of map) {
    for (const target of links) {
      graph.addEdge({ source, target })
    }
  }

  return (_cache.current[wiki] = graph)
}

const _cache = {
  current: {} as Record<string, Graph<string>>
}
