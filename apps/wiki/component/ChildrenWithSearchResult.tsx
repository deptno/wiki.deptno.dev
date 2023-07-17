import React, { FC, ReactNode } from 'react'

export const ChildrenWithSearchResult: FC<Props> = (props) => {
  const { children } = props

  return (
    <aside id="sidebar" className="px-2 break-words border border-gray-800 3xl:text-md 3xl:border-hidden relataive">
      {children}
    </aside>
  )
}

type Props = {
  children?: ReactNode
}
