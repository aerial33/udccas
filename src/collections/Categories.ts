import type { CollectionConfig } from 'payload'

import editor from '@/access/editor'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: editor,
    delete: editor,
    read: () => true, // Public read access
    update: editor,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
