'use client'

import { Calendar, UserRound } from 'lucide-react'

import React, { Fragment } from 'react'

import Link from 'next/link'

import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'populatedAuthors'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'emplois'
  showCategories?: boolean
  title?: string
  variant?: 'default' | 'featured' | 'grid'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
    variant = 'default',
  } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  // Handle categories for posts and category for emplois
  const categories = doc && 'categories' in doc ? doc.categories : undefined
  const category = doc && 'category' in doc ? doc.category : undefined
  const location = doc && 'location' in doc ? doc.location : undefined
  const organization = doc && 'organization' in doc ? doc.organization : undefined
  const status = doc && 'status' in doc ? doc.status : undefined
  const publishedAt = doc && 'publishedAt' in doc ? doc.publishedAt : undefined
  const populateAuthors = doc && 'populatedAuthors' in doc ? doc.populatedAuthors : undefined

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const getImageClasses = () => {
    switch (variant) {
      case 'featured':
        return 'w-full object-cover !transition-all !duration-[0.35s] !ease-in-out group-hover:scale-105 hover:brightness-50'
      case 'grid':
        return 'h-48 object-cover !transition-all !duration-[0.35s] !ease-in-out group-hover:scale-105 hover:brightness-50'
      default:
        return 'h-48 object-cover !transition-all !duration-[0.35s] !ease-in-out group-hover:scale-105 hover:brightness-50'
    }
  }
  const getCardBodyPadding = () => {
    switch (variant) {
      case 'featured':
        return 'p-[40px] xl:!p-[2rem_2.5rem_1.25rem] lg:!p-[2rem_2.5rem_1.25rem] md:!p-[2rem_2.5rem_1.25rem] max-md:pb-4'
      case 'grid':
        return 'p-[40px] xl:!p-[1.75rem_1.75rem_1rem_1.75rem] lg:!p-[1.75rem_1.75rem_1rem_1.75rem] md:!p-[1.75rem_1.75rem_1rem_1.75rem] max-md:pb-4'
      default:
        return 'p-[40px] xl:!p-[2rem_2.5rem_1.25rem] lg:!p-[2rem_2.5rem_1.25rem] md:!p-[2rem_2.5rem_1.25rem] max-md:pb-4'
    }
  }
  const getCardFooterPadding = () => {
    switch (variant) {
      case 'featured':
        return 'xl:!p-[1.25rem_2.5rem_1.25rem] lg:!p-[1.25rem_2.5rem_1.25rem] md:!p-[1.25rem_2.5rem_1.25rem] p-[18px_40px]'
      case 'grid':
        return 'xl:!p-[1.25rem_1.75rem_1.25rem] lg:!p-[1.25rem_1.75rem_1.25rem] md:!p-[1.25rem_1.75rem_1.25rem] p-[18px_40px]'
      default:
        return 'xl:!p-[1.25rem_2.5rem_1.25rem] lg:!p-[1.25rem_2.5rem_1.25rem] md:!p-[1.25rem_2.5rem_1.25rem] p-[18px_40px]'
    }
  }
  return (
    <article
      className={cn(
        'card shadow-card relative overflow-hidden rounded-xl hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <figure className="overlay overlay-1 hover-scale group rounded-t-xl">
        <Link href={href} className="hover:text-primary">
          {!metaImage && (
            <div
              className={`flex items-center justify-center bg-gray-200 ${variant === 'featured' ? 'h-64' : 'h-48'}`}
            >
              {" Pas d'image 📷"}
            </div>
          )}
          {metaImage && typeof metaImage !== 'string' && (
            <Media resource={metaImage} className={getImageClasses()} />
          )}
        </Link>
        <figcaption className="pointer-events-none absolute inset-0 z-[5] h-full w-full p-2 px-4 py-3 text-center opacity-0 group-hover:opacity-100">
          <span className="absolute top-1/2 left-0 !mb-0 w-full -translate-y-[80%] p-[.75rem_1rem] text-xl font-medium text-white opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-1/2 group-hover:opacity-100">
            {relationTo === 'posts' ? 'Lire notre article' : "Voir l'offre"}
          </span>
        </figcaption>
      </figure>
      <div className={`card-body flex-[1_1_auto] ${getCardBodyPadding()}`}>
        <div className="post-header !mb-[.9rem]">
          {/* Categories for posts */}
          {relationTo === 'posts' && showCategories && hasCategories && (
            <div className="relative !mb-[.4rem] inline-flex !pl-[1.4rem] align-top text-[0.7rem] font-bold !tracking-[0.02rem] !text-[#aab0bc] uppercase before:absolute before:top-2/4 before:left-0 before:inline-block before:h-[0.05rem] before:w-3 before:translate-y-[-60%] before:bg-[#3f78e0] before:content-['']">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'
                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      <Link href={`#`} className="hover" rel="category">
                        {categoryTitle}
                      </Link>
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Category and status for emplois */}
          {/* {relationTo === 'emplois' && (
            <div className="relative !mb-[.4rem] inline-flex !pl-[1.4rem] align-top text-[0.7rem] font-bold !tracking-[0.02rem] !text-[#aab0bc] uppercase before:absolute before:top-2/4 before:left-0 before:inline-block before:h-[0.05rem] before:w-3 before:translate-y-[-60%] before:bg-[#3f78e0] before:content-['']">
              <Link href={`#`} className="hover" rel="category">
                {category && getCategoryLabel(category)}
              </Link>
              <div className="ml-2 flex items-center gap-2">{status && getStatusBadge(status)}</div>
            </div>
          )} */}

          {titleToUse && (
            <h3 className="post-title !mt-1 !mb-0 text-3xl !leading-[1.35] font-bold">
              <Link className="hover:text-primary text-gray-700" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          )}
        </div>

        <div className="!relative">
          {description && <p className="line-clamp-5">{sanitizedDescription}</p>}

          {/* Additional info for emplois */}
          {/* {relationTo === 'emplois' && (
            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {location && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">📍</span>
                  <span>{location}</span>
                </div>
              )}
              {organization && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">🏢</span>
                  <span>{organization}</span>
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>

      {/* Card footer */}
      <div className={`card-footer ${getCardFooterPadding()}`}>
        <ul className="text-muted-foreground m-0 !mb-0 flex list-none gap-2 p-0 text-xs">
          {publishedAt && (
            <li className="flex items-center gap-1">
              <Calendar size={16} />
              <span>
                {new Date(publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </li>
          )}
          <span> | </span>
          {relationTo === 'posts' &&
            populateAuthors &&
            Array.isArray(populateAuthors) &&
            populateAuthors.length > 0 && (
              <li className="flex items-center gap-1">
                <UserRound size={16} />
                <span>
                  Par{' '}
                  {typeof populateAuthors[0] === 'object'
                    ? populateAuthors[0].name
                    : populateAuthors[0]}
                </span>
              </li>
            )}
        </ul>
      </div>
    </article>
  )
}
