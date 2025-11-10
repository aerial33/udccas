import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateDelete, revalidateEmploi } from './hooks/revalidateEmploi'

export const Emplois: CollectionConfig = {
  slug: 'emplois',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'statusOffre', 'publishedAt'],
    group: 'Publications',
    hideAPIURL: false,
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'emplois',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'emplois',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: "Titre de l'offre",
      admin: {
        components: {
          Cell: '@/components/Admin/Fields/Cell.tsx#TitleCell',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: "Image de l'offre",
      admin: {
        description: "Image principale associée à l'offre d'emploi",
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '🏫 Informations générales',
          fields: [
            {
              name: 'organisme',
              type: 'group',
              label: 'Organisme',
              fields: [
                {
                  name: 'nom',
                  type: 'text',
                  label: 'Nom',
                  admin: {
                    description: 'Nom de l’organisme qui gère cet emploi',
                  },
                },
                {
                  name: 'lieu',
                  type: 'text',
                  label: 'Adresse',
                  admin: {
                    description: 'Adresse de l’organisme',
                  },
                },
                {
                  type: 'collapsible',
                  label: "☎️  Contact pour l'organisme",
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'contact',
                      type: 'group',
                      label: 'Contact',
                      fields: [
                        {
                          name: 'nom',
                          type: 'text',
                          label: 'Nom du contact',
                          admin: {
                            description: 'Nom du contact de l’organisme',
                          },
                        },
                        {
                          name: 'telephone',
                          type: 'text',
                          label: 'Téléphone du contact',
                        },
                        {
                          name: 'email',
                          type: 'email',
                          label: 'Email du contact',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: "ℹ️  Informations sur l'offre",
                  admin: {
                    initCollapsed: false,
                  },
                  fields: [
                    {
                      name: 'description',
                      type: 'richText',
                      label: 'Informations supplémentaires',
                      editor: lexicalEditor({
                        features: ({ rootFeatures }) => {
                          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                        },
                      }),
                      admin: {
                        description: "Information indicatif de l'organisme pour l'offre d'emploi",
                      },
                    },
                    {
                      name: 'lien',
                      type: 'text',
                      label: 'Lien',
                      admin: {
                        description: "Lien vers l'offre d'emploi",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '🖋️ Contenu',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Contenu de la page',
              admin: {
                description: "Contenu de l'offre à pourvoir ",
              },
            },
          ],
        },
        {
          label: '🌐 SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({}),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'datePourvoir',
      type: 'date',
      label: 'Poste à pourvoir pour le',
      admin: {
        position: 'sidebar',
        description: 'Date souhaitée pour le début du poste',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'typeContrat',
      type: 'select',
      label: 'Type de contrat',
      options: [
        {
          label: 'CDI',
          value: 'cdi',
        },
        {
          label: 'CDD',
          value: 'cdd',
        },
      ],
      admin: {
        position: 'sidebar',
        description: "Type de contrat proposé pour l'offre d'emploi",
      },
    },
    {
      name: 'workTime',
      type: 'select',
      label: 'Temps de travail',
      options: [
        {
          label: 'Temps plein',
          value: 'full-time',
        },
        {
          label: 'Temps partiel',
          value: 'part-time',
        },
        {
          label: 'Horaires flexibles',
          value: 'flexible',
        },
      ],
      defaultValue: 'full-time',
      admin: {
        position: 'sidebar',
        description: 'Durée de travail pour le poste',
      },
    },
    {
      name: 'statusOffre',
      type: 'select',
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Pourvue',
          value: 'filled',
        },
        {
          label: 'Expirée',
          value: 'expired',
        },
      ],
      label: "Statut de l'offre",
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateEmploi],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

export default Emplois
