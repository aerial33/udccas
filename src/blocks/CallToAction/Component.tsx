import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FadeUp } from '@/components/motion/animations'
import { CallToActionBlock as CallToActionBlockType, Media as MediaType } from '@/payload-types'

// Composant pour le block Call to Action
export const CallToActionBlock: React.FC<CallToActionBlockType> = (props) => {
  const { title, description, buttons, backgroundImage, imageTitle } = props

  // Vérifier si l'image est un objet Media complet ou juste un ID
  const isImagePopulated =
    backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
  const imageData = isImagePopulated ? (backgroundImage as MediaType) : null

  const buttonStyles = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'bg-flamingo text-white hover:bg-flamingo-light',
    outline: 'border-2 border-primary text-white hover:bg-primary-light hover:text-white',
  } as const

  return (
    <FadeUp delay={0.3} className="relative overflow-hidden px-4 py-16">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Media
            resource={backgroundImage}
            imgClassName="h-full w-full object-cover object-left brightness-60"
            fill
          />
        </div>
      )}

      <div className="relative z-10 container mx-auto flex flex-col items-center gap-6 sm:max-h-120 md:max-h-80 md:flex-row md:gap-12 md:text-left">
        <div className="flex w-full flex-col items-center justify-center py-8 md:flex-row">
          <div className="flex flex-row md:flex-col">
            <h2 className="mb-4 text-4xl font-bold text-white">{title}</h2>
            {imageTitle && (
              <Media
                resource={imageTitle}
                imgClassName="mb-4 md:w-30 w:5 rounded-full object-cover object-center"
                className="self-center"
              />
            )}
          </div>
          {description && (
            <div className="richtext-content mb-8 text-xl">
              {description && <RichText className="m-0 p-0 text-white" data={description} />}
            </div>
          )}
        </div>

        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((button, index) => {
              const style = (button.style || 'primary') as keyof typeof buttonStyles
              return (
                <a
                  key={index}
                  href={button.url}
                  className={`rounded-lg px-6 py-3 font-semibold transition-colors ${buttonStyles[style]}`}
                >
                  {button.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </FadeUp>
  )
}
