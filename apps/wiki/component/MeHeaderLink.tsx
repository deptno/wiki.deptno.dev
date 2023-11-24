import { FC } from "react"
import { URL_ME } from "../constant"

export const MeHeaderLink: FC<Props> = () => {
  if (URL_ME) {
    return <a href={URL_ME}>me?</a>
  }
  return null
}

type Props = {
}
