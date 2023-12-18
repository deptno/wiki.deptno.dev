import React, { cache } from 'react'
import fs from 'node:fs/promises'
import { createRelativeLinkReplacer } from 'parser-vimwiki'
import { DIR_WIKI, ENDPOINT, IS_PROD } from '../../../constant'
import { marked } from '../../../lib/marked'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'
import { MarkdownAside } from '../../../component/MarkdownAside'
import { getAllList } from '../../../lib/getAllList'

export default async (props: Props) => {
  const md = props.params.md.map(decodeURIComponent)
  const path = md.join('/')
  const currentPath = md.slice(0, -1).join('/')
  const { getRandomLatestModifiedFileName } = getAllList()

  try {
    const markdown = await getMarkdown(path)
      .then(createRelativeLinkReplacer(currentPath))
    const html = marked(markdown)

    return (
      <>
        <Header placeholder={getRandomLatestModifiedFileName()} />
        <Markdown data={html}>
          <MarkdownAside data={html} path={path} />
        </Markdown>
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
    md: string[]
  }
}

export async function generateMetadata({ params }: Props) {
  const path = params.md.map(decodeURIComponent).join('/')

  try {
    const [first, ...lines] = await getMarkdown(path).then((md) => md.split('\n'))
    const title = first.replace(/^#*%s/g, '')
    const description = lines.join('\n')

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${ENDPOINT}/wiki/${path}`,
      },
    }
  } catch(e) {
    console.warn(`warn: [${e.code}] ${e.message}`)

    return {
      openGraph: {
        url: `${ENDPOINT}/wiki/${path}`,
      }
    }
  }
}

const _getMarkdown = async (path: string) => {
  const file = decodeURIComponent(`${DIR_WIKI}/${path}.md`)

  return await fs.readFile(file).then((buffer) => buffer.toString())
}
const getMarkdown = IS_PROD ? cache(_getMarkdown) : _getMarkdown
