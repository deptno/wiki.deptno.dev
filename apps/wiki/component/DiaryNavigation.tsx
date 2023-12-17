import React, { FC } from 'react'
import Link from 'next/link'
import { getAllList } from '../lib/getAllList'

export const DiaryNavigation: FC<Props> = props => {
  const { path } = props
  const { files } = getAllList()

  const index = files.findIndex((f) => f.slice(1) === path)
  const prev = files[index - 1]
  const next = files[index + 1]
  const hasPrev = prev?.startsWith('/diary/') && !prev?.startsWith('/diary/index')
  const hasNext = next?.startsWith('/diary/') && !next?.startsWith('/diary/index')

  return (
    <div className="flex flex-wrap gap-2 pb-2 m-0 leading-tight ml-auto">
      {hasPrev && <Link className="text-blue-600 underline" href={`/wiki/${prev}`}>이전({prev.slice('/diary/'.length)})</Link>}
      {hasNext && <Link className="text-blue-600 underline" href={`/wiki/${next}`}>다음({next.slice('/diary/'.length)})</Link>}
    </div>
  )
}

type Props = {
  path: string
}
