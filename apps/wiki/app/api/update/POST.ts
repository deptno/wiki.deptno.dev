import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { CONFIG, GITHUB_WEBHOOK_SECRET } from '../../../constant'
import { revalidatePath } from 'next/cache'
import { $ } from 'zx'
import { updateMeilisearchDocuments } from '../../../lib/updateMeilisearchDocuments'

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

    await $`git -C /mnt/data/${config.dir} pull --ff`

    revalidatePath('/[wiki]', 'layout')
    console.log('revalidated path: /[wiki]')

    if (payload.commits) {
      updateMeilisearchDocuments({ index: config.dir, commits: payload.commits }).catch(err => {
        console.error({ file, err })
      })
    }

    return new Response(undefined, { status: 200 })
  } catch (err) {
    console.error('webhook error', err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

const file = import.meta.url
