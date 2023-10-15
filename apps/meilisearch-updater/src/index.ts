import { MeiliSearch } from 'meilisearch'
import { getMarkdownFiles } from './getMarkdownFiles.mjs'
import { DIR_WIKI, INDEX, NEXT_PUBLIC_MEILISEARCH_HOST } from './constant.mjs'

try {
  const contents = await getMarkdownFiles(DIR_WIKI)
  const ms = new MeiliSearch({ host: NEXT_PUBLIC_MEILISEARCH_HOST })
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
