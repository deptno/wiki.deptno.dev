'use client'

import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useScrollable } from '../hook/useScrollable'

export function OverlayTutorial(props) {
  const scrollable = useScrollable()
  const [scrollOverlay, setScrollOverlay] = useState(true)

  // 화면 스크롤
  useHotkeys('j', () => {
    setScrollOverlay(false)
  })
  useHotkeys('k', () => {
    setScrollOverlay(false)
  })

  if (scrollOverlay) {
    if (scrollable) {
      return (
        <div className="hidden md:flex flex-col fixed top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none justify-center opacity-65">
          <div className="text-center p-1 w-6 bg-gray-800 text-green-400 rounded-md">k</div>
          <div className="text-center p-1 w-6 bg-gray-800 text-green-400 rounded-md">j</div>
        </div>
      )
    }
  }

  return null
}

type Props = {
}
