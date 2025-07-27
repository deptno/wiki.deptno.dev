import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { CONFIG, GITHUB_WEBHOOK_SECRET } from '../../../constant'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const secret = GITHUB_WEBHOOK_SECRET
    if (!secret) {
      throw new Error('secret must be provided')
    }

    const text = await req.text()
    const signature = req.headers.get('x-hub-signature-256')
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(text)
    const digest = 'sha256=' + hmac.digest('hex')
    if (signature !== digest) {
      return new Response('Invalid signature', { status: 401 })
    }

    const payload = JSON.parse(text)
    const repoFullName = payload.repository?.full_name
    const config = CONFIG.find(t => t.url.endsWith(repoFullName))
    if (!config) {
      throw new Error(`unknown repo: ${repoFullName}`)
    }

    revalidatePath(config.dir, 'layout')
    console.info(`revalidated path: ${config.dir}`)

    return new Response(undefined, { status: 200 })
  } catch (err) {
    console.error('webhook error', err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
