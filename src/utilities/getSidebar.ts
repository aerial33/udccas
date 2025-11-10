import type { Post } from '@/payload-types'
import type { SidebarWidgetsProps } from '@/components/CollectionArchive/SidebarWidgets'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type CollectionSlug = 'posts' | 'emplois'

/**
 * Fetches featured posts for sidebar
 */
async function getFeaturedPosts(): Promise<SidebarWidgetsProps['popularPosts']> {
  const payload = await getPayload({ config: configPromise })

  const featuredDocs = await payload.find({
    collection: 'posts',
    where: {
      isFeatured: {
        equals: true,
      },
    },
    limit: 5,
    depth: 1,
    sort: '-publishedAt',
  })

  return featuredDocs.docs.map((post: Post) => ({
    id: post.id.toString(),
    title: post.title,
    slug: post.slug || '',
    image:
      typeof post.heroImage === 'object' && post.heroImage !== null
        ? post.heroImage.url || undefined
        : undefined,
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '',
    commentsCount: 0,
  }))
}

/**
 * Fetches categories with their post count for a given collection
 */
async function getCategoriesWithCount(
  collectionSlug: CollectionSlug,
): Promise<SidebarWidgetsProps['categories']> {
  const payload = await getPayload({ config: configPromise })

  const allCategories = await payload.find({
    collection: 'categories',
    limit: 100,
    depth: 0,
  })

  const categoriesWithCount = await Promise.all(
    allCategories.docs.map(async (category) => {
      const postsCount = await payload.count({
        collection: collectionSlug,
        where: {
          categories: {
            contains: category.id,
          },
        },
      })

      return {
        id: category.id.toString(),
        name: typeof category.title === 'string' ? category.title : '',
        count: postsCount.totalDocs,
      }
    }),
  )

  return categoriesWithCount.filter((cat) => cat.count > 0)
}

/**
 * Fetches complete sidebar props (featured posts + categories)
 */
async function getSidebarProps(collectionSlug: CollectionSlug): Promise<SidebarWidgetsProps> {
  const [popularPosts, categories] = await Promise.all([
    getFeaturedPosts(),
    getCategoriesWithCount(collectionSlug),
  ])

  return {
    popularPosts,
    categories,
  }
}

/**
 * Returns a cached version of getSidebarProps with cache tags
 */
export const getCachedSidebarProps = (collectionSlug: CollectionSlug = 'posts') =>
  unstable_cache(async () => getSidebarProps(collectionSlug), [`sidebar_${collectionSlug}`], {
    tags: [`sidebar_${collectionSlug}`, 'categories', 'featured_posts'],
  })