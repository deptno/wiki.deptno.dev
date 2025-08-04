import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function createNumberHandler (params: Params) {
  const { router, key } = params

  return (e: KeyboardEvent) => {
    const element = document.querySelector<HTMLAnchorElement>(`a[data-search-result="${key}"]`)
    if (element) {
      router.push(element.href)
      e.preventDefault()
    }
  }
}

type Params = {
  router: AppRouterInstance
  key: string
}
