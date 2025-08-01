export function getFinalChanges(commits: Commit[]): R {
  // 파일의 상태를 기록할 맵: { 파일명: 'added' | 'modified' | 'removed' }
  const fileState = new Map<string, 'added' | 'modified' | 'removed'>()

  // 커밋을 순서대로(과거 → 최신) 처리
  for (const commit of commits) {
    for (const f of commit.added ?? []) {
      fileState.set(f, 'added')
    }
    for (const f of commit.modified ?? []) {
      // 이전 상태가 'added'가 아니면 'modified'로 갱신
      if (fileState.get(f) !== 'added') fileState.set(f, 'modified')
    }
    for (const f of commit.removed ?? []) {
      fileState.set(f, 'removed')
    }
  }

  // 결과 분류
  const added: string[] = []
  const modified: string[] = []
  const removed: string[] = []

  fileState.forEach((status, file) => {
    if (status === 'added') {
      added.push(file)
    }
    else if (status === 'modified') {
      modified.push(file)
    }
    else if (status === 'removed') {
      removed.push(file)
    }
  })

  return { added, modified, removed }
}

export type Commit = {
  id: string
  tree_id: string
  distinct: boolean
  message: string
  timestamp: string
  url: string
  author: { name: string, email: string, username: string }
  committer: { name: string, email: string, username: string }
  added: string[]
  removed: string[]
  modified: string[]
}

type R = {
  added: string[]
  modified: string[]
  removed: string[]
}
