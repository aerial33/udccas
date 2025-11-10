// blocks/CallToActionBlock.ts
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { Banner } from '../Banner/config'
import { MediaBlock } from '../MediaBlock/config'

export const CallToAction: Block = {
  slug: 'cta',
  imageURL: 'https://via.placeholder.com/300x200?text=CTA+Block',
  imageAltText: "Block d'appel à l'action",
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'imageTitle',
      type: 'upload',
      relationTo: 'media',
      label: 'Image titre',
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            {
              label: 'Principal',
              value: 'primary',
            },
            {
              label: 'Secondaire',
              value: 'secondary',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
