import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/payload-types'

interface FeaturedPostProps {
  post: Post
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const imageUrl =
    typeof post.heroImage === 'object' && post.heroImage?.url ? post.heroImage.url : undefined

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Image principale */}
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      )}

      {/* Contenu */}
      <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
        <div className="space-y-3">
          {/* Date */}
          {post.publishedAt && (
            <p className="text-primary text-sm font-medium">
              {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          {/* Titre */}
          <h2 className="group-hover:text-primary text-2xl leading-tight font-bold text-gray-900 transition-colors lg:text-3xl">
            {post.title}
          </h2>

          {/* Description */}
          {post.meta?.description && (
            <p className="line-clamp-3 text-base text-gray-600 lg:text-lg">
              {post.meta.description}
            </p>
          )}
        </div>

        {/* Call to action */}
        <div className="mt-6">
          <span className="text-primary inline-flex items-center text-sm font-semibold transition-colors group-hover:underline">
            Lire l'article
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
