import React, { FC } from 'react'

export const Markdown: FC<Props> = (props) => {
  return (
    <div className="w-full overflow-x-hidden">
      <pre
        className="bg-gray-100 markdown p-2 md:p-4 lg:p-8 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: props.data }}
      />
    </div>
  )
}

type Props = {
  data: string
}
