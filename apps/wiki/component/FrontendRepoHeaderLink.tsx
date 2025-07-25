import { FC } from "react"
import { HeaderLink } from "./HeaderLink"

export const FrontendRepoHeaderLink: FC<Props> = () => {
  return (
    <HeaderLink href="https://github.com/deptno/wiki.deptno.dev">
      FE
    </HeaderLink>
  )
}

type Props = {
}
