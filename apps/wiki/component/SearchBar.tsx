'use client'
import React from 'react'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { marked } from '../lib/marked'

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

export const SearchBar = () => (
  <InstantSearch
    indexName="wiki"
    searchClient={searchClient}
  >
    <SearchBox/>
    <Hits hitComponent={Hit}/>
  </InstantSearch>
)
const Hit = (props) => {
  const { hit } = props

  return (
    <div>
      <span>
      {Buffer.from(hit.id, 'hex').toString()}
      </span>
      <Highlight attribute="content" hit={hit}/>
      <pre dangerouslySetInnerHTML={{ __html: marked(hit.content) }}/>
    </div>
  )
}
