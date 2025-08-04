'use client'

import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { usePathname, useRouter } from 'next/navigation'
import { createNumberHandler } from '../lib/createNumberHandler'
import { OverlayTutorial } from './OverlayTutorial'
import { NEXT_PUBLIC_GIT_COMMIT } from '../constant'
import { createWikiHandler } from '../lib/createWikiHandler'

export function HotKey(props) {
  const router = useRouter()
  const pathname = usePathname()

  // 도움말
  useHotkeys('f1', () => {
    window.open(`https://github.com/deptno/wiki.deptno.dev/blob/${NEXT_PUBLIC_GIT_COMMIT}/apps/wiki/component/HotKey.tsx`)
  })
  // 위키 목록
  useHotkeys('w', () => {
    router.push('/')
  })
  // 위키간 이동
  useHotkeys('shift+1', createWikiHandler({ router, key: '1' }))
  useHotkeys('shift+2', createWikiHandler({ router, key: '2' }))
  useHotkeys('shift+3', createWikiHandler({ router, key: '3' }))
  useHotkeys('shift+4', createWikiHandler({ router, key: '4' }))
  // 다이어리로 이동
  useHotkeys('d', () => {
    const href = document.querySelector<HTMLAnchorElement>('#diary')?.href
    if (href) {
      router.push(href)
    }
  })
  // 상위 페이지
  useHotkeys('backspace', () => {
    const index = pathname.endsWith('/index')
      ? -2
      : -1
    const path = pathname.split('/').slice(0, index).join('/') || '/'

    router.push(path)
  })
  // 검색에 포커스
  useHotkeys('meta+k', () => {
    document.querySelector<HTMLInputElement>('input[type=search]')?.focus()
  })
  // 검색 결과 선택
  useHotkeys('1', createNumberHandler({ router, key: '1' }))
  useHotkeys('2', createNumberHandler({ router, key: '2' }))
  useHotkeys('3', createNumberHandler({ router, key: '3' }))
  useHotkeys('4', createNumberHandler({ router, key: '4' }))
  useHotkeys('5', createNumberHandler({ router, key: '5' }))
  useHotkeys('6', createNumberHandler({ router, key: '6' }))
  useHotkeys('7', createNumberHandler({ router, key: '7' }))
  useHotkeys('8', createNumberHandler({ router, key: '8' }))
  useHotkeys('9', createNumberHandler({ router, key: '9' }))
  // 다이어리 전용
  useHotkeys('h', () => {
    const href = document.querySelector<HTMLAnchorElement>('#prev-date')?.href
    if (href) {
      router.push(href)
    }
  })
  useHotkeys('l', () => {
    const href = document.querySelector<HTMLAnchorElement>('#next-date')?.href
    if (href) {
      router.push(href)
    }
  })
  // 화면 스크롤
  useHotkeys('j', () => {
    const container = document.scrollingElement || document.documentElement
    const half = window.innerHeight / 2
    container.scrollBy({ top: half, left: 0, behavior: 'smooth' })
  })
  useHotkeys('k', () => {
    const container = document.scrollingElement || document.documentElement
    const half = window.innerHeight / 2
    container.scrollBy({ top: -half, left: 0, behavior: 'smooth' })
  })

  return <OverlayTutorial/>
}

type Props = {}
