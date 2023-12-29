'use client'
import React, { ReactElement } from 'react'

export function Back(props: Props) {
  const back = () => {
    history.back()
  }

  return (
    <a className="cursor-pointer underline underline-offset-4" onClick={back}>
      {props.children}
    </a>
  )
}

type Props = {
  children?: ReactElement|string
}
