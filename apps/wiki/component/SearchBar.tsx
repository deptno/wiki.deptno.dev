'use client'
import React, { useEffect, useState } from 'react'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web'
import { instantMeiliSearch, InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'


export const SearchBar = () => {
  const [searchClient, setSearchClient] = useState<InstantMeiliSearchInstance>()

  useEffect(() => {
    const searchClient = instantMeiliSearch(
      process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
      undefined,
      {
        placeholderSearch: false,
        finitePagination: true,
        primaryKey: 'id',
        requestConfig: {},
      },
    )

    setSearchClient(searchClient)
  }, [])

  if (!searchClient) {
    return <div>로딩...</div>
  }

  return (
    <InstantSearch
      indexName="wiki"
      searchClient={searchClient}
    >
      <div className="flex flex-col">
        <SearchBox/>
        <div
          className="absolute top-7 left-0 bg-stone-400 w-full whitespace-pre-wrap break-words break-all text-xs overflow-x-hidden">
          <div className="overflow-x-scroll">
            <Hits hitComponent={Hit}/>
          </div>
        </div>
      </div>
    </InstantSearch>
  )
}
const Hit = (props) => {
  const { hit } = props
  const id = Buffer.from(hit.id, 'hex').toString()

  return (
    <div className="grid grid-cols-[100px_1fr] border-b-2">
      <Link className="font-bold underline text-blue-800" href={`/wiki/${id}`}>
        {id}
      </Link>
      <div className="flex-1">
        <Highlight attribute="content" hit={hit}/>
      </div>
    </div>
  )
}
