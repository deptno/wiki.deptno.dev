import React from 'react'
import fs from 'node:fs/promises'
import { parse } from 'parser-vimwiki'
import { DIR_WIKI } from '../../constant'
import { marked } from '../../lib/marked'
import { Markdown } from '../../component/Markdown'
import { Header } from '../../component/Header'
import { ChildrenWithSearchResult } from '../../component/ChildrenWithSearchResult'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  try {
    const markdown = await fs.readFile(`${DIR_WIKI}/index.md`)
      .then((buffer) => buffer.toString())
      .then(parse)
    const html = marked(markdown)

    return (
      <>
        <Header />
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
