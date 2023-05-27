import React from 'react'
import { marked } from 'marked'
import fs from 'node:fs/promises'
import { parse } from 'parser-vimwiki'

export default async (props: Props) => {
  const markdown = await fs.readFile(`./${props.params.md}.md`)
    .then((buffer) => buffer.toString())
    .then(parse)
  const html = marked(markdown)

  return <pre dangerouslySetInnerHTML={{ __html: html }}/>
}

type Props = {
  params: {
    md: string
  }
}
