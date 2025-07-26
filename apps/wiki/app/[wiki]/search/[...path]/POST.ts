import { NextResponse } from 'next/server'
import { NEXT_PUBLIC_MEILISEARCH_API_KEY, NEXT_PUBLIC_MEILISEARCH_HOST } from '../../../../constant'

export async function POST(req: Request, context: Context) {
  const params = await context.params
  const { path } = params

  try {
    const api = `${NEXT_PUBLIC_MEILISEARCH_HOST}/${path.join('/')}`
    const body = await req.json()
    const headers = NEXT_PUBLIC_MEILISEARCH_API_KEY
      ? {
        ...req.headers,
        authorization: `Bearer ${NEXT_PUBLIC_MEILISEARCH_API_KEY}`
      }
      : req.headers

    const response = await fetch(api, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    return new Response(response.body, {
      status: response.status
    })
  } catch (err) {
    console.error({ file, err })
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

type Context = {
  params: Promise<{ path: string[] }>
}

const file = import.meta.url
