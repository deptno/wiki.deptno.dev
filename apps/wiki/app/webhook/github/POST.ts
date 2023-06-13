import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: Params) {
  console.debug({ file, params })
  console.debug('method', request.method)
  console.debug('json', await request.json())

  return NextResponse.json({ message: 'ok' }, { status: 200 })
}

type Params = {
  params: {
    id: string
    method: string
  }
}
type Body = {
  content: string
}
const file = '/webhook/github/POST'
