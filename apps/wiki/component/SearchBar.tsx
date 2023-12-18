'use client'
import React, { useEffect, useState } from 'react'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { instantMeiliSearch, InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'
import { SubContentPortal } from './SubContentPortal'

export const SearchBar = (props: Props) => {
  const [searchClient, setSearchClient] = useState<InstantMeiliSearchInstance>()

  useEffect(() => {
    const { searchClient } = instantMeiliSearch(
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
    <InstantSearch indexName="wiki" searchClient={searchClient}>
      <SearchBox placeholder={props.placeholder}/>
      <SubContentPortal>
        <div className="whitespace-pre-wrap break-words break-all overflow-hidden">
          <div className="overflow-scroll">
            <Hits hitComponent={Hit}/>
          </div>
        </div>
      </SubContentPortal>
    </InstantSearch>
  )
}
type Props = {
  placeholder?: string
}

const Hit = (props) => {
  const { hit } = props
  const id = Buffer.from(hit.id, 'hex').toString()

  props.hit._highlightResult.content.value = props.hit._highlightResult.content.value
    .split('\n')
    .filter((v) => /<mark>/.exec(v))
    .join('\n')

  // FIXME: public-wiki 하드 코딩
  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] border-b-2" key={id}>
      <Link className="underline text-blue-800" href={`/public-wiki/${id}`}>
        {id}
      </Link>
      <div className="flex-1 italic">
        <Highlight attribute="content" hit={hit}/>
      </div>
    </div>
  )
}
