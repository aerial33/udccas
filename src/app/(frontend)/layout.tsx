import React from 'react'

import type { Metadata } from 'next'
import { Lexend_Deca, Nunito } from 'next/font/google'
import { draftMode } from 'next/headers'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { AdminBar } from '@/components/Admin/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'

import './globals.css'

const lexendDeca = Lexend_Deca({
  variable: '--font-lexend-deca',
  subsets: ['latin'],
})

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(lexendDeca.variable, nunito.variable)} lang="fr" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/icon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@RPDAD',
  },
}
