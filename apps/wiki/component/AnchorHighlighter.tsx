'use client'

import { useEffect } from 'react'

export const AnchorHighlighter = () => {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')

    for (const element of document.querySelectorAll('pre.markdown *')) {
      if (element.textContent === `:${hash}:`) {
        element.classList.add('anchor')
      }
    }
  }, [])

  return null
}
