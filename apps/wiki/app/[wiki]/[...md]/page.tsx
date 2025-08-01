import React from 'react'
import { redirect } from 'next/navigation'
import { Header } from '../../../component/Header'
import { NoPage } from '../../../component/NoPage'
import { Markdown } from '../../../component/Markdown'
import { MarkdownAside } from '../../../component/MarkdownAside'
import { getAllList } from '../../../lib/getAllList'
import { getHtml } from '../../../lib/getHtml'
import { getMarkdownMetadata } from '../../../lib/generateMetadata'
import { getPath } from '../../../lib/getPath'
import { Footer } from '../../../component/Footer'

export const dynamic = 'force-static'
export default async function Page(props: Props) {
  const params = await props.params
  const { path, currentPath, wiki } = getPath([
    params.wiki,
    ...params.md,
  ])

  try {
    const { getRandomLatestModifiedFileName } = getAllList(wiki)
    const html = await getHtml({ wiki, path, currentPath })

    return (
      <>
        <Header wiki={wiki} placeholder={getRandomLatestModifiedFileName()}/>
        <Markdown data={html}>
          <MarkdownAside data={html} wiki={wiki} path={path}/>
        </Markdown>
        <Footer wiki={wiki}/>
      </>
    )
  } catch (err) {
    if (!path.endsWith('index')) {
      return redirect(decodeURIComponent(`/${path}/index`))
    }

    return <NoPage name={path}/>
  }
}
type Props = {
  params: Promise<{
    wiki: string
    md: string[]
  }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params

  return getMarkdownMetadata([params.wiki, ...params.md])
}

const file = import.meta.url
