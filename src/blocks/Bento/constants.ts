// Données par défaut pour les cartes Bento
// Utilisées à la fois dans la config PayloadCMS (defaultValue) et le composant React (fallback)

export const DEFAULT_BENTO_CARDS = [
  {
    title: 'Un Service public proche de chez vous',
    description:
      '1200 agents en Gironde dont 900 aides à domiciles, mais aussi des responsable de secteurs, agents administratifs et personnel de directrion',
    tag: 'Le réseau en Gironde',
    link: {
      type: 'custom' as const,
      url: '/',
      label: 'Découvrir nos engagements',
    },
  },
  {
    title: 'Aide à domicile',
    description:
      'Un service de qualité auprès de nos 5200 bénéficiaires agées et/ou en situation de handicap',
    link: {
      type: 'custom' as const,
      url: '/le-rpdad',
      label: 'En savoir plus',
    },
  },
  {
    title: 'Accompagnement adapté à vos besoins',
    description:
      '1200 agents en Gironde dont 900 aides à domiciles, mais aussi des responsable de secteurs, agents administratifs et personnel de directrion',
    link: {
      type: 'custom' as const,
      url: '/',
      label: 'En savoir plus',
    },
  },
  {
    title: 'Service de qualité',
    description:
      'Un accompagnement adapté à vos besoins : 671 700 heures réalisées en 2024 (AMPA, AMPH)',
    link: {
      type: 'custom' as const,
      url: '/',
      label: 'En savoir plus',
    },
  },
]
