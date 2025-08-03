import React, { FC, ReactNode } from 'react'
import { MermaidRenderer } from './MermaidRenderer'
import { AnchorHighlighter } from './AnchorHighlighter'

export const Markdown: FC<Props> = (props) => {
  const { data, children } = props

  return (
    <div className="w-full overflow-x-hidden pb-4">
      <MermaidRenderer />
      <AnchorHighlighter />
      {children}
      <pre
        className="bg-gray-100 markdown p-2 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  )
}

type Props = {
  data: string
  children?: ReactNode
}
