import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import editor from '@/access/editor'

// Extraction ID YouTube depuis URL complète ou ID direct
const extractYouTubeId = (input: string): string => {
  if (!input) return input

  // Si déjà un ID valide (11 caractères alphanumériques)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
    return input.trim()
  }

  // Patterns YouTube: youtube.com/watch?v=XXX, youtu.be/XXX, youtube.com/embed/XXX
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = input.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return input
}

// Extraction ID Vimeo depuis URL complète ou ID direct
const extractVimeoId = (input: string): string => {
  if (!input) return input

  // Si déjà un ID valide (chiffres uniquement)
  if (/^\d+$/.test(input.trim())) {
    return input.trim()
  }

  // Pattern Vimeo: vimeo.com/123456789
  const match = input.match(/vimeo\.com\/(\d+)/)
  if (match && match[1]) {
    return match[1]
  }

  return input
}

export const VideoEmbeds: CollectionConfig = {
  slug: 'video-embeds',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'source', 'updatedAt'],
    hideAPIURL: true,
  },
  access: {
    create: editor,
    delete: editor,
    read: anyone,
    update: editor,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Extraction auto ID selon source
        if (data.source === 'youtube' && data.videoId) {
          data.videoId = extractYouTubeId(data.videoId)
        } else if (data.source === 'vimeo' && data.videoId) {
          data.videoId = extractVimeoId(data.videoId)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
      admin: {
        description: 'Titre descriptif pour identifier la vidéo',
      },
    },
    {
      name: 'source',
      label: 'Source vidéo',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
      admin: {
        description: 'Plateforme de la vidéo',
      },
    },
    {
      name: 'videoId',
      label: 'ID Vidéo',
      type: 'text',
      required: true,
      admin: {
        description: "URL complète ou ID de la vidéo",
        placeholder: 'https://youtube.com/watch?v=dQw4w9WgXcQ ou dQw4w9WgXcQ',
        condition: (data) => !!data?.source,
      },
      validate: (val: unknown, { data }: { data: any }) => {
        if (!val) return 'ID vidéo requis'

        const stringVal = val as string

        if (data?.source === 'youtube') {
          const cleanId = extractYouTubeId(stringVal)
          if (!/^[a-zA-Z0-9_-]{11}$/.test(cleanId)) {
            return 'ID YouTube invalide (doit faire 11 caractères)'
          }
        } else if (data?.source === 'vimeo') {
          const cleanId = extractVimeoId(stringVal)
          if (!/^\d+$/.test(cleanId)) {
            return 'ID Vimeo invalide (doit être numérique)'
          }
        }

        return true
      },
    },
    {
      name: 'alt',
      label: 'Texte alternatif',
      type: 'text',
      admin: {
        description: 'Description pour accessibilité',
      },
    },
    {
      name: 'caption',
      label: 'Légende',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'thumbnail',
      label: 'Miniature personnalisée',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Optionnel : remplace thumbnail auto de la plateforme',
      },
    },
  ],
}
