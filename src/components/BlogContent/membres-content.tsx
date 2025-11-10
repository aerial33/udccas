import {
  ClockIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

import Image from 'next/image'

import headerMembresImg from '@/graphics/headersImg/header-members.svg'
import type { Membre } from '@/payload-types'

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { CMSLink } from '../Link'
import { Media } from '../Media'
import RichText from '../RichText'
import SocialsList from '../SocialsList/SocialsList'
import { Badge } from '../ui/badge'

export const MembresContent = (membre: Membre) => {
  return (
    <>
      <div className="w-full">
        <div className="relative h-52 w-full md:h-72 2xl:h-90">
          <Media
            src={headerMembresImg}
            alt="Header membres"
            fill
            imgClassName="object-cover object-[center_5%]"
            priority
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative mb-16 flex flex-col rounded-3xl bg-white p-5 shadow-xl md:flex-row md:rounded-[40px] lg:mb-8 lg:p-8">
            <div className="mt-12 w-32 flex-shrink-0 sm:mt-0 lg:w-40">
              <div className="wil-avatar relative z-0 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-xl font-semibold uppercase shadow-2xl ring-4 ring-white lg:h-36 lg:w-36 lg:text-2xl">
                {membre.logo && typeof membre.logo === 'object' ? (
                  <Media
                    resource={membre.logo}
                    alt={`Logo ${membre.name}`}
                    fill
                    imgClassName="object-contain p-2"
                  />
                ) : (
                  <Image
                    src={''}
                    alt="Logo par défaut"
                    fill
                    className="bg-gray-400 object-contain p-2"
                  />
                )}
              </div>
            </div>

            {/*  */}
            <div className="flex-grow pt-5 md:pt-1 lg:ml-6 xl:ml-12">
              <div className="w-full space-y-4">
                <h2 className="mb-4 w-full items-center text-2xl font-medium text-gray-600 sm:text-4xl">
                  {"Service d'Aide et d' Accompagnement à Domicile: "}{' '}
                  <span className="font-bold">{membre.name}</span>
                </h2>

                {membre.informations?.website && (
                  <CMSLink
                    type="custom"
                    url={membre.informations.website}
                    newTab
                    className="flex cursor-pointer items-center space-x-2.5 truncate text-xs font-medium text-neutral-500 rtl:space-x-reverse"
                  >
                    <GlobeAltIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate text-neutral-700">{membre.informations.website}</span>
                  </CMSLink>
                )}
                <SocialsList itemClass="block w-7 h-7" />
              </div>
            </div>

            {/*  */}
            <div className="absolute start-5 end-5 top-4 flex justify-end sm:start-auto sm:end-5 sm:top-5 md:static">
              {/* <FollowButton
                isFollowing={false}
                fontSize="text-sm md:text-base font-medium"
                sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
              /> */}

              {/* <div className="mx-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                    <ShareIcon className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {SOCIALS_DATA.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => window.open(item.href, '_blank')}
                        className="cursor-pointer"
                      >
                        <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                        <span className="ml-2">{item.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}

              {/* <AccountActionDropdown containerClassName="h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" /> */}
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container mx-auto flex flex-col items-center pt-4 pb-8 md:pt-8 md:pb-10 lg:flex-row lg:justify-between lg:pb-16 xl:px-0">
          {membre.content && (
            <div className="md:border-foret">
              <Badge className="border-muted-foreground mb-8" variant="outline">
                <Breadcrumbs
                  breadcrumbs={[
                    { name: 'Accueil', link: '/' },
                    { name: 'Membres', link: '/membres' },
                    { name: membre.name },
                  ]}
                />
              </Badge>
              <RichText
                className="prose prose-sm md:prose-lg richtext-content md:border-chateau-light mx-auto max-w-4xl md:border-l-3 md:pl-4 lg:pl-8"
                data={membre.content}
                enableGutter={false}
              />
            </div>
          )}
          <aside className="top-20 mb-8 w-full self-start pt-8 lg:sticky lg:ml-8 lg:max-w-[24rem] lg:shrink-0 2xl:w-full">
            <div className="flex flex-col rounded-3xl bg-zinc-100 py-8 shadow-lg md:rounded-[40px]">
              {/* Logo and Name */}
              <div className="mb-6 flex flex-col items-center px-6">
                {membre.logo && typeof membre.logo === 'object' ? (
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full bg-white shadow-xl ring-2 ring-white">
                    <Media
                      resource={membre.logo}
                      alt={`Logo ${membre.name}`}
                      fill
                      imgClassName="object-contain p-2"
                    />
                  </div>
                ) : null}
                <h3 className="theme-dark:text-zinc-100 text-center text-xl leading-tight font-bold">
                  {membre.name}
                </h3>
              </div>

              {/* Divider */}
              {membre.informations?.astreinte && (
                <div className="theme-dark:border-zinc-700 mb-6 border-t border-zinc-300" />
              )}
              {membre.adresse && (
                <div className="mb-6 px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPinIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Adresse
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 text-sm leading-relaxed text-zinc-600">
                    {membre.adresse}
                  </div>
                </div>
              )}

              {(membre.informations?.contact?.tel || membre.informations?.contact?.mail) && (
                <div className="mb-6 px-6">
                  <div className="mb-3 flex items-center gap-2">
                    <PhoneIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Contact
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 space-y-2 text-sm text-zinc-600">
                    {membre.informations.contact.tel && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Tél:</span>
                        <a
                          href={`tel:${membre.informations.contact.tel}`}
                          className="theme-dark:hover:text-zinc-200 hover:text-zinc-900"
                        >
                          {membre.informations.contact.tel}
                        </a>
                      </div>
                    )}
                    {membre.informations.contact.mail && (
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                        <a
                          href={`mailto:${membre.informations.contact.mail}`}
                          className="theme-dark:hover:text-zinc-200 truncate hover:text-zinc-900"
                        >
                          {membre.informations.contact.mail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Divider */}
              {membre.informations?.astreinte && (
                <div className="theme-dark:border-zinc-700 mb-6 border-t border-zinc-300" />
              )}

              {membre.informations?.horaires && (
                <div className="mb-6 px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <ClockIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Horaire d&apos;accueil
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 text-sm leading-relaxed text-zinc-600">
                    {membre.informations.horaires}
                  </div>
                </div>
              )}
              {membre.informations?.astreinte && (
                <div className="mb-6 px-6">
                  <div className="theme-dark:text-zinc-400 rounded-lg bg-white/50 p-3 text-sm leading-relaxed text-zinc-700">
                    {membre.informations.astreinte}
                  </div>
                </div>
              )}

              {membre.informations?.website && (
                <div className="px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <GlobeAltIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                    <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                      Site Internet
                    </div>
                  </div>
                  <div className="theme-dark:text-zinc-400 ml-7 text-sm text-zinc-600">
                    <CMSLink
                      type="custom"
                      url={membre.informations.website}
                      newTab
                      className="theme-dark:hover:text-zinc-200 break-all underline hover:text-zinc-900"
                    >
                      {membre.informations.website}
                    </CMSLink>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default MembresContent
