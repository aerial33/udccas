'use client'

import React, { useEffect } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, badge }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[15rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="relative z-10 container mb-8 flex items-center justify-center">
        <div className="richtext-content max-w-[36.5rem] md:text-center">
          {Badge && (
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white backdrop-blur-sm">
              {badge}
            </Badge>
          )}
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4 md:justify-center">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover brightness-50" priority resource={media} />
        )}
      </div>
    </div>
  )
}
