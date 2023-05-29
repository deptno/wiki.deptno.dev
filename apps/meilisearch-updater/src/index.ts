import { getMarkdownFiles } from './getMarkdownFiles.mjs'
import { MeiliSearch } from 'meilisearch'

try {
  const contents = await getMarkdownFiles(process.env.DIR_WIKI)

  const ms = new MeiliSearch({ host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST })
  await ms
    .createIndex('wiki', { primaryKey: 'id' })
    .then((task) => console.info({ task }, 'createIndex'))
  await ms
    .index('wiki')
    .addDocuments(contents)
    .then((task) => {
      console.info({ task })
      console.info('addDocuments')
    })
} catch (err) {
  console.error({ err })
}
