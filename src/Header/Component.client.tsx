'use client'

import { Facebook, Instagram, Linkedin, SearchIcon, Youtube } from 'lucide-react'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { UdLogo } from '@/graphics/LogoUd/logo'
import type { HautDePage } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import { MobileMenu } from './Nav/MobileNav'
import { NavbarMedium } from './Nav/NavMedium'

//todo: add the cta and dynamic social media links

interface HeaderClientProps {
  data: HautDePage
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container flex items-center justify-between py-4 xl:px-0">
        <div className="flex items-center">
          <Link href="/">
            <UdLogo />
          </Link>
        </div>
        <NavbarMedium data={data} />
        <div
          className={`hidden items-center gap-4 lg:flex ${isHomePage ? 'text-white' : 'text-foreground'}`}
        >
          {/* <ul className="flex items-center space-x-4">
            <li className="hover:text-primary">
              <a href="https://www.facebook.com/rpdadgironde" target="_blank">
                <Facebook className="size-5" />
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://www.youtube.com/@RPDAD33" target="_blank">
                <Youtube className="size-5" />
              </a>
            </li>
            <li className="hover:text-primary">
              <a
                href="https://www.linkedin.com/company/rpdad33/posts/?feedView=all"
                target="_blank"
              >
                <Linkedin className="size-5" />
              </a>
            </li>
            <li className="hover:text-primary">
              <a href="https://www.instagram.com/rpdad_33/" target="_blank">
                <Instagram className="size-5" />
              </a>
            </li>
          </ul> */}
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="hover:text-primary w-5 font-medium" />
          </Link>
        </div>
        <MobileMenu data={data} />
        {/* <CTA label="Contactez-nous" link="/contact" variant="default" /> */}
      </div>
    </header>
  )
}
