import { FC } from "react"
import { URL_ME } from "../constant"

export const MeHeaderLink: FC<Props> = () => {
  if (URL_ME) {
    return <a className="underline underline-offset-4" href={URL_ME}>about-me</a>
  }
  return null
}

type Props = {
}
