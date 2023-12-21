import React, { FC, ReactNode } from 'react'

export const ChildrenWithSearchResult: FC<Props> = (props) => {
  const { children } = props

  return (
    <aside id="sidebar" className="top-0 px-2 break-words border border-gray-800 3xl:text-md 3xl:border-hidden relataive flex flex-col gap-2">
      <div id="search-result" />
      {children}
    </aside>
  )
}

type Props = {
  children?: ReactNode
}
