import { FC } from "react"
import { getRevision } from "../lib/getRevision"
import { URL_WIKI } from "../constant"

export const GitRevision: FC<Props> = () => {
  const revision = getRevision()

  if (revision) {
    return (
      <div>
        <a
          target='_blank'
          href={`${URL_WIKI}/tree/${revision}`}
          className="bg-white text-black mr-4"
        >
          {revision.slice(0, 7)}
        </a>
      </div>
    )
  }

  return null
}

type Props = {
}
