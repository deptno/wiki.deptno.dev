'use client'

import React, { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export const Breadcrumbs: FC<Props> = (props) => {
  const current = usePathname()
  const pathname = decodeURI(current).split('/')
  const targets = pathname[pathname.length - 1] === 'index'
    // index 로 끝나는 case 는 표시 하지 않음 ex. diary/index
    ? pathname.slice(0, -1)
    : pathname
  const { refresh } = useRouter()

  return (
    <div className="breadcrumbs flex gap-1 items-center max-w-full overflow-hidden">
      <ul className="flex gap-1 overflow-x-auto whitespace-nowrap max-w-full">
        {targets.map((p, i, a) => {
          const href = pathname.slice(0, i + 1).join('/') || '/'

          if (i < pathname.length - 1) {
            return (
              <li key={i}>
                <Link className="underline text-sm underline-offset-4" href={href}>
                  {pathname[i]}/
                </Link>
              </li>
            )
          }

          if (href === current) {
            // 현재경로가 url와 동일한 경우 refresh
            return (
              <li key={i}>
                <div className="underline text-sm underline-offset-4 cursor-pointer" onClick={refresh}>
                  {pathname[i]}
                </div>
              </li>
            )
          }

          // */index 케이스
          return (
            <li key={i}>
              <Link className="underline text-sm underline-offset-4" href={href}>
                {pathname[i]}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

type Props = {}
