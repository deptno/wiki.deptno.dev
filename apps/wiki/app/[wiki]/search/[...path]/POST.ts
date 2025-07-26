import { NextResponse } from 'next/server'
import { MEILISEARCH_API_KEY, MEILISEARCH_HOST } from '../../../../constant'

export async function POST(req: Request, context: Context) {
  const params = await context.params
  const { path } = params

  try {
    const api = `${MEILISEARCH_HOST}/${path.join('/')}`
    const headers = new Headers(req.headers)
    if (MEILISEARCH_API_KEY) {
      headers.set('authorization', `Bearer ${MEILISEARCH_API_KEY}`)
    }

    const response = await fetch(api, {
      headers,
      method: 'POST',
      body: await req.text()
    })

    return new Response(response.body, {
      status: response.status,
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
