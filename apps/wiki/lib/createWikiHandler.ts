import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { CONFIG } from '../constant'

export function createWikiHandler (params: Params) {
  const { router, key } = params
  const n = Number(key) - 1

  return (e: KeyboardEvent) => {
    const config = CONFIG[n]

    if (config) {
      router.push(`/${config.dir}`)
    }
  }
}

type Params = {
  router: AppRouterInstance
  key: string
}
