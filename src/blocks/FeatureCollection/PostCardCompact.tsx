import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/payload-types'

interface PostCardCompactProps {
  post: Post
}

export const PostCardCompact: React.FC<PostCardCompactProps> = ({ post }) => {
  const imageUrl =
    typeof post.heroImage === 'object' && post.heroImage?.url ? post.heroImage.url : undefined

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex h-full gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md"
    >
      {/* Contenu à gauche */}
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        <h3 className="group-hover:text-primary line-clamp-2 text-lg font-bold text-gray-900 transition-colors">
          {post.title}
        </h3>
        {post.meta?.description && (
          <p className="line-clamp-2 text-sm text-gray-600">{post.meta.description}</p>
        )}
        {post.publishedAt && (
          <p className="mt-2 text-xs text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
      {/* Image à droite */}
      {imageUrl && (
        <div className="relative aspect-video h-full w-32 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="80px"
          />
        </div>
      )}
    </Link>
  )
}
