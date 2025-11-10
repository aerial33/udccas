import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HistoryAbout: Block = {
  slug: 'historyAbout',
  labels: {
    singular: 'Section Historique',
    plural: 'Sections Historiques',
  },
  interfaceName: 'HistoryAboutBlock',
  imageURL: '/img/blocks/history-about.jpeg',
  imageAltText: 'History About Section',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
      required: true,
      defaultValue: "L'Histoire du Réseau",
    },
    {
      name: 'content',
      label: 'Contenu descriptif',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Description de la section historique avec formatage riche',
      },
    },
    link({
      overrides: {
        label: 'Bouton CTA',
      },
    }),
    {
      name: 'timelineItems',
      type: 'array',
      label: 'Éléments de la chronologie',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Élément',
        plural: 'Éléments',
      },
      fields: [
        {
          name: 'date',
          type: 'text',
          label: 'Date ou période',
          required: true,
          admin: {
            placeholder: 'ex: 2010 ou 2008 - 2010',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
          admin: {
            placeholder: 'ex: Création du réseau',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          admin: {
            rows: 4,
            placeholder: 'Description de cet événement historique...',
          },
        },
      ],
      defaultValue: [
        {
          date: '2002',
          title: 'Professionnalisation des services',
          description:
            "Les services d'aide-ménagère deviennent des Services d'Aide et d'Accompagnement à Domicile (SAAD) pour prendre en compte la perte d'autonomie et les situations de handicap. Il s'agit d'accompagner au quotidien et de façon personnalisée chaque bénéficiaire dans son environnement.",
        },
        {
          date: '2008 - 2010',
          title: 'Phase de réflexion',
          description:
            "Un groupe de directeurs de CCAS porteur de SAAD publics et issu du comité de directeurs de l'UDCCAS a réfléchi à la mise en place d'un groupement pour mutualiser les forces et permettre aux services d'aide à domicile de continuer à exercer.",
        },
        {
          date: '2010',
          title: 'Création du réseau',
          description:
            "Naissance du Réseau Public Départemental d'Aide à Domicile (RPDAD). Dans un premier temps, le réseau a été porté par l'UDCCAS, constituant sa branche médico-sociale (établissement de l'UDCCAS).",
        },
        {
          date: '2011',
          title: 'Création du GCSMS',
          description:
            "Le département et la direction des finances publiques demandaient la création d'un GCSMS adossé à l'UDCCAS pour sécuriser juridiquement les flux financiers publics.",
        },
        {
          date: '2011 - 2024',
          title: 'Structuration progressive',
          description:
            'Depuis plus de 10 ans, la structuration progressive du réseau a répondu sans conteste aux objectifs fixés. Le réseau est reconnu pour sa compétence et satisfait globalement les membres du réseau.',
        },
        {
          date: '2025',
          title: "Le RPDAD aujourd'hui",
          description:
            'Le réseau compte 33 services membres. Il accompagne près de 5000 personnes âgées et personnes en situation de handicap avec 1200 agents et intervient sur 194 communes de Gironde.',
        },
      ],
    },
    {
      name: 'bgColor',
      type: 'radio',
      label: 'Couleur de fond de section',
      defaultValue: 'bg-primary-lightest',
      options: [
        { label: '⚪ Blanc', value: 'bg-white' },
        { label: '⚫ Gris', value: 'bg-neutral-100' },
        { label: '🟠 Orange', value: 'bg-flamingo-lightest' },
        { label: '🔵 Bleu', value: 'bg-blue-lightest' },
        { label: '🟢 Vert', value: 'bg-chateau-lightest' },
        { label: '🟣 Violet', value: 'bg-primary-lightest' },
      ],
    },
  ],
}
