'use client'
import React, { FC } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Breadcrumbs: FC<Props> = (props) => {
  const pathname = usePathname().split('/').slice(1)

  return (
    <div className="breadcrumbs">
      <ul className="flex">
        {pathname.map((p, i, a) => {
          const href = '/' + pathname.slice(0, i).join('/')

          return (
            <li key={href} className={i === 0 ? 'bg-white text-gray-800' : ''}>
              <Link  className="underline px-1 underline-offset-4" href={href}>
                {pathname[i-1] ?? ''}/
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

type Props = {}
