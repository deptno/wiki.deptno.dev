import React, { cache } from 'react'
import { marked } from '../lib/marked'
import { getAllMd } from '../lib/getAllMd'
import { DIR_WIKI } from '../constant'

export const dynamic = 'force-dynamic'
export default async (props: Props) => {
  const list = getData(DIR_WIKI)
  const markdown = `
# wikis
[/wiki](/)

# files

${list}
  `.trim()
  try {
    const html = marked(markdown)

    return (
      <>
        <pre dangerouslySetInnerHTML={{ __html: html }}/>
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
        `[${file}](${file})`,
      ]
    }, [])
    .join('\n')
})
