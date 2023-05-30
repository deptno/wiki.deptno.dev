import React, { FC } from 'react'

export const Markdown: FC<Props> = (props) => {
  return (
    <div className="w-full overflow-x-hidden">
      <aside id="sidebar" className="p-2 break-words">
      </aside>
      <pre
        className="bg-gray-100 markdown p-2 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: props.data }}
      />
    </div>
  )
}

type Props = {
  data: string
}
