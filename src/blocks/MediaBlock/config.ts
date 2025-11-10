import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'mediaType',
      type: 'radio',
      admin: {
        layout: 'horizontal',
        description: 'Choisir entre un média uploadé ou une vidéo embed',
      },
      defaultValue: 'media',
      options: [
        { label: 'Media (Upload)', value: 'media' },
        { label: 'Video Embed (YouTube/Vimeo)', value: 'video-embed' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Média à afficher',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'media',
      },
    },
    {
      name: 'videoEmbed',
      type: 'upload',
      relationTo: 'video-embeds',
      required: true,
      label: 'Vidéo embed à afficher',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'video-embed',
      },
    },
  ],
}
