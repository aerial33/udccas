import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cache } from 'react'

import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import BlogSection from '@/components/BlogContent/content-emploi'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { EmploiHero } from '@/heros/EmploiHero'
import { generateMeta } from '@/utilities/generateMeta'

import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const emplois = await payload.find({
    collection: 'emplois',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = emplois.docs
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      slug: slug as string,
    }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Emploi({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/emplois/' + slug
  const emploi = await queryEmploiBySlug({ slug })

  if (!emploi) return <PayloadRedirects url={url} />

  return (
    <>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <EmploiHero emploi={emploi} />

      <BlogSection emploi={emploi} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const emploi = await queryEmploiBySlug({ slug })

  return generateMeta({ doc: emploi })
}

const queryEmploiBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'emplois',
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
