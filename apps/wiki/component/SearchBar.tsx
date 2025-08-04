'use client'

import React, { useEffect, useState } from 'react'
// @ts-ignore
import type { SearchClient } from 'instantsearch.js'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'
import { SubContentPortal } from './SubContentPortal'
import { NEXT_PUBLIC_ENDPOINT } from '../constant'

export const SearchBar = (props: Props) => {
  const { placeholder, wiki } = props
  const [searchClient, setSearchClient] = useState<SearchClient | null>(null)

  useEffect(() => {
    const { searchClient: client } = instantMeiliSearch(
      `${NEXT_PUBLIC_ENDPOINT}/${wiki}/search`,
      undefined,
      {
        placeholderSearch: false,
        finitePagination: true,
        primaryKey: 'id',
      },
    )

    setSearchClient(client)
  }, [wiki])

  if (!searchClient) {
    return <div>로딩...</div>
  }

  return (
    <div className="flex w-full gap-2 items-center">
      <div className="hidden md:block chartreuse">⌘k</div>
      <div className="flex-grow">
        <InstantSearch indexName={wiki} searchClient={searchClient}>
          <SearchBox className="text-right" placeholder={placeholder}/>
          <SubContentPortal>
            <div className="whitespace-pre-wrap break-words break-all overflow-hidden">
              <div className="overflow-scroll">
                <Hits hitComponent={Hit}/>
              </div>
            </div>
          </SubContentPortal>
        </InstantSearch>
      </div>
    </div>
  )

  function Hit(props) {
    const { hit } = props
    const id = Buffer.from(hit.id, 'hex').toString()

    props.hit._highlightResult.content.value = props.hit._highlightResult.content.value
      .split('\n')
      .filter((v) => /<mark>/.exec(v))
      .join('\n')

    return (
      <div className="flex flex-col border-b-2" key={id}>
        <div className="flex items-center gap-1">
          <small className="hidden md:flex justify-center px-1 w-6 text-xs bg-gray-800 text-green-400 rounded-md">
            <div>{hit.__position}</div>
          </small>
          <Link className="underline text-blue-800 flex" href={`/${wiki}/${id}`} data-search-result={hit.__position}>
            <div>{id}</div>
          </Link>
        </div>
        <small className="flex-1 italic h-8">
          <Highlight attribute="content" hit={hit}/>
        </small>
      </div>
    )
  }

}
type Props = {
  placeholder?: string
  wiki: string
}
