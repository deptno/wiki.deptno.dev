'use client'

import { FC } from "react"

export const GoBack: FC<Props> = (props) => {
  return <a className="underline underline-offset-4" href="#" onClick={goBack}>뒤로가기</a>
}

type Props = {}

const goBack = () => history.back()
