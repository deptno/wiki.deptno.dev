import { FC } from 'react'
import { getRevision } from '../lib/getRevision'
import { CONFIG } from '../constant'
import { HeaderLink } from './HeaderLink'

export const GitRevision: FC<Props> = (props) => {
  const wiki = CONFIG.find(w => w.dir === props.wiki)

  if (wiki) {
    const revision = getRevision(wiki.dir)

    if (revision) {
      return (
        <HeaderLink href={`${wiki.url}/tree/${revision}`}>
          {revision.slice(0, 7)}
        </HeaderLink>
      )
    }
  }

  return null
}

type Props = {
  wiki?: string
}
