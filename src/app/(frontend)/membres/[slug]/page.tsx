import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cache } from 'react'

import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import MembresContent from '@/components/BlogContent/membres-content'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { generateMeta } from '@/utilities/generateMeta'

import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const membres = await payload.find({
    collection: 'membres',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = membres.docs.map(({ slug }) => {
    return { slug: typeof slug === 'string' ? slug : '' }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Membre({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/membres/' + slug
  const membre = await queryMembreBySlug({ slug })

  if (!membre) return <PayloadRedirects url={url} />

  return (
    <div className="animation-appear pb-8">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* TODO: Replace with actual membre content component */}
      <MembresContent {...membre} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const membre = await queryMembreBySlug({ slug })

  return generateMeta({ doc: membre })
}

const queryMembreBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'membres',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
