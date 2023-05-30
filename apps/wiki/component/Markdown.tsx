import React, { FC } from 'react'

export const Markdown: FC<Props> = (props) => {
  return (
    <div className="w-full overflow-x-hidden">
      <aside className="2xl:hidden bg-gray-100 p-2">
        <div className="border border-gray-800 p-2 break-words">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dicta, earum excepturi iure maiores quibusdam repellat vitae. Accusamus dolorem earum eos, id minus mollitia nisi omnis repellendus sed vel voluptates?
        </div>
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
