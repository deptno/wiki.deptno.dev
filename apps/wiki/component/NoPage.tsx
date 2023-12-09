import React, { FC } from 'react'
import { Header } from './Header'
import { getGraph } from '../getGraph'
import { LinkGraph } from './LinkGraph'
import { GIT_BRANCH, URL_WIKI } from '../constant'
import { GoBack } from './GoBack'

// @ts-ignore
export const NoPage: FC<Props> = async (props) => {
  const graph = await getGraph()
  const [ path ] = props.name.split('/')
  const g = graph.getLinkGraphData(path)

  return (
    <>
      <Header/>
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <span>존재하지 않는 문서입니다.</span>
        <a className="underline underline-offset-4" href={`${URL_WIKI}/new/${GIT_BRANCH}?filename=${path}.md`} target="_blank">생성하기</a>
        <LinkGraph graphData={g}/>
        <GoBack />
      </div>
    </>
  )
}

type Props = {
  name: string
}
