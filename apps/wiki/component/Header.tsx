import React, { FC } from 'react'
import { SearchBar } from './SearchBar'
import { Breadcrumbs } from './Breadcrumbs'

export const Header: FC<Props> = (props) => {
  return (
    <header className="flex justify-between p-1 bg-gray-800 text-white">
      <Breadcrumbs/>
      <SearchBar/>
    </header>
  )
}

type Props = {
}
