import React, { FC, ReactNode } from 'react'

export const FullPageSearchResult: FC<Props> = (props) => {
  return (
    <div className="relative overflow-hidden">
      <aside
        id="sidebar"
        className="full-page top-0 left-0 px-2 break-words bg-gray-200 opacity-80 relataive flex flex-col gap-2 h-auto"
      >
        <div id="search-result"/>
      </aside>
    </div>
  )
}

type Props = {
  children?: ReactNode
}
