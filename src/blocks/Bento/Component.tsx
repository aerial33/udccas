import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { BentoCard, BentoGrid } from '@/components/bento/bento-grid'
import { FadeUp } from '@/components/motion/animations'
import { BentoCardBlock } from '@/payload-types'

import { DEFAULT_BENTO_CARDS } from './constants'

// Design fixe : classes CSS pour chaque position (index 0-3)
const DESIGN_CLASSES = [
  'lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-3 bg-[#E9ACD4] lg:rounded-tl-[100px]  xl:rounded-tl-[300px] text-white xl:row-start-1 xl:row-end-3 xl:col-start-1 xl:col-end-3 xl:min-h-[550px]',
  'xl:col-start-3 xl:col-end-5 xl:row-start-1 xl:row-end-2  bg-[#FEF9C3] lg:col-start-1 lg:col-end-5 lg:row-start-3 lg:row-end-4   xl:items-start md:relative overflow-visible',
  'xl:col-start-3 xl:col-end-4 xl:row-start-2 xl:row-end-3 bg-flamingo-lighter lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2',
  'xl:col-start-4 xl:col-end-5 xl:row-start-2 xl:row-end-3 bg-chateau-lighter lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-3',
]

export const BentoGridBlock: React.FC<BentoCardBlock> = (props) => {
  // Merger les données CMS avec les designs fixes
  const features = (props.cards && props.cards.length > 0 ? props.cards : DEFAULT_BENTO_CARDS).map(
    (card, index) => {
      // Récupération de l'image (Media object ou string ID)
      const imageResource = 'image' in card && card.image ? card.image : undefined

      return {
        title: card.title || '',
        description: card.description || '',
        link: card.link, // Passer la structure link directe
        ...(card.tag ? { tag: card.tag } : {}),
        image: imageResource,
        // Design fixe selon la position (index)
        className: DESIGN_CLASSES[index] || '',
        // Passer l'index pour appliquer le layout correspondant
        cardIndex: index,
      }
    },
  )

  return (
    <>
      <section className="relative px-4 py-24 xl:px-0">
        <BackgroundSection className={props.bgColor || 'bg-white'} />
        {props.title && (
          <div className="relative z-10 container mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-700 lg:text-4xl">{props.title}</h2>
            <p className="mx-auto max-w-2xl text-xl font-light text-balance text-gray-500 lg:text-2xl">
              {props.sousTitre}
            </p>
          </div>
        )}
        <FadeUp delay={0.5} className="relative">
          <BentoGrid
            className={'mx-auto h-auto max-w-7xl px-0 lg:grid-cols-4 lg:grid-rows-3 xl:grid-rows-2'}
          >
            {features?.map((feature, index) => (
              <BentoCard key={`${feature.title}-${index}`} {...feature} />
            ))}
          </BentoGrid>
          {/* <DotPattern dotColor="bg-flamingo" className="-top-20 -left-50 z-10 hidden md:flex" /> */}
        </FadeUp>
      </section>
    </>
  )
}
