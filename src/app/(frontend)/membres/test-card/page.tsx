import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { MembreMapLayout } from '@/components/ShowCaseMembers/MembreMapLayout'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function TestCardPage() {
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

  return <MembreMapLayout membres={membres.docs} totalDocs={membres.totalDocs} />
}

export function generateMetadata(): Metadata {
  return {
    title: 'Test CardMembers - RPDAD',
    description: 'Page de test pour le composant CardMembers horizontal',
    robots: 'noindex, nofollow',
  }
}
