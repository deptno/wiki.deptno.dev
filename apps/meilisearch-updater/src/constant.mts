import { readFileSync } from 'node:fs'

export const CONFIG = JSON.parse(readFileSync('wiki.config.json', 'utf8'))
export const INDEX = 'wiki'
export const DIR_WIKI_ROOT = process.env.DIR_WIKI_ROOT
export const DIR_WIKI = process.env.DIR_WIKI
export const NEXT_PUBLIC_MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
export const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY
