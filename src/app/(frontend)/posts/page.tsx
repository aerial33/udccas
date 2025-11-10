import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { FadeRight } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { getCachedSidebarProps } from '@/utilities/getSidebar'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      populatedAuthors: true,
      authors: true,
      heroImage: true,
    },
  })
  // Fetch sidebar data (featured posts + categories with count)
  const sidebarProps = await getCachedSidebarProps('posts')()
  return (
    <div className="mt-4 pb-24 md:mt-0">
      <PageClient />
      <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <section className="from-flamingo-lighter to-flamingo-lightest aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative -z-10 h-full overflow-hidden rounded-3xl bg-gradient-to-br pb-20 md:rounded-[40px]">
          <FadeRight className="mx-auto flex max-w-7xl justify-center gap-6 py-16 md:py-24">
            <div className="flex flex-col px-4 py-6 sm:py-8 lg:items-center lg:px-0">
              <Badge
                variant="outline"
                className="text-muted-foreground mb-4 border-gray-400 uppercase"
              >
                <PageRange
                  collection="posts"
                  currentPage={posts.page}
                  limit={12}
                  totalDocs={posts.totalDocs}
                />
              </Badge>
              <h1 className="mb-10 text-3xl leading-tight font-bold text-balance text-gray-700 md:text-4xl">
                {"L'Actualité du réseau en gironde"}
              </h1>
              <p className="text-muted-foreground text-[1.05rem] leading-[1.6] font-medium text-balance">
                {"Le Réseau Public Départemental d'Aide à Domicile de la Gironde"}
              </p>
            </div>
            <div className="hidden grid-cols-2 grid-rows-2 gap-4 px-4 md:grid"></div>
          </FadeRight>
          {/* Diagonale en bas de section */}
        </section>
      </div>

      {/* <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div> */}

      <CollectionArchive
        posts={posts.docs}
        sidebarProps={sidebarProps}
        className="relative z-10 -mt-20"
      />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rpdad Réseau départemental de la gironde - Actualités`,
  }
}
