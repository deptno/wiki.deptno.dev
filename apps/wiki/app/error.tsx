'use client'

import { ENDPOINT } from "../constant"

export default function Error(props: Props) {
  const { error } = props
  const goRoot = () => {
    location.href = '/'
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8" onClick={goRoot}>
      <h1 className="text-8xl text-center">{error.message}</h1>
      <div>{ENDPOINT}로 이동</div>
    </div>
  )
}

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}
