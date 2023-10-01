import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: Params) {
  console.debug({ file, params })
  request.json()
    .then((payload) => {
      console.debug('json', payload)

      if (payload.ref === 'refs/heads/main') {
        restartToUpdate()
      }
    })

  return NextResponse.json({ message: 'ok' }, { status: 200 })
}

type Params = {
  params: {
    id: string
    method: string
  }
}
const file = '/webhook/github/POST'
const restartToUpdate = () => {
  console.info('restart to update')
  process.exit(0)
}
