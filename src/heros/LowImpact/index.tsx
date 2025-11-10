import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import type { Page } from '@/payload-types'

export const LowImpactHero: React.FC<Page['hero']> = ({ badge, media, richText }) => {
  return (
    <section className="">
      <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
          {/* Image avec Media component ou dégradé par défaut */}
          {media && typeof media === 'object' ? (
            <Media
              resource={media}
              fill
              imgClassName="h-full w-full rounded-3xl object-cover brightness-70 md:rounded-[40px]"
              priority
            />
          ) : (
            <div className="from-primary/80 to-primary absolute inset-0 rounded-3xl bg-gradient-to-br md:rounded-[40px]" />
          )}

          {/* Overlay avec contenu */}
          <div className="richtext-content absolute inset-0 flex flex-col items-center justify-center text-center">
            {badge && (
              <Badge className="mb-4 border-white text-white" variant="outline">
                {badge}
              </Badge>
            )}
            {richText && (
              <RichText
                data={richText}
                className="max-w-xl [&_h1]:align-middle [&_h1]:text-5xl [&_h1]:text-white [&_h1]:md:text-7xl [&_h2]:text-white [&_p]:text-white"
                enableGutter={false}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
