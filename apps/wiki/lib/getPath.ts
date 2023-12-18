import { isPublicWiki } from "./isPublicWiki"
import { prodCache } from "./prodCache"

export const getPath = prodCache((props: Props) => {
  if (!isPublicWiki(props.params.wiki)) {
    return
  }

  const md = props.params.md.map(decodeURIComponent)
  const paths = [props.params.wiki, ...md]
  const path = paths.join('/')
  const currentPath = md.slice(0, -1).join('/')

  return {
    path,
    currentPath,
    wiki: props.params.wiki,
  }
})

type Props = {
  params: {
    wiki: string
    md: string[]
  }
}
