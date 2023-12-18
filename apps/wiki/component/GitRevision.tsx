import { FC } from 'react'
import { getRevision } from '../lib/getRevision'
import { URL_WIKI } from '../constant'
import { HeaderLink } from './HeaderLink'

export const GitRevision: FC<Props> = () => {
  const revision = getRevision()

  if (revision) {
    return (
      <HeaderLink href={`${URL_WIKI}/tree/${revision}`}>
        {revision.slice(0, 7)}
      </HeaderLink>
    )
  }

  return null
}

type Props = {}
