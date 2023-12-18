import React from 'react'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'
import { MarkdownAside } from '../../../component/MarkdownAside'
import { getAllList } from '../../../lib/getAllList'
import { isPublicWiki } from '../../../lib/isPublicWiki'
import { getHtml } from '../../../lib/getHtml'
import { getMarkdownMetadata } from '../../../lib/generateMetadata'
import { getPath } from "../../../lib/getPath"

export default async (props: Props) => {
  if (!isPublicWiki(props.params.wiki)) {
    throw new Error('403')
  }

  const { path, currentPath, wiki } = getPath([props.params.wiki, ...props.params.md])

  try {
    const { getRandomLatestModifiedFileName } = getAllList(wiki)
    const html = await getHtml({ path, currentPath })

    return (
      <>
        <Header wiki={wiki} placeholder={getRandomLatestModifiedFileName()} />
        <Markdown data={html}>
          <MarkdownAside data={html} wiki={wiki} path={path} />
        </Markdown>
      </>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(decodeURIComponent(`/${path}/index`)) }

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
  return getMarkdownMetadata([props.params.wiki, ...props.params.md])
}
