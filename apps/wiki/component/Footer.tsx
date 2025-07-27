import React, { FC } from 'react'
import { GitRevision } from './GitRevision'
import { WhoAmI } from './WhoAmI'

export const Footer: FC<Props> = props => {
  const { wiki } = props

  return (
    <footer className="flex p-2 bg-gray-800 w-full text-white">
      <a
        target="_blank"
        href="https://github.com/deptno/wiki.deptno.dev"
        className="text-white underline underline-offset-4 p-1 text-sm"
        rel="noreferrer"
      >
        git:frontend
      </a>
      <GitRevision wiki={wiki}/>
      <div className="ml-auto"/>
      <WhoAmI/>
    </footer>
  )
}

type Props = {
  wiki: string
  placeholder?: string
}
