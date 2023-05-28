'use client'
import React, { FC } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Breadcrumbs: FC<Props> = (props) => {
  const pathname = usePathname().split('/').slice(1)

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {pathname.map((p, i, a) => {
          const href = '/' + pathname.slice(0, i).join('/')

          return (
            <li key={href}>
              <Link href={href}>
                { href }
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

type Props = {}
