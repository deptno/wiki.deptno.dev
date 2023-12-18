import { redirect } from "next/navigation"

export default async (props: Props) => {
  const { wiki } = props.params

  return redirect(decodeURIComponent(`/${wiki}/index`))
}

type Props = {
  params: {
    wiki: string
  }
}
