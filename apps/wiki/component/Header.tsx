import React, { FC } from 'react'
import { SearchBar } from './SearchBar'
import { Breadcrumbs } from './Breadcrumbs'

export const Header: FC<Props> = (props) => {
  return (
    <header className="flex justify-between pl-2">
      <Breadcrumbs/>
      <SearchBar/>
    </header>
  )
}

type Props = {
}
