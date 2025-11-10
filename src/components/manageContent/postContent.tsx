'use client'

import { FC } from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Post } from '@/payload-types'

import ArticleMeta from './ArticleMeta'

export interface SingleContentProps {
  post: Post
  hiddenDesc?: boolean
}
export interface SingleHeaderProps {
  hiddenDesc?: boolean
  titleMainClass?: string
  className?: string
}

export interface SingleTitleProps {
  title: string
  className?: string
  mainClass?: string
}

const SingleTitle: FC<SingleTitleProps> = ({
  mainClass = 'text-neutral-900 font-bold text-3xl md:text-5xl md:!leading-[120%] lg:text-5xl ',
  className = '',
  title,
}) => {
  return (
    <h1 className={className + ' ' + mainClass + ' max-w-4xl'} title={title}>
      {title}
    </h1>
  )
}

const SingleContent: FC<SingleContentProps> = ({ post, hiddenDesc }: SingleContentProps) => {
  // Extract author data
  const firstAuthor = post.populatedAuthors?.[0] || null
  const authorName = firstAuthor?.name || 'Auteur inconnu'

  // Format date
  const postDate = post.publishedAt || post.createdAt
  const formattedDate = new Date(postDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative">
      <div className={`nc-PageSingle py-4 pt-8`}>
        <header className="container rounded-xl">
          <div className="mx-auto max-w-screen-md">
            <div className="space-y-2">
              {/* <CategoryBadgeList
                itemClass="!px-3"
                categories={[DEMO_CATEGORIES[1]]}
              /> */}
              <SingleTitle title={post.title} />
              {!hiddenDesc && post.meta?.description && (
                <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
                  {post.meta.description}
                </span>
              )}
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="mb-4 flex flex-col justify-between space-y-5 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
                {/* <PostMeta2
                  size="large"
                  className="leading-none flex-shrink-0"
                  hiddenCategories
                  avatarRounded="rounded-full shadow-inner"
                /> */}
                {/* <SingleMetaAction2 /> */}
                <ArticleMeta
                  author={{ name: authorName }}
                  date={formattedDate}
                />
              </div>
            </div>
          </div>
        </header>

        {/* FEATURED IMAGE */}
        {post.heroImage && typeof post.heroImage !== 'string' && (
          <div className="container my-10 sm:my-12">
            <Media
              resource={post.heroImage}
              imgClassName="w-full rounded-xl object-cover object-top aspect-video"
            />
          </div>
        )}
      </div>
      <div className="nc-SingleContent space-y-10">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="prose lg:prose-lg dark:prose-invert mx-auto !max-w-screen-md"
        >
          <RichText data={post.content} enableGutter={false} />
        </div>
        <div className="mx-auto max-w-screen-md"></div>
      </div>
    </div>
  )
}

export default SingleContent
