import React, { FC } from 'react'
import Link from 'next/link'
import { getAllList } from '../lib/getAllList'

export const DiaryNavigation: FC<Props> = props => {
  const { wiki, path } = props
  const prefix = `/${wiki}/diary/`

  if (!path.startsWith(prefix.slice(1))) {
    return null
  }

  const { files } = getAllList()
  const index = files.findIndex((f) => f.slice(1) === path)
  const prev = files[index - 1]
  const next = files[index + 1]
  const hasPrev = prev?.startsWith(prefix) && !prev?.startsWith(`${prefix}index`)
  const hasNext = next?.startsWith(prefix) && !next?.startsWith(`${prefix}index`)

  return (
    <div className="flex flex-wrap gap-2 pb-2 m-0 leading-tight ml-auto">
      {hasPrev && <Link className="text-blue-600 underline" href={prev}>이전({prev.slice(prefix.length)})</Link>}
      {hasNext && <Link className="text-blue-600 underline" href={next}>다음({next.slice(prefix.length)})</Link>}
    </div>
  )
}

type Props = {
  wiki: string
  path: string
}
