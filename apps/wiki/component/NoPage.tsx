import React, { FC } from 'react'
import { Header } from './Header'

export const NoPage: FC<Props> = (props) => {
  return (
    <>
      <Header/>
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <code>{props.name}</code>
        <span>존재하지 않는 문서입니다.</span>
      </div>
    </>
  )
}

type Props = {
  name: string
}
