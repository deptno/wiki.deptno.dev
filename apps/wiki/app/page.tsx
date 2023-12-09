import React, { cache } from 'react'
import { marked } from '../lib/marked'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI } from '../constant'
import { Header } from '../component/Header'
import { Markdown } from '../component/Markdown'
import { ChildrenWithSearchResult } from '../component/ChildrenWithSearchResult'
import { getLastModifiedFiles } from '../lib/getLastModifiedFiles'
import { basename } from 'node:path'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const { files, lastModified, mostModified } = getData(DIR_WIKI)

  try {
    return (
      <>
        <Header placeholder={mostModified}/>
        <ChildrenWithSearchResult/>
        <div className="p-4 text-lg">위키</div>
        <Markdown data={marked('- [public-wiki](/)')}/>
        <div className="p-4 text-lg">최근 수정</div>
        <Markdown data={marked(lastModified)}/>
        <div className="p-4 text-lg">files</div>
        <Markdown data={marked(files)}/>
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
  const toMarkdown = (files: string[]) => {
    return files
      .map((f: string) => f.replace(dir, '').slice(0, -3))
      .reduce((markdowns: string[], file: string) => {
        return [
          ...markdowns,
          `- [${file}](${file})`,
        ]
      }, [])
      .join('\n')
  }
  const files = getAllMd(dir)
  const lastModified = getLastModifiedFiles()

  return {
    files: toMarkdown(files),
    lastModified: toMarkdown(lastModified),
    mostModified: lastModified[0]
      ? basename(lastModified[0], '.md')
      : undefined,
  }
})
