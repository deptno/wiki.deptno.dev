import React, { FC } from 'react'
import { SearchBar } from './SearchBar'
import { Breadcrumbs } from './Breadcrumbs'
import { GitRevision } from './GitRevision'
import { FrontendRepoHeaderLink } from './FrontendRepoHeaderLink'
import { MeHeaderLink } from './MeHeaderLink'

export const Header: FC<Props> = props => {
  return (
    <header className="flex flex-col p-3 bg-gray-800 gap-2 w-full">
      <SearchBar placeholder={props.placeholder} />
      <div className="flex justify-between text-white gap-2">
        <FrontendRepoHeaderLink />
        <GitRevision />
        <MeHeaderLink />
        <div className="ml-auto" />
        <Breadcrumbs />
      </div>
    </header>
  )
}

type Props = {
  placeholder?: string
}
