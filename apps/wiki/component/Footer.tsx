import React, { FC } from 'react'
import { GitRevision } from './GitRevision'
import { WhoAmI } from './WhoAmI'
import { NEXT_PUBLIC_GIT_COMMIT } from '../constant'

export const Footer: FC<Props> = props => {
  const { wiki } = props

  return (
    <footer className="flex p-2 bg-gray-800 w-full text-white items-center">
      <div className="text-center text-green-400 rounded-md text-sm">
        f1
      </div>
      <a
        target="f1"
        href={`https://github.com/deptno/wiki.deptno.dev/blob/${NEXT_PUBLIC_GIT_COMMIT}/apps/wiki/component/HotKey.tsx`}
        className="text-white underline underline-offset-4 p-1 text-sm flex items-center"
        rel="noreferrer"
      >
        :help
      </a>
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
