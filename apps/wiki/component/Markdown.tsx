import React, { FC } from 'react'
import { URL_WIKI } from '../constant'
import { TOC } from '../lib/TOC'
import { LinkGraph } from './LinkGraph'

export const Markdown: FC<Props> = (props) => {
  const { data, path = '' } = props

  return (
    <div className="w-full overflow-x-hidden">
      <div className="p-2">
        <aside id="sidebar" className="px-2 break-words border border-gray-800 3xl:text-md 3xl:border-hidden">
          {!path.includes('/') && <div className="flex justify-end gap-2 border-b-2">
            <a className="underline border-l-blue-400" href={`${URL_WIKI}/${path}/_edit`} target="_blank">수정</a>
            <a className="underline border-l-blue-800" href={`${URL_WIKI}/${path}/_history`} target="_blank">기록</a>
          </div>}
          <TOC html={data}/>
          <LinkGraph path={path}/>
        </aside>
      </div>
      <pre
        className="bg-gray-100 markdown p-2 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  )
}

type Props = {
  data: string
  path?: string
}
