import React from 'react'
import fs from 'node:fs/promises'
import { createRelativeLinkReplacer, parse } from 'parser-vimwiki'
import { DIR_WIKI } from '../../../constant'
import { marked } from '../../../lib/marked'
import { redirect } from 'next/navigation'
import { Markdown } from '../../../component/Markdown'
import { Header } from '../../../component/Header'

export default async (props: Props) => {
  const { md } = props.params
  const nested = Array.isArray(md)
  const path = nested
    ? md.join('/')
    : md
  const currentPath = nested
    ? md.slice(0, -1).join('/')
    : undefined
  const file = decodeURIComponent(`${DIR_WIKI}/${path}.md`)

  try {
    const markdown = await fs.readFile(file)
      .then((buffer) => buffer.toString())
      .then(createRelativeLinkReplacer(currentPath))
      .then(parse)
    const html = marked(markdown)

    return (
      <>
        <Header/>
        <Markdown data={html}/>
      </>
    )
  } catch (err) {
    if (path.endsWith('index')) {
      throw new Error(`unknown path: ${path}`)
    }
    return redirect(decodeURIComponent(`/wiki/${path}/index`))
  }
}

type Props = {
  params: {
    md: string | string[]
  }
}
