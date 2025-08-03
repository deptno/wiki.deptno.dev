import { readFileSync } from 'node:fs'

export const CONFIG = JSON.parse(readFileSync('../../wiki.config.json', 'utf8'))
export const DIR_DATA = process.env.DIR_DATA
export const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST
export const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY
