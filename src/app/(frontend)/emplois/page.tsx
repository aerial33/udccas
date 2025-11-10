// import { EmploiShowcase } from '@/components/emploi/EmploiShowcase'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { EmploiShowcase } from '@/components/ShowCaseEmploi/EmploiShowcase'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const emplois = await payload.find({
    collection: 'emplois',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      image: true,
      typeContrat: true,
      publishedAt: true,
      organisme: true,
      meta: true,
      content: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="animation-appear">
      <PageClient />

      <EmploiShowcase emplois={emplois.docs} totalDocs={emplois.totalDocs} />

      {/* Pagination Section */}
      {emplois.totalPages && emplois.totalPages > 1 && emplois.page && (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8">
            <PageRange
              collection="emplois"
              currentPage={emplois.page}
              limit={12}
              totalDocs={emplois.totalDocs}
            />
            <Pagination page={emplois.page} totalPages={emplois.totalPages} collection="emplois" />
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: "Offres d'emploi - RPDAD Gironde",
    description:
      "Découvrez les dernières opportunités professionnelles dans le réseau RPDAD en Gironde. Rejoignez une équipe engagée dans l'aide à domicile.",
  }
}
