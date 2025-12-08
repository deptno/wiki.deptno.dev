import { fileURLToPath } from 'url'
import { getPool } from './getPool'

export async function selectGmailSummaryDetail(params: Params) {
  console.debug({ file, params })

  const pool = getPool()
  const client = await pool.connect()

  let threadTotalMax = '0'
  const threadIndexMap = new Map<string, number>()
  const threadSummaryCache = new Map<string, ThreadSummaryRow[]>()
  const buildThreadSelect = (columns: Set<string>) => {
    const base: string[] = []

    if (columns.has('id')) {
      base.push('id')
    }
    if (columns.has('prev_id')) {
      base.push('prev_id')
    }
    if (columns.has('next_id')) {
      base.push('next_id')
    }
    if (columns.has('date')) {
      base.push('date')
    }
    if (columns.has('created_at')) {
      base.push('created_at')
    }

    if (!base.length) {
      return null
    }

    return base.map(col => `"${col}"`).join(', ')
  }
  const buildSummaryLabel = (summary: SummaryRef, index: number | string, type: LabelType, totalMax: string) => {
    const dateValue = summary.created_at
      ? new Date(summary.created_at).toISOString().slice(0, 10)
      : summary.id

    return `${dateValue}#${index}${type}${totalMax}:${summary.id}`
  }
  const loadThreadColumns = async () => {
    return client.query<{ column_name: string }>(
      'select column_name from information_schema.columns where table_schema = $1 and table_name = $2',
      ['public', 'gmail_thread'],
    ).then(r => new Set(r.rows.map(row => row.column_name)))
  }
  const loadThreadRow = async (id: string, select: string | null) => {
    if (!select) {
      return null
    }

    return client.query<ThreadRow>(
      `select ${select} from public.gmail_thread where id = $1 limit 1`,
      [id],
    ).then(r => r.rows.at(0))
  }
  const loadThreadSummaries = async (threadId: string) => {
    if (threadSummaryCache.has(threadId)) {
      return threadSummaryCache.get(threadId)!
    }

    const rows = await client.query<ThreadSummaryRow>(
      'select id, thread_id, created_at from public.gmail_summary where thread_id = $1 order by created_at asc nulls first, id asc',
      [threadId],
    ).then(r => r.rows)

    threadSummaryCache.set(threadId, rows)

    return rows
  }
  const buildSummaryNav = (summary: SummaryRef, index: number, totalMax: string) => {
    return {
      href: `/dynamic/n8n/gmail_summary/${summary.id}`,
      label: buildSummaryLabel(summary, index, 'S', totalMax),
    }
  }
  const findSummaryIndex = async (summary: SummaryRef) => {
    const summaries = await loadThreadSummaries(summary.thread_id)
    const index = summaries.findIndex(candidate => candidate.id === summary.id)

    return {
      index,
      summaries,
    }
  }
  const loadThreadAnchor = async (threadId: string, position: 'start' | 'end') => {
    const summaries = await loadThreadSummaries(threadId)
    if (!summaries.length) {
      return null
    }

    const target = position === 'start'
      ? summaries.at(0)!
      : summaries.at(-1)!
    const index = position === 'start' ? 0 : summaries.length - 1

    return {
      summary: target,
      index,
    }
  }
  const loadThreadAnchorWithMeta = async (threadId: string, position: 'start' | 'end', select: string | null) => {
    const anchor = await loadThreadAnchor(threadId, position)

    if (!anchor) {
      return null
    }

    const thread = await loadThreadRow(threadId, select)

    return {
      ...anchor,
      date: thread?.date ?? thread?.created_at ?? anchor.summary.created_at,
    }
  }
  const loadAdjacentThreadByCreatedAt = async (direction: 'prev' | 'next', pivot: string, excludeThreads: Set<string>) => {
    const operator = direction === 'prev' ? '<' : '>'
    const order = direction === 'prev' ? 'desc' : 'asc'
    const excluded = Array.from(excludeThreads)
    const excludeClause = excluded.length
      ? ` and thread_id <> ${excluded.map((_, index) => `$${index + 2}`).join(' and thread_id <> ')}`
      : ''
    const row = await client.query<{ thread_id: string }>(
      `select thread_id from public.gmail_summary where created_at ${operator} $1${excludeClause} order by created_at ${order} limit 1`,
      [pivot, ...excluded],
    ).then(r => r.rows.at(0))

    if (!row) {
      return null
    }

    return row.thread_id
  }

  try {
    const threadOrderRows = await client.query<{ thread_id: string, first_created: string | null, first_id: string }>(
      'select thread_id, min(created_at) as first_created, min(id) as first_id from public.gmail_summary group by thread_id order by min(created_at) asc nulls last, min(id) asc',
    ).then(r => r.rows)
    threadOrderRows.forEach((row, index) => {
      threadIndexMap.set(row.thread_id, index)
    })
    threadTotalMax = threadOrderRows.length
      ? `${threadOrderRows.length - 1}`
      : '0'

    const summaryResult = await client.query<SummaryRow>(
      'select id, thread_id, text, prev_id, created_at from public.gmail_summary where id = $1 limit 1',
      [params.id],
    )
    const summary = summaryResult.rows.at(0)

    if (!summary) {
      return null
    }

    const prevSummary = summary.prev_id
      ? await client.query<SummaryRow>(
        'select id, thread_id, created_at from public.gmail_summary where id = $1 limit 1',
        [summary.prev_id],
      ).then(r => r.rows.at(0))
      : null

    const nextSummary = await client.query<SummaryRow>(
      'select id, thread_id, created_at from public.gmail_summary where prev_id = $1 order by created_at asc limit 1',
      [summary.id],
    ).then(r => r.rows.at(0))

    const threadColumns = await loadThreadColumns()
    const threadSelect = buildThreadSelect(threadColumns)
    const thread = await loadThreadRow(summary.thread_id, threadSelect)
    const threadSummaries = await loadThreadSummaries(summary.thread_id)
    const currentIndex = threadSummaries.findIndex(candidate => candidate.id === summary.id)
    const threadSummaryTotal = `${Math.max(threadSummaries.length - 1, 0)}`

    const threadStart = await loadThreadAnchor(summary.thread_id, 'start')
    const threadEnd = await loadThreadAnchor(summary.thread_id, 'end')

    const pickThreadNav = async (threadId: string | null, usedThreadIds: Set<string>) => {
      if (!threadId || usedThreadIds.has(threadId)) {
        return null
      }

      const anchor = await loadThreadAnchorWithMeta(threadId, 'start', threadSelect)

      if (!anchor) {
        return null
      }

      const threadIndex = threadIndexMap.get(threadId ?? anchor.summary.thread_id)
      const indexValue = threadIndex !== undefined
        ? threadIndex
        : '?'

      usedThreadIds.add(threadId)

      return {
        href: `/dynamic/n8n/gmail_summary/${anchor.summary.id}`,
        label: buildSummaryLabel(
          {
            ...anchor.summary,
            created_at: anchor.date ?? anchor.summary.created_at,
          },
          indexValue,
          'T',
          threadTotalMax,
        ),
      }
    }

    const usedThreads = new Set<string>([summary.thread_id])

    let prevThreadNav = await pickThreadNav(thread?.prev_id ?? null, usedThreads)
    if (!prevThreadNav && prevSummary?.thread_id) {
      prevThreadNav = await pickThreadNav(prevSummary.thread_id, usedThreads)
    }
    if (!prevThreadNav && summary.created_at) {
      const threadId = await loadAdjacentThreadByCreatedAt('prev', summary.created_at, usedThreads)
      prevThreadNav = await pickThreadNav(threadId, usedThreads)
    }

    let nextThreadNav = await pickThreadNav(thread?.next_id ?? null, usedThreads)
    if (!nextThreadNav && nextSummary?.thread_id) {
      nextThreadNav = await pickThreadNav(nextSummary.thread_id, usedThreads)
    }
    if (!nextThreadNav && summary.created_at) {
      const threadId = await loadAdjacentThreadByCreatedAt('next', summary.created_at, usedThreads)
      nextThreadNav = await pickThreadNav(threadId, usedThreads)
    }

    const prevSummaryIndex = prevSummary
      ? await findSummaryIndex(prevSummary)
      : null
    const nextSummaryIndex = nextSummary
      ? await findSummaryIndex(nextSummary)
      : null

    const prevSummaryNav = prevSummary && prevSummaryIndex?.index !== -1
      ? buildSummaryNav(
        prevSummary,
        prevSummaryIndex.index,
        `${Math.max(prevSummaryIndex.summaries.length - 1, 0)}`,
      )
      : null
    const nextSummaryNav = nextSummary && nextSummaryIndex?.index !== -1
      ? buildSummaryNav(
        nextSummary,
        nextSummaryIndex.index,
        `${Math.max(nextSummaryIndex.summaries.length - 1, 0)}`,
      )
      : null
    const prevInThreadNav = currentIndex > 0
      ? buildSummaryNav(
        threadSummaries[currentIndex - 1],
        currentIndex - 1,
        threadSummaryTotal,
      )
      : null
    const nextInThreadNav = currentIndex !== -1 && currentIndex < threadSummaries.length - 1
      ? buildSummaryNav(
        threadSummaries[currentIndex + 1],
        currentIndex + 1,
        threadSummaryTotal,
      )
      : null
    const threadStartNav = threadStart
      ? {
        href: `/dynamic/n8n/gmail_summary/${threadStart.summary.id}`,
        label: buildSummaryLabel(threadStart.summary, 0, 'S', threadSummaryTotal),
      }
      : null
    const threadEndNav = threadEnd && threadEnd.summary.id !== threadStart?.summary.id
      ? {
        href: `/dynamic/n8n/gmail_summary/${threadEnd.summary.id}`,
        label: buildSummaryLabel(
          threadEnd.summary,
          threadSummaries.length - 1,
          'S',
          threadSummaryTotal,
        ),
      }
      : null
    const metaIndex = currentIndex === -1 ? '?' : `${currentIndex}`
    const metaThreadIndex = threadIndexMap.get(summary.thread_id) ?? '?'
    const metaDate = summary.created_at
      ? new Date(summary.created_at).toISOString().slice(0, 10)
      : summary.id

    return {
      markdown: summary.text,
      prevSummary: prevSummaryNav ?? prevInThreadNav,
      nextSummary: nextSummaryNav ?? nextInThreadNav,
      prevThread: prevThreadNav,
      nextThread: nextThreadNav,
      threadStart: threadStartNav,
      threadEnd: threadEndNav,
      meta: {
        label: `${metaDate}#${metaIndex}S${threadSummaryTotal}#${metaThreadIndex}T${threadTotalMax}:${summary.id}`,
        threadId: summary.thread_id,
      },
    }
  } finally {
    client.release()
  }
}

type Params = {
  id: string
}

type SummaryRow = {
  id: string
  thread_id: string
  text: string
  prev_id: string | null
  created_at: string | null
}

type SummaryRef = {
  id: string
  thread_id: string
  created_at: string | null
}

type ThreadSummaryRow = {
  id: string
  thread_id: string
  created_at: string | null
}

type ThreadRow = {
  id: string
  prev_id?: string | null
  next_id?: string | null
  date?: string | null
  created_at?: string | null
}

type LabelType = 'T' | 'S'

const file = fileURLToPath(import.meta.url)
