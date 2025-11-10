import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Membre } from '../../../payload-types'

export const revalidateMembre: CollectionAfterChangeHook<Membre> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/membres/${doc.slug}`

      payload.logger.info(`Revalidating membre at path: ${path}`)

      revalidatePath(path)
      revalidateTag('membres-sitemap')
    }

    // If the membre was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/membres/${previousDoc.slug}`

      payload.logger.info(`Revalidating old membre at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('membres-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Membre> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/membres/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('membres-sitemap')
  }

  return doc
}
