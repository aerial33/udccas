import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const map: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  imageURL: '/img/blocks/map-interactive.jpeg',
  imageAltText: 'Map',
  fields: [
    {
      name: 'title',
      type: 'text',
    },

    {
      name: 'MapInfo',
      label: 'Informations de la Map',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
  ],
}
