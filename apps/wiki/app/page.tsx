import React, { cache } from 'react'
import { marked } from '../lib/marked'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI } from '../constant'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const list = getData(DIR_WIKI)

  try {
    return (
      <>
        <Header/>
        <ChildrenWithSearchResult/>
        <div className="p-4 text-lg">wikis</div>
        <Markdown data={marked('- [/wiki](/)')}/>
        <div className="p-4 text-lg">files</div>
        <Markdown data={marked(list)}/>
      </>
    )
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

const getData = cache((dir: string) => {
  const files = getAllMd(dir)

  return files
    .map((f: string) => f.replace(dir, '').slice(0, -3))
    .reduce((markdowns: string[], file: string) => {
      return [
        ...markdowns,
        `- [${file}](${file})`,
      ]
    }, [])
    .join('\n')
})
