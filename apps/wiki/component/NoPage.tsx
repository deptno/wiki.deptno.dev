import React, { FC } from 'react'
import { Header } from './Header'
import { getGraph } from '../getGraph'
import { LinkGraph } from './LinkGraph'
import { GIT_BRANCH, URL_WIKI } from '../constant'
import { GoBack } from './GoBack'

// @ts-ignore
export const NoPage: FC<Props> = async (props) => {
  console.log('nopage props', props)
  const { wiki } = props
  const [ path ] = props.name.split('/')
  const graph = getGraph(path)
  const g = graph.getLinkGraphData(path)

  // FIXME:
  return (
    <>
      <Header/>
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <span>존재하지 않는 문서입니다.</span>
        <a className="underline underline-offset-4" href={`${URL_WIKI}/new/${GIT_BRANCH}?filename=${path}.md`} target="_blank">생성하기</a>
        <LinkGraph wiki={wiki} graphData={g}/>
        <GoBack />
      </div>
    </>
  )
}

type Props = {
  wiki: string
  name: string
}
