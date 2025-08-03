import { join } from 'path'
import { basename, dirname } from 'node:path'

/**
 * 그래프에서 백링크(incoming)의 경우 태그가 붙은 형태로 참조될 수 있다
 * 그래프에서는 해당 태그로 인해서 source 식별이 어려움으로 #anchor 를 제거하여 source를 통일시킨다
 */
export function cutAnchor(t: string): string {
  return join(dirname(t), basename(t).split('#')[0])
}

