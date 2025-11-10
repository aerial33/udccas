import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { FeatureCard } from '@/components/FeaturedCard'
import { FadeUp } from '@/components/motion/animations'
import type { FeatureCardsBlock as FeatureCardsBlockType } from '@/payload-types'

export const FeatureCardsBlock = ({ title, subtitle, bgColor }: FeatureCardsBlockType) => {
  return (
    <section className="relative container mx-auto px-4 py-16 xl:px-0">
        <BackgroundSection className={bgColor || 'bg-white'} />
        <FadeUp delay={0.3} className="mb-16 xl:mb-24">
          {title && (
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-balance">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-center text-xl text-balance">{subtitle}</p>
          )}
        </FadeUp>
        <FadeUp
          delay={0.4}
          className="mx-[-15px] !mt-[-50px] flex flex-wrap items-center lg:mx-[-20px] xl:mx-[-35px]"
        >
          <div className="!mt-[50px] w-full max-w-full flex-[0_0_auto] !px-[15px] lg:!order-2 lg:w-6/12 lg:!px-[20px] xl:!order-2 xl:w-6/12 xl:!px-[35px]">
            <FeatureCard
              number="01"
              title="Système d'information"
              description="Un système d'information commun et un pilotage global (smarphones, télégestion, plannification, faturation)"
              numberBgClass="bg-chateau-lighter text-chateau-dark"
              className="border-chateau max-w-[580px] lg:mr-6 xl:mr-6"
            />
            <FeatureCard
              number="02"
              title="Représenter et défendre les SAD publics"
              description="Une plateforme d’astreinte 24/24 et 7/7 pour garantir la continuité de service pour les intervenants et bénéficiaires"
              numberBgClass="bg-primary-lighter text-primary"
              className="border-primary mt-6 max-w-[580px] lg:ml-16 xl:ml-16"
            />
            <FeatureCard
              number="03"
              title="Développement des services"
              description="Un projet de service commun et des outils réglementaires partagés"
              numberBgClass="bg-yellow-lighter text-yellow-base"
              className="border-yellow-base mt-6 max-w-[580px] lg:mx-6 xl:mx-6"
            />
          </div>

          <div className="!mt-[50px] w-full max-w-full flex-[0_0_auto] !px-[15px] lg:!order-2 lg:w-6/12 lg:!px-[20px] xl:!order-2 xl:w-6/12 xl:!px-[35px]">
            <FeatureCard
              number="04"
              title="Pilotage et accompagnement"
              description="Un pilotage budgétaire et un accompagnement qualité pour tous nos services"
              numberBgClass="bg-primary-lighter text-primary"
              className="border-primary max-w-[580px] lg:mr-6 xl:mr-6"
            />
            <FeatureCard
              number="05"
              title="Harmoniser les pratiques RH, budgétaire et prévention"
              description="Un plan de formation professionnalisé, commun, délocalisé et adapté aux besoins des professionnels"
              numberBgClass="bg-blue-lighter text-blue-dark"
              className="border-blue-base mt-6 max-w-[580px] lg:ml-16 xl:ml-16"
            />
            <FeatureCard
              number="06"
              title="Projets innovants"
              description="Un échange de pratique et des projets novateurs..."
              numberBgClass="bg-flamingo-lighter text-flamingo"
              className="border-flamingo mt-6 max-w-[580px] lg:mx-6 xl:mx-6"
            />
          </div>
        </FadeUp>
      </section>
  )
}
