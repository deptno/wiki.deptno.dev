import React from 'react'
import fs from 'node:fs/promises'
import { createRelativeLinkReplacer, parse } from 'parser-vimwiki'
import { DIR_WIKI } from '../../../constant'
import { marked } from '../../../lib/marked'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'

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
        <Markdown path={path} data={html}/>
      </>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(decodeURIComponent(`/wiki/${path}/index`))
    }

    return <NoPage name={path}/>
  }
}

type Props = {
  params: {
    md: string | string[]
  }
}
