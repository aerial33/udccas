import type { Block } from 'payload'

export const FeatureCards: Block = {
  slug: 'featureCards',
  labels: {
    singular: 'Carte de fonctionnalité',
    plural: 'Cartes de fonctionnalités',
  },
  interfaceName: 'FeatureCardsBlock',
  imageURL: '/img/blocks/card-preview.jpeg',
  imageAltText: 'Feature Cards',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre',
      required: false,
    },
    {
      name: 'bgColor',
      type: 'radio',
      label: 'Couleur de fond de section',
      defaultValue: 'bg-white',
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
