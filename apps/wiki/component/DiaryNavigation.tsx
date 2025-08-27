import React, { FC } from 'react'
import Link from 'next/link'
import { getAllList } from '../lib/getAllList'
import { RE_YYYYMMDD } from '../constant'
import { getDiaryIndex } from '../lib/getDiaryIndex'

export const DiaryNavigation: FC<Props> = props => {
  let { path } = props
  const { wiki } = props
  const prefix = `/${wiki}/diary/`

  if (path.endsWith('/index')) {
    path = path.slice(0, -'/index'.length)
  }
  if (!path.startsWith(prefix.slice(1))) {
    return null
  }
  if (!RE_YYYYMMDD.test(path.slice(prefix.length - 1))) {
    return null
  }

  const { files } = getAllList(wiki)
  const diaries = files.filter(t => {
    if (t.startsWith(prefix)) {
      return RE_YYYYMMDD.test(t.slice(prefix.length))
    }
  })
  const index = getDiaryIndex({
    items: diaries,
    item: `/${path}`,
  })
  const prev = diaries[index - 1]
  const next = diaries[index + 1]
  const hasPrev = prev?.startsWith(prefix) && !prev?.startsWith(`${prefix}index`)
  const hasNext = next?.startsWith(prefix) && !next?.startsWith(`${prefix}index`)
  const today = new Date().toLocaleDateString('sv-SE')
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')

  return (
    <div className="flex">
      <div className="flex flex-wrap gap-2 pb-2 m-0 leading-tight">
        <Link id="today-date" className="text-blue-600 underline flex gap-1 opacity-70" href={`/${wiki}/diary/${today}`}>
          <div className="hidden md:inline text-center px-1 w-6 bg-gray-800 text-green-400 rounded-md">t</div>
          오늘
        </Link>
        <Link id="tomorrow-date" className="text-blue-600 underline flex gap-1 opacity-70" href={`/${wiki}/diary/${tomorrow}`}>
          <div className="hidden md:inline text-center px-1 w-6 bg-gray-800 text-green-400 rounded-md">m</div>
          내일
        </Link>
      </div>
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
    </div>
  )
}

type Props = {
  wiki: string
  path: string
}
