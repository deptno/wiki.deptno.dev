'use client'

import React, { useEffect, useState } from 'react'
// @ts-ignore
import type { SearchClient } from 'instantsearch.js'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'
import { SubContentPortal } from './SubContentPortal'
import { NEXT_PUBLIC_MEILISEARCH_API_KEY, NEXT_PUBLIC_MEILISEARCH_HOST } from '../constant'

export const SearchBar = (props: Props) => {
  const { placeholder, wiki } = props
  const [searchClient, setSearchClient] = useState<SearchClient | null>(null)

  useEffect(() => {
    const { searchClient: client } = instantMeiliSearch(
      NEXT_PUBLIC_MEILISEARCH_HOST,
      NEXT_PUBLIC_MEILISEARCH_API_KEY,
      {
        placeholderSearch: false,
        finitePagination: true,
        primaryKey: 'id',
      },
    )

    setSearchClient(client)
  }, [])
  if (!searchClient) {
    return <div>로딩...</div>
  }

  return (
    <InstantSearch indexName="wiki" searchClient={searchClient}>
      <SearchBox placeholder={placeholder}/>
      <SubContentPortal>
        <div className="whitespace-pre-wrap break-words break-all overflow-hidden">
          <div className="overflow-scroll">
            <Hits hitComponent={Hit}/>
          </div>
        </div>
      </SubContentPortal>
    </InstantSearch>
  )

  function Hit(props) {
    const { hit } = props
    const id = Buffer.from(hit.id, 'hex').toString()

    props.hit._highlightResult.content.value = props.hit._highlightResult.content.value
      .split('\n')
      .filter((v) => /<mark>/.exec(v))
      .join('\n')

    return (
      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2" key={id}>
        <Link className="underline text-blue-800" href={`/${wiki}/${id}`}>
          {id}
        </Link>
        <div className="flex-1 italic">
          <Highlight attribute="content" hit={hit}/>
        </div>
      </div>
    )
  }

}
type Props = {
  placeholder?: string
  wiki: string
}
