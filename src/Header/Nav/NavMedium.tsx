'use client'

// todo optimize responsive menu burger
// todo add hover effect to menu items
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { useState } from 'react'

// Icônes du menu
import { usePathname } from 'next/navigation'

import { CMSLink } from '@/components/Link'
import type { HautDePage } from '@/payload-types'
import { getLinkHref } from '@/utilities/getLinkHref'

export const NavbarMedium: React.FC<{ data: HautDePage }> = ({ data }) => {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  return (
    <nav className="p-2">
      {/* Desktop Navigation */}
      <div className="hidden gap-6 lg:flex">
        {data.navItems?.map(({ link, subNavigation }) => {
          const linkHref = getLinkHref(link)
          const isActive = pathname === linkHref

          return subNavigation && subNavigation.length > 0 ? (
            <div
              key={link.label}
              onMouseEnter={() => setOpenSubmenu(link.label)}
              onMouseLeave={() => setOpenSubmenu(null)}
              className="relative"
            >
              <CMSLink
                type={link.type}
                reference={link.reference}
                url={link.url}
                newTab={link.newTab}
                className={`hover:text-primary relative flex items-center gap-1 py-2 transition ${
                  isActive ? 'text-primary font-bold' : 'text-foreground'
                }`}
              >
                {link.label}
                <ChevronDown
                  size={18}
                  className={`mt-0.5 transition-transform duration-300 ${openSubmenu === link.label ? 'rotate-180' : ''}`}
                />
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-4 left-0 h-1 w-full rounded-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </CMSLink>
              <AnimatePresence>
                {openSubmenu === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      type: 'spring',
                      mass: 0.5,
                      damping: 11.5,
                      stiffness: 100,
                      restDelta: 0.001,
                      restSpeed: 0.001,
                    }}
                    className="absolute top-full left-0 z-50 min-w-[200px] rounded-xl p-4 shadow-lg dark:bg-gray-800"
                  >
                    <div className="space-y-2">
                      {subNavigation.map(({ link }) => (
                        <CMSLink
                          key={link.label}
                          {...link}
                          appearance="ghost"
                          className="block rounded-md px-2 text-sm"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <CMSLink
              key={link.label}
              type={link.type}
              reference={link.reference}
              url={link.url}
              newTab={link.newTab}
              className={`hover:text-primary relative py-2 transition ${
                isActive ? 'text-primary font-bold' : 'text-foreground'
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-4 left-0 h-1 w-full rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </CMSLink>
          )
        })}
      </div>
    </nav>
  )
}
