import { MeiliSearch } from 'meilisearch'
import { getMarkdownFiles } from './getMarkdownFiles.mjs'
import { INDEX } from './constant.mjs'

try {
  const contents = await getMarkdownFiles(process.env.DIR_WIKI)
  const ms = new MeiliSearch({ host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST })
  await ms.deleteIndexIfExists(INDEX)
    .then((task) => console.info({ task }, 'deleteIndexIfExists'))
  await ms
    .createIndex(INDEX, { primaryKey: 'id' })
    .then((task) => console.info({ task }, 'createIndex'))
  await ms
    .index(INDEX)
    .addDocuments(contents)
    .then((task) => {
      console.info({ task })
      console.info('addDocuments')
    })
} catch (err) {
  console.error({ err })
}
