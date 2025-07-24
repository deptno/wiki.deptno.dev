import { Metadata } from 'next'
import { ENDPOINT } from '../constant'
import { getMarkdown } from './getMarkdown'
import { getPath } from './getPath'
import { prodCache } from './prodCache'

export const getMarkdownMetadata = prodCache(
  async (paths: string[]): Promise<Metadata> => {
    const result = getPath(paths)
    if (!result) {
      console.log({ file, paths }, 'no-result')
      return
    }

    const { path } = result
    const url = `${ENDPOINT}/${path}`

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
