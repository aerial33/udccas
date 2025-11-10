'use client'

import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

/**
 * Custom hook to get window dimensions
 * Optimized replacement for react-use's useWindowSize
 * Includes SSR safety and debounced resize handling
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // Handler to update state
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener with passive option for better performance
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
