'use client'
import React, { useEffect, useState } from 'react'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web'
import { instantMeiliSearch, InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'
import { SubContentPortal } from './SubContentPortal'

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
      <div className="flex flex-col text-gray-800">
        <SearchBox/>
        <SubContentPortal>
          <div
            className="whitespace-pre-wrap break-words break-all overflow-hidden">
            <div className="overflow-scroll">
              <Hits hitComponent={Hit}/>
            </div>
          </div>
        </SubContentPortal>
      </div>
    </InstantSearch>
  )
}
const Hit = (props) => {
  const { hit } = props
  const id = Buffer.from(hit.id, 'hex').toString()

  props.hit._highlightResult.content.value = props.hit._highlightResult.content.value
    .split('\n')
    .filter((v) => /<mark>/.exec(v))
    .join('\n')

  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2" key={id}>
      <Link className="underline text-blue-800" href={`/wiki/${id}`}>
        {id}
      </Link>
      <div className="flex-1 italic">
        <Highlight attribute="content" hit={hit}/>
      </div>
    </div>
  )
}
