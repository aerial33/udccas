import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: '🧑🏻‍🎨 Type de Haut de Page',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Image de fond',
          value: 'highImpact',
        },
        {
          label: 'Impact Moyen',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Hero Grid',
          value: 'heroGrid',
        },
        {
          label: 'Hero Primary',
          value: 'heroPrimary',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        description: 'Texte du badge (optionnel)',
      },
    },
    {
      name: 'actionType',
      type: 'radio',
      label: "📍 Type d'action à afficher",
      defaultValue: 'links',
      admin: {
        condition: (_, { type } = {}) => type === 'heroPrimary',
        layout: 'horizontal',
        description: 'Choisir entre afficher des liens de navigation ou une barre de recherche',
      },
      options: [
        {
          label: 'Liens de navigation',
          value: 'links',
        },
        {
          label: 'Barre de recherche',
          value: 'search',
        },
        {
          label: 'Aucun',
          value: 'none',
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type, actionType } = {}) =>
            type === 'heroPrimary' && actionType === 'links',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'heroGrid', 'lowImpact'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'images',
      type: 'array',
      label: '📷 Images',
      minRows: 3,
      maxRows: 4,
      admin: {
        condition: (_, { type } = {}) => type === 'heroPrimary',
        description: 'Sélectionner au moins 3 images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Texte alternatif',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Légende',
        },
      ],
    },
  ],
  label: false,
}
