import React, { FC } from 'react'
import Link from 'next/link'

export const LinkList: FC<Props> = (props) => {
  const { wiki, graphData } = props

  return (
    <div className="flex flex-wrap gap-2 p-0 m-0 leading-tight">
      {graphData.nodes.map((n) => {
        return (
          <span key={n.id}>
            <Link className="text-blue-600" href={`/${wiki}/${n.id}`}>
              <span className="underline">{n.name}</span>
              <sup>{n.val}</sup>
            </Link>
          </span>
        )
      })}
    </div>
  )
}

type Props = {
  wiki: string
  graphData: any
}
