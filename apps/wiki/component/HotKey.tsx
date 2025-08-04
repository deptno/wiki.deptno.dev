'use client'

import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRouter } from 'next/navigation'
import { createNumberHandler } from '../lib/createNumberHandler'
import { OverlayTutorial } from './OverlayTutorial'

export function HotKey(props) {
  const router = useRouter()

  // 검색에 포커스
  useHotkeys('meta+k', () => {
    document.querySelector<HTMLInputElement>('input[type=search]')?.focus()
  })

  // 검색 결과 선택
  useHotkeys('1', createNumberHandler({ router, key: '1'}))
  useHotkeys('2', createNumberHandler({ router, key: '2'}))
  useHotkeys('3', createNumberHandler({ router, key: '3'}))
  useHotkeys('4', createNumberHandler({ router, key: '4'}))
  useHotkeys('5', createNumberHandler({ router, key: '5'}))
  useHotkeys('6', createNumberHandler({ router, key: '6'}))
  useHotkeys('7', createNumberHandler({ router, key: '7'}))
  useHotkeys('8', createNumberHandler({ router, key: '8'}))
  useHotkeys('9', createNumberHandler({ router, key: '9'}))

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

  return <OverlayTutorial />
}

type Props = {
}
