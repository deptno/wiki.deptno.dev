import React from 'react'
import { marked } from 'marked'
import fs from 'node:fs/promises'
import { parse } from 'parser-vimwiki'

export default async (props: Props) => {
  try {
    const markdown = await fs.readFile(`/mnt/data/${props.params.md ?? 'index'}.md`)
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
