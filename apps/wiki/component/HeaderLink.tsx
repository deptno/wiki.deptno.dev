import { FC, ReactNode } from 'react'

export const HeaderLink: FC<Props> = (props: Props) => {
  const { href, children } = props

  return (
    <div>
      <a
        target='_blank'
        href={href}
        className="text-white underline underline-offset-4 p-2 text-sm"
        rel="noreferrer"
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
