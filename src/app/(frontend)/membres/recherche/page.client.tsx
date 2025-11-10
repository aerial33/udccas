'use client'

import { useEffect, useRef } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

export default function MembresSearchPageClient() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasTracked = useRef(false)

  useEffect(() => {
    if (!hasTracked.current && pathname) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any
      if (typeof window !== 'undefined' && win.umami) {
        const query = searchParams?.get('q')
        win.umami.track('members-search', { query: query || 'initial-load' })
        hasTracked.current = true
      }
    }
  }, [pathname, searchParams])

  return null
}
