import React from 'react'
import fs from 'node:fs/promises'
import { createRelativeLinkReplacer, parse } from 'parser-vimwiki'
import { DIR_WIKI } from '../../../constant'
import { marked } from '../../../lib/marked'
import { Breadcrumbs } from '../../../component/Breadcrumbs'
import { redirect } from 'next/navigation'

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
        <Breadcrumbs/>
        <pre dangerouslySetInnerHTML={{ __html: html }}/>
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
