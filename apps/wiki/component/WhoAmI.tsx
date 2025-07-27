import { FC } from 'react'
import { URL_ME } from '../constant'
import Link from 'next/link'

export const WhoAmI: FC<Props> = () => {
  if (URL_ME) {
    return <Link className="underline underline-offset-4 p-1 text-sm" href={URL_ME}>whoami</Link>
  }
  return null
}

type Props = {}
