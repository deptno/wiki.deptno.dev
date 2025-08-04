import { useEffect, useState } from 'react'

export function useScrollable() {
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScrollable(document.documentElement.scrollHeight > window.innerHeight)
      const onResize = () =>
        setScrollable(document.documentElement.scrollHeight > window.innerHeight)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }
  }, [])

  return scrollable
}

