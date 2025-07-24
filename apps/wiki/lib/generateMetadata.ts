import { Metadata } from 'next'
import { ENDPOINT } from '../constant'
import { getMarkdown } from './getMarkdown'
import { getPath } from './getPath'
import { prodCache } from './prodCache'
import { isPublicWiki } from './isPublicWiki'

export const getMarkdownMetadata = prodCache(
  async (paths: string[]): Promise<Metadata> => {
    const { wiki, path } = getPath(paths)
    const url = `${ENDPOINT}/${path}`

    if (!isPublicWiki(wiki)) {
      return
    }

    try {
      const [first, ...lines] = await getMarkdown(path).then(md =>
        md.split('\n'),
      )
      const title = first.replace(/^#*%s/g, '')
      const description = lines.join('\n')

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url,
        },
      }
    } catch (e) {
      console.warn({ file }, `warn: [${e.code}] ${e.message}`)

      return {
        openGraph: {
          url,
        },
      }
    }
  },
)

const file = import.meta.url
