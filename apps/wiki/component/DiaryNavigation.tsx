import React, { FC } from 'react'
import Link from 'next/link'
import { getAllList } from '../lib/getAllList'
import { RE_YYYYMMDD } from '../constant'

export const DiaryNavigation: FC<Props> = props => {
  const { wiki, path } = props
  const prefix = `/${wiki}/diary/`

  if (!path.startsWith(prefix.slice(1))) {
    return null
  }

  const { files } = getAllList(wiki)
  const diaries = files.filter(t => {
    if (t.startsWith(prefix)) {
      return RE_YYYYMMDD.test(t.slice(prefix.length))
    }
  })
  const index = diaries.findIndex((f) => f.slice(1) === path)
  const prev = diaries[index - 1]
  const next = diaries[index + 1]
  const hasPrev = prev?.startsWith(prefix) && !prev?.startsWith(`${prefix}index`)
  const hasNext = next?.startsWith(prefix) && !next?.startsWith(`${prefix}index`)

  return (
    <div className="flex flex-wrap gap-2 pb-2 m-0 leading-tight ml-auto">
      {hasPrev && (
        <Link id="prev-date" className="text-blue-600 underline flex gap-1 opacity-70" href={prev}>
          <div className="hidden md:inline text-center px-1 w-6 bg-gray-800 text-green-400 rounded-md">h</div>
          이전({prev.slice(prefix.length)})
        </Link>
      )}
      {hasNext && (
        <Link id="next-date" className="text-blue-600 underline flex gap-1 opacity-70" href={next}>
          <div className="hidden md:inline text-center px-1 w-6 bg-gray-800 text-green-400 rounded-md">l</div>
          다음({next.slice(prefix.length)})
        </Link>
      )}
    </div>
  )
}

type Props = {
  wiki: string
  path: string
}
