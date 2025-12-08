import React from 'react'
import { notFound } from 'next/navigation'
import { fileURLToPath } from 'url'
import { Markdown } from '../../../../../component/Markdown'
import { selectDynamicMarkdown } from '../../../../../db/selectDynamicMarkdown'
import { CONFIG, DYNAMIC_MARKDOWN_TABLES } from '../../../../../constant'
import { getMarked } from '../../../../../lib/getMarked'
import { selectGmailSummaryDetail } from '../../../../../db/selectGmailSummaryDetail'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function Page(props: Props) {
  const params = await props.params

  console.debug({ file, params })

  const source = DYNAMIC_MARKDOWN_TABLES.find(entry =>
    entry.db === params.db &&
    entry.table === params.table,
  )

  if (!source) {
    return notFound()
  }

  const wiki = source.wiki ?? CONFIG[0]?.dir

  if (!wiki) {
    console.error({ file, params }, 'CONFIG에 wiki가 없습니다')

    return notFound()
  }

    if (source.table === 'gmail_summary') {
    const NavRow = (props: { label: string, item: NavItem }) => {
      const { label, item } = props

      if (!item) {
        return (
          <div className="flex gap-2">
            <span className="w-24 text-gray-500">{label}</span>
            <span className="text-gray-400 font-mono">없음</span>
          </div>
        )
      }

      return (
        <div className="flex gap-2">
          <span className="w-24 text-gray-500">{label}</span>
          <a className="underline font-mono" href={item.href}>{item.label}</a>
        </div>
      )
    }

    const detail = await selectGmailSummaryDetail({ id: params.id })

    if (!detail) {
      return notFound()
    }

    const { parse } = getMarked({ wiki })
    const html = parse(detail.markdown)

    return (
      <main className="grow w-full max-w-screen-lg lg:border border-gray-800 h-full flex flex-col">
        <div className="p-4 space-y-2 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <p className="font-bold text-lg">Gmail 요약</p>
            <span className="text-sm text-gray-600 font-mono">{detail.meta.label}</span>
            <a
              className="text-sm underline font-mono"
              href={`https://mail.google.com/mail/u/0/#all/${detail.meta.threadId}`}
              target="_blank"
              rel="noreferrer"
            >
              Gmail에서 보기 ↗️
            </a>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <NavRow label="이전 스레드" item={detail.prevThread}/>
            <NavRow label="다음 스레드" item={detail.nextThread}/>
            <NavRow label="쓰레드 처음" item={detail.threadStart}/>
            <NavRow label="쓰레드 끝" item={detail.threadEnd}/>
            <NavRow label="이전 요약" item={detail.prevSummary}/>
            <NavRow label="다음 요약" item={detail.nextSummary}/>
          </div>
        </div>
        <div className="grow">
          <Markdown data={html}/>
        </div>
      </main>
    )
  }

  const markdown = await selectDynamicMarkdown({
    schema: source.schema,
    table: source.table,
    idColumn: source.idColumn,
    markdownColumn: source.markdownColumn,
    idValue: params.id,
  })

  if (!markdown) {
    return notFound()
  }

  const { parse } = getMarked({ wiki })
  const html = parse(markdown)

  return (
    <main className="grow w-full max-w-screen-lg lg:border border-gray-800 h-full flex flex-col">
      <div className="grow">
        <Markdown data={html}/>
      </div>
    </main>
  )
}

type Props = {
  params: Promise<{
    db: string
    table: string
    id: string
  }>
}

type NavItem = {
  href: string
  label: string
} | null

type Meta = {
  label: string
  threadId: string
}

const file = fileURLToPath(import.meta.url)
