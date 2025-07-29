import { MeiliSearch } from 'meilisearch'
import { getMarkdownFiles } from './getMarkdownFiles.mjs'
import { CONFIG, DIR_DATA, MEILI_MASTER_KEY, MEILISEARCH_HOST } from './constant.mjs'
import { join } from 'node:path'

try {
  for (const w of CONFIG) {
    const contents = await getMarkdownFiles(join(DIR_DATA, w.dir))
    const ms = new MeiliSearch({
      host: MEILISEARCH_HOST,
      apiKey: MEILI_MASTER_KEY,
    })

    await ms.deleteIndexIfExists(w.dir)
      .then((task) => console.info({ task }, 'deleteIndexIfExists'))
    await ms
      .createIndex(w.dir, { primaryKey: 'id' })
      .then((task) => console.info({ task }, 'createIndex'))
    await ms
      .index(w.dir)
      .addDocuments(contents)
      .then((task) => {
        console.info({ task })
        console.info('addDocuments')
      })
  }
} catch (err) {
  console.error({ err })
}
