// Configuration des layouts pour chaque position de card (index 0-3)

export interface CardLayout {
  // Wrapper principal du contenu texte
  contentWrapperClass: string
  // Classes pour le titre (h3)
  titleClass: string
  // Classes pour la description (p)
  descriptionClass: string
  // Position de l'image
  imagePosition: 'top' | 'bottom' | 'left' | 'right' | 'background' | 'absolute-top-right'
  // Classes pour le wrapper de l'image
  imageWrapperClass: string
  // Structure interne de la card (flex direction, alignment)
  cardInnerClass: string
  // Classes pour le lien
  linkClass: string
  // Classes pour le badge
  badgeClass: string
}

export const CARD_LAYOUTS: Record<number, CardLayout> = {
  // Card 0 : Grande card rose en haut à gauche - Layout centré vertical
  0: {
    contentWrapperClass: 'flex w-full flex-col items-center justify-center text-center py-4',
    titleClass: 'mb-2 text-2xl font-bold text-gray-700 lg:text-2xl max-w-sm',
    descriptionClass: 'max-w-md text-balance text-white/90',
    imagePosition: 'bottom',
    imageWrapperClass: 'mt-6 flex justify-center z-20',
    cardInnerClass: 'flex h-full flex-col items-center justify-center gap-6 p-8',
    linkClass: 'mt-4 font-medium text-white hover:text-primary',
    badgeClass: 'mb-4 border-white/30 text-white',
  },

  // Card 1 : Card flamingo en haut à droite - Image absolute top-right
  1: {
    contentWrapperClass: 'flex w-full max-w-md flex-col items-start justify-center',
    titleClass: 'mb-2 text-2xl font-bold text-gray-700 lg:text-2xl',
    descriptionClass: 'text-balance text-gray-500',
    imagePosition: 'absolute-top-right',
    imageWrapperClass: 'xl:absolute xl:-top-10 xl:-right-10 max-w-[250px] z-10',
    cardInnerClass:
      'flex h-full flex-col lg:flex-row justify-center items-center xl:justify-start p-6',
    linkClass: 'mt-4 font-medium hover:text-primary',
    badgeClass: 'mb-2 ml-auto block text-xs font-medium',
  },

  // Card 2 : Card jaune en bas à gauche - Image absolute top-right
  2: {
    contentWrapperClass: 'flex w-full max-w-md flex-col items-start justify-center',
    titleClass: 'mb-2 text-2xl font-bold text-gray-700 lg:text-2xl',
    descriptionClass: 'text-balance text-sm text-gray-500 p-2 max-w-md',
    imagePosition: 'absolute-top-right',
    imageWrapperClass: 'xl:absolute xl:-bottom-10 xl:-right-10 max-w-[150px] z-10',
    cardInnerClass: 'flex h-full flex-col md:flex-row justify-center p-6 items-center',
    linkClass: 'mt-4 font-medium hover:text-primary',
    badgeClass: 'mb-2 ml-auto block text-xs font-medium',
  },

  // Card 3 : Card chateau en bas à droite - Layout standard
  3: {
    contentWrapperClass: 'flex w-full max-w-md flex-col items-start justify-center',
    titleClass: 'mb-2 text-2xl font-bold text-gray-700 lg:text-2xl',
    descriptionClass: 'text-balance text-gray-500 lg:text-sm max-w-md ',
    imagePosition: 'bottom',
    imageWrapperClass: 'lg:absolute lg:bottom-0 md:-right-5 max-w-[200px]',
    cardInnerClass: 'flex h-full flex-col md:flex-row items-center justify-center p-6 -z-10',
    linkClass: 'mt-4 font-medium hover:text-primary',
    badgeClass: 'mb-2 ml-auto block text-xs font-medium',
  },
}
