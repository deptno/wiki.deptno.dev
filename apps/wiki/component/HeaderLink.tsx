import { FC, ReactNode } from "react"

export const HeaderLink: FC<Props> = (props: Props) => {
  const { href, children } = props

  return (
    <div>
      <a
        target='_blank'
        href={href}
        className="bg-white text-black"
      >
        {children}
      </a>
    </div>
  )
}

type Props = {
  href: string
  children?: ReactNode
}
