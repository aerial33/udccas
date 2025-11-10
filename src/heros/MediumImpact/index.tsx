import { ArrowRight } from 'lucide-react'

import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import type { Page } from '@/payload-types'

export const MediumImpactHero: React.FC<Page['hero']> = ({ badge, links, media, richText }) => {
  return (
    <div className="container pt-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-[40px] md:aspect-video">
        {/* Image de fond via composant Media */}
        {media && typeof media === 'object' && (
          <Media
            imgClassName="absolute inset-0 h-full w-full object-cover brightness-50"
            priority
            resource={media}
            fill
          />
        )}

        {/* Contenu */}
        <div className="absolute inset-0 z-20 flex items-center p-5 md:p-14 xl:p-20 2xl:p-28">
          <div className="richtext-content max-w-2xl">
            {badge && (
              <Badge variant="secondary" className="mb-3 bg-white/20 text-white backdrop-blur-sm">
                {badge}
              </Badge>
            )}
            {richText && (
              <RichText
                className="[&_h1]:line-clamp-2 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:sm:text-3xl [&_h1]:lg:text-4xl [&_h1,h2]:text-white [&_h2]:line-clamp-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:sm:text-3xl [&_h2]:lg:text-4xl [&_p]:mt-3 [&_p]:line-clamp-2 [&_p]:text-xl [&_p]:text-white [&_p]:sm:mt-5"
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && links[0]?.link && (
              <div className="mt-5 sm:mt-8">
                <CMSLink
                  {...links[0].link}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-neutral-100"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                </CMSLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
