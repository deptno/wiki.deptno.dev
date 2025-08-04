import React, { FC } from 'react'
import { SearchBar } from './SearchBar'
import { Breadcrumbs } from './Breadcrumbs'
import Link from 'next/link'

export const Header: FC<Props> = props => {
  const { wiki, placeholder } = props

  return (
    <header className="flex flex-col p-2 bg-gray-800 w-full">
      <SearchBar wiki={wiki} placeholder={placeholder}/>
      <div className="flex justify-between items-center text-sm text-white">
        <Link
          href={`/${wiki}/diary/index`}
          className="text-white underline underline-offset-4 p-1"
          id="diary"
        >
          diary
        </Link>
        <div className="ml-auto"/>
        <Breadcrumbs/>
      </div>
    </header>
  )
}

type Props = {
  wiki: string
  placeholder?: string
}
