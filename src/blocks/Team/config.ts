import type { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  labels: {
    singular: 'Équipe',
    plural: 'Équipes',
  },
  interfaceName: 'TeamBlock',
  imageURL: '/img/blocks/team-preview.jpeg',
  imageAltText: 'Team Block',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre',
      required: false,
    },
    {
      name: 'members',
      type: 'array',
      label: "Membres de l'équipe",
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Fonction',
          required: true,
        },
        {
          name: 'photo',
          type: 'upload',
          label: 'Photo',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Biographie',
          required: false,
        },
        {
          name: 'cardAccentColor',
          type: 'radio',
          label: "Couleur d'accentuation des cartes",
          defaultValue: 'bg-blue-100',
          options: [
            { label: '🔵 Bleu clair', value: 'bg-blue-100' },
            { label: '🔵 Bleu moyen', value: 'bg-blue-200' },
            { label: '🔵 Bleu foncé', value: 'bg-blue-300' },
            { label: '🟠 Orange clair', value: 'bg-flamingo-lighter' },
            { label: '🟠 Orange moyen', value: 'bg-flamingo-light' },
            { label: '🟢 Vert clair', value: 'bg-chateau-lighter' },
            { label: '🟢 Vert moyen', value: 'bg-chateau-light' },
            { label: '🟣 Violet clair', value: 'bg-primary-lighter' },
            { label: '🟣 Violet moyen', value: 'bg-primary-light' },
            { label: '⚫ Gris clair', value: 'bg-neutral-100' },
            { label: '⚫ Gris moyen', value: 'bg-neutral-200' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Disposition',
      defaultValue: 'grid-3',
      options: [
        { label: 'Grille 2 colonnes', value: 'grid-2' },
        { label: 'Grille 3 colonnes', value: 'grid-3' },
        { label: 'Grille 4 colonnes', value: 'grid-4' },
      ],
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
