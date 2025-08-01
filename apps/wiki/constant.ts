import config from './wiki.config.json'

export const CONFIG = config as Wiki[]
export const IS_PROD = process.env.NODE_ENV === 'production'
export const DIR_DATA = process.env.DIR_DATA
export const NEXT_PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
export const GIT_BRANCH = process.env.NEXT_PUBLIC_GIT_BRANCH ?? 'main'
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
export const MS_CLARITY_ID = process.env.NEXT_PUBLIC_MS_CLARITY_ID
export const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST
export const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY
export const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET
export const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY
export const URL_ME = process.env.URL_ME
export const CURRENT_REVISION = '.CURRENT_REVISION'
