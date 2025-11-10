'use client'

import React, { useEffect } from 'react'

import { useHeaderTheme } from '@/providers/HeaderTheme'

const PageClient: React.FC = () => {
  /* Force the header to be light mode */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
