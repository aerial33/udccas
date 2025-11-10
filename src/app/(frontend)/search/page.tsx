import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { FeatureGrid, type FeatureGridItem } from '@/components/ui/FeatureGrid'
import type { Search } from '@/payload-types'
import { Search as SearchComponent } from '@/search/Component'

import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

// Type helper pour les documents de recherche valides
type ValidSearchResult = Search & {
  doc: NonNullable<Search['doc']>
  slug: string
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      doc: true,
      publishedAt: true,
    },
    sort: '-publishedAt',
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Rechercher sur le site</h1>

          <div className="mx-auto max-w-[50rem]">
            <SearchComponent />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        // todo : Rafactoriser FeatureGrid as soons as possible
        <FeatureGrid
          title={`${posts.totalDocs} résultat${posts.totalDocs > 1 ? 's' : ''}${query ? ` pour "${query}"` : ''}`}
          subtitle="Découvrez les contenus correspondant à votre recherche"
          badgeText="Résultats de recherche"
          buttonText=""
          buttonLink=""
          items={posts.docs
            .filter((doc): doc is ValidSearchResult => doc.doc != null && doc.slug != null)
            .map((searchDoc): FeatureGridItem => {
              const metaImage = searchDoc.meta?.image

              return {
                id: searchDoc.id,
                image:
                  metaImage && typeof metaImage !== 'number'
                    ? (metaImage.url ?? undefined)
                    : undefined,
                titre: searchDoc.title || '',
                date: searchDoc.publishedAt
                  ? new Date(searchDoc.publishedAt).toLocaleDateString('fr-FR')
                  : undefined,
                description: searchDoc.meta?.description || '',
                link: `/${searchDoc.doc.relationTo}/${searchDoc.slug}`,
              }
            })}
          maxItems={12}
          columns={3}
        />
      ) : (
        <div className="container text-center">Aucun résultat trouvé.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rechercher sur le site du RPDAD`,
  }
}
