'use client'

import { ENDPOINT } from "../constant"

export default function Error(props: Props) {
  const { error } = props
  const goRoot = () => {
    location.href = '/'
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <a onClick={goRoot}>{error.message}, {ENDPOINT}로 이동</a>
    </div>
  )
}

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}
