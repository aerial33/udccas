import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'hautDePage',
  label: 'Navigation',
  admin: {
    meta: {
      title: 'Gestion des liens de navigation',
      description: 'Configuration de la navigation principale du site',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Liens de navigation',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'subNavigation',
          label: 'Sous-navigation',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
