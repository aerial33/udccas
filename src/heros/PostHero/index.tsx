import { formatDateTime } from 'src/utilities/formatDateTime'

import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  // Construire le texte des catégories
  const categoriesText = categories
    ?.map((category) => {
      if (typeof category === 'object' && category !== null) {
        return category.title || 'Untitled category'
      }
      return null
    })
    .filter(Boolean)
    .join(', ')

  return (
    <div className="w-full h-120 px-2 xl:max-w-screen-2xl mx-auto pt-12">
      <div className="relative h-full aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
        {/* Image avec Media component ou dégradé par défaut */}
        {heroImage && typeof heroImage === 'object' ? (
          <Media
            resource={heroImage}
            fill
            imgClassName="h-full w-full rounded-3xl object-cover brightness-70 md:rounded-[40px]"
            priority
          />
        ) : (
          <div className="from-primary/80 to-primary absolute inset-0 rounded-3xl bg-gradient-to-br md:rounded-[40px]" />
        )}
        <div className="absolute inset-0 text-white bg-opacity-30 flex flex-col items-center justify-center">
          {categoriesText && (
            <Badge className="mb-4 text-white" variant="outline">
              {categoriesText}
            </Badge>
          )}
          <h1 className="inline-block align-middle text-5xl font-semibold md:text-7xl">
            {title}
          </h1>
          {hasAuthors && (
            <p className="mt-4 text-neutral-50 font-semibold text-xl">
              {formatAuthors(populatedAuthors)}
            </p>
          )}
          {publishedAt && (
            <span className="block mt-4 text-neutral-50 max-w-lg text-center">
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
