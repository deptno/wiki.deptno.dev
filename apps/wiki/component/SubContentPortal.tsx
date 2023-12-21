'use client'
import { FC, ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const SubContentPortal: FC<Props> = (props) => {
  const [sidebar, setSidebar] = useState<Element>()

  useLayoutEffect(() => {
    setSidebar(document.querySelector('#search-result'))
  }, [])

  if (sidebar) {
    return createPortal(props.children, sidebar)
  }
  return null
}

type Props = {
  children?: ReactNode
}
