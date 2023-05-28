import React from 'react'
import { marked } from 'marked'
import fs from 'node:fs/promises'
import { parse } from 'parser-vimwiki'
import { DIR_WIKI } from '../../constant'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  try {
    const markdown = await fs.readFile(`${DIR_WIKI}/index.md`)
      .then((buffer) => buffer.toString())
      .then(parse)
    const html = marked(markdown)

    return <pre dangerouslySetInnerHTML={{ __html: html }}/>
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
