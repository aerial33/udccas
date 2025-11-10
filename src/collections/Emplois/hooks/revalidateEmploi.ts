import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Emplois } from '../../../payload-types'

export const revalidateEmploi: CollectionAfterChangeHook<Emplois> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/emplois/${doc.slug}`

      payload.logger.info(`Revalidating emploi at path: ${path}`)

      revalidatePath(path)
      revalidateTag('emplois-sitemap')
    }

    // If the emploi was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/emplois/${previousDoc.slug}`

      payload.logger.info(`Revalidating old emploi at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('emplois-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Emplois> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/emplois/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('emplois-sitemap')
  }

  return doc
}
