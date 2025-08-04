import React, { FC } from 'react'
import { Header } from './Header'
import { getGraph } from '../getGraph'
import { LinkGraph } from './LinkGraph'
import { NEXT_PUBLIC_GIT_BRANCH } from '../constant'
import { tryToGetWiki } from '../lib/tryToGetWiki'
import { ChildrenWithSearchResult } from './ChildrenWithSearchResult'
import { HotKey } from './HotKey'
import { Footer } from './Footer'

// @ts-ignore
export const NoPage: FC<Props> = async (props) => {
  const [wiki, ...paths] = props.name.split('/')
  const filename = getFilename(paths)
  const graph = getGraph(wiki)
  const g = graph.getLinkGraphData(decodeURIComponent(filename))
  const cw = tryToGetWiki(wiki)

  return (
    <>
      <HotKey />
      <Header wiki={wiki} />
      <ChildrenWithSearchResult/>
      <div className="min-h-32">
        <LinkGraph wiki={wiki} graphData={g}/>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-10">
        <span>존재하지 않는 문서입니다.</span>
        <a
          className="underline underline-offset-4"
          href={`${cw.url}/new/${NEXT_PUBLIC_GIT_BRANCH}?filename=${filename}.md`}
          target="_blank"
          rel="noreferrer"
        >
          생성하기
        </a>
      </div>
      <Footer wiki={wiki}/>
    </>
  )
}

type Props = {
  name: string
}

function getFilename(paths: string[]) {
  if (paths.length >= 2) {
    if (paths[paths.length - 1] === 'index') {
      return paths
        .filter((_, i) => i !== paths.length - 1)
        .join('/')
    }
  }

  return paths.join('/')
}
