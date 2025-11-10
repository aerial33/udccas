import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { MembreShowcase } from '@/components/ShowCaseMembers/MembreShowcase'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const membres = await payload.find({
    collection: 'membres',
    depth: 1,
    limit: 50,
    overrideAccess: false,
    select: {
      name: true,
      slug: true,
      logo: true,
      adresse: true,
      informations: true,
      publishedAt: true,
      coordinates: true,
      zone: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="animation-appear flex-1">
      <PageClient />

      {/* MembreShowcase Component */}
      <MembreShowcase membres={membres.docs} totalDocs={membres.totalDocs} />

      {/* Pagination Section */}
      {membres.totalPages && membres.totalPages > 1 && membres.page && (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8">
            <PageRange
              collection="membres"
              currentPage={membres.page}
              limit={50}
              totalDocs={membres.totalDocs}
            />
            <Pagination page={membres.page} totalPages={membres.totalPages} collection="membres" />
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Nos Membres - RPDAD Gironde',
    description:
      "Découvrez les membres du réseau RPDAD en Gironde. Structure associative engagée dans l'aide à domicile et les services à la personne.",
  }
}
