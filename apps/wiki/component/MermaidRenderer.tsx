'use client'
import { useEffect } from 'react'
import mermaid from 'mermaid'

export const MermaidRenderer = () => {
  useEffect(() => {
    const selector = '.language-mermaid'
    if (document.querySelector(selector)) {
      mermaid.run({
        querySelector: '.language-mermaid',
      })
    }
  }, [])

  return null
}
