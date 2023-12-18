import { Metadata } from "next"
import { ENDPOINT } from "../constant"
import { getMarkdown } from "./getMarkdown"
import { getPath } from "./getPath"

export async function getMarkdownMetadata(props: Props): Promise<Metadata> {
  const result = getPath(props)
  if (!result) {
    return
  }

  const { path } = result
  try {
    const [first, ...lines] = await getMarkdown(path).then(md => md.split('\n'))
    const title = first.replace(/^#*%s/g, '')
    const description = lines.join('\n')

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${ENDPOINT}/${path}`,
      },
    }
  } catch (e) {
    console.warn(`warn: [${e.code}] ${e.message}`)

    return {
      openGraph: {
        url: `${ENDPOINT}/${path}`,
      },
    }
  }
}

type Props = {
  params: {
    wiki: string
    md: string[]
  }
}
