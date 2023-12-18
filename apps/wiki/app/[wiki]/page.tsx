import React, { cache } from 'react'
import fs from 'node:fs/promises'
import { parse } from 'parser-vimwiki'
import { DIR_WIKI, IS_PROD } from '../../constant'
import { marked } from '../../lib/marked'
import { Markdown } from '../../component/Markdown'
import { Header } from '../../component/Header'
import { ChildrenWithSearchResult } from '../../component/ChildrenWithSearchResult'
import { getAllList } from '../../lib/getAllList'
import { isPublicWiki } from '../../lib/isPublicWiki'

export default async (props: Props) => {
  const { wiki } = props.params
  const { getRandomLatestModifiedFileName } = getAllList()

  try {
    const html = await getData(wiki)

    return (
      <>
        <Header placeholder={getRandomLatestModifiedFileName()} />
        <ChildrenWithSearchResult />
        <Markdown data={html} />
      </>
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

type Props = {
  params: {
    wiki: string
  }
}

async function _getData(wiki: string) {
  if (!isPublicWiki(wiki)) {
    return wiki
  }

  const markdown = await fs
    .readFile(`${DIR_WIKI}/${wiki}/index.md`)
    .then(buffer => buffer.toString())
    .then(parse)
  return marked(markdown)
}
const getData = IS_PROD ? cache(_getData) : _getData
