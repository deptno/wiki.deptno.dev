import { FC } from 'react'
import { getRevision } from '../lib/getRevision'
import { CONFIG } from '../constant'

export const GitRevision: FC<Props> = (props) => {
  const wiki = CONFIG.find(w => w.dir === props.wiki)

  if (wiki) {
    const revision = getRevision(wiki.dir)

    if (revision) {
      return (
        <a
          target="_blank"
          href={`${wiki.url}/tree/${revision}`}
          className="text-white underline underline-offset-4 p-1 text-sm"
          rel="noreferrer"
        >
          git:{wiki.dir}@{revision.slice(0, 7)}
        </a>
      )
    }
  }

  return null
}

type Props = {
  wiki?: string
}
