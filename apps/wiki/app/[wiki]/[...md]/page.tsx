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
import { isPublicWiki } from '../../../lib/isPublicWiki'

export default async (props: Props) => {
  if (!isPublicWiki(props.params.wiki)) {
    throw new Error('403')
  }

  const { path, currentPath, wiki } = getPath(props)
  const { getRandomLatestModifiedFileName } = getAllList()

  try {
    const markdown = await getMarkdown(path).then(
      createRelativeLinkReplacer(currentPath),
    )
    const html = marked(markdown)

    return (
      <>
        <Header placeholder={getRandomLatestModifiedFileName()} />
        <Markdown data={html}>
          <MarkdownAside data={html} wiki={wiki} path={path} />
        </Markdown>
      </>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(decodeURIComponent(`/${path}/index`))
    }

    return <NoPage name={path} />
  }
}
type Props = {
  params: {
    wiki: string
    md: string[]
  }
}

export async function generateMetadata(props: Props) {
  const result = getPath(props)
  if (!result) {
    return
  }

  const { path } = result
  try {
    const [first, ...lines] = await getMarkdown(path).then(md => md.split('\n'))
    const title = first.replace(/^#*%s/g, '')
    const description = lines.join('\n')

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${ENDPOINT}/${path}`,
      },
    }
  } catch (e) {
    console.warn(`warn: [${e.code}] ${e.message}`)

    return {
      openGraph: {
        url: `${ENDPOINT}/${path}`,
      },
    }
  }
}

function _getPath(props: Props) {
  if (!isPublicWiki(props.params.wiki)) {
    return
  }

  const md = props.params.md.map(decodeURIComponent)
  const paths = [props.params.wiki, ...md]
  const path = paths.join('/')
  const currentPath = md.slice(0, -1).join('/')

  return {
    path,
    currentPath,
    wiki: props.params.wiki,
  }
}
async function _getMarkdown(path: string) {
  const file = decodeURIComponent(`${DIR_WIKI}/${path}.md`)

  return await fs.readFile(file).then(buffer => buffer.toString())
}

const getPath = IS_PROD ? cache(_getPath) : _getPath
const getMarkdown = IS_PROD ? cache(_getMarkdown) : _getMarkdown
