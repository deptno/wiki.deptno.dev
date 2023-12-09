import React from 'react'
import fs from 'node:fs/promises'
import { parse } from 'parser-vimwiki'
import { DIR_WIKI } from '../../constant'
import { marked } from '../../lib/marked'
import { Markdown } from '../../component/Markdown'
import { Header } from '../../component/Header'
import { ChildrenWithSearchResult } from '../../component/ChildrenWithSearchResult'
import { getAllList } from '../../lib/getAllList'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const { mostModified } = getAllList()

  try {
    const markdown = await fs.readFile(`${DIR_WIKI}/index.md`)
      .then((buffer) => buffer.toString())
      .then(parse)
    const html = marked(markdown)

    return (
      <>
        <Header placeholder={mostModified}/>
        <ChildrenWithSearchResult/>
        <Markdown data={html}/>
      </>
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

type Props = {
  params: {
    md: string
  }
}
