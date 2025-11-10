import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'

import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const emplois = await payload.find({
    collection: 'emplois',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Offres d'emploi</h1>
          <p>
            Découvrez les dernières opportunités professionnelles dans le réseau RPDAD en Gironde.
          </p>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="emplois"
          currentPage={emplois.page}
          limit={12}
          totalDocs={emplois.totalDocs}
        />
      </div>

      <CollectionArchive posts={emplois.docs} relationTo="emplois" />

      <div className="container">
        {emplois?.page && emplois?.totalPages > 1 && (
          <Pagination page={emplois.page} totalPages={emplois.totalPages} collection="emplois" />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Offres d'emploi - Page ${pageNumber || ''} - RPDAD Gironde`,
    description:
      'Découvrez les dernières opportunités professionnelles dans le réseau RPDAD en Gironde.',
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'emplois',
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 2; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
