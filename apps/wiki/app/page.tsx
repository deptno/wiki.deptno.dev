import React, { cache } from 'react'
import { marked } from '../lib/marked'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI } from '../constant'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const list = getData(DIR_WIKI)

  try {
    return (
      <>
        <Header/>
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

const getData = cache((dir) => {
  const files = getAllMd(dir)

  return files
    .map((f) => f.replace(dir, '').slice(0, -3))
    .reduce((markdowns, file) => {
      return [
        ...markdowns,
        `- [${file}](${file})`,
      ]
    }, [])
    .join('\n')
})
