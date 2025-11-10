// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { PayloadRequest, buildConfig } from 'payload'
import sharp from 'sharp'
// sharp-import
import { fileURLToPath } from 'url'

import { defaultLexical } from '@/fields/defaultLexical'

import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Categories } from './collections/Categories'
import Emplois from './collections/Emplois'
import { Media } from './collections/Media'
import { Membres } from './collections/Membres'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { VideoEmbeds } from './collections/VideoEmbeds'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/Admin/BeforeLogin'],
      graphics: {
        Logo: '/graphics/LogoRpdad/logo#UdLogo',
      },
      logout: {
        Button: '@/components/Admin/ui/logout.tsx#Logout',
      },
      beforeDashboard: [{ path: '@/components/Admin/ui/beforeDashboad.tsx#Welcome' }],
      actions: [{ path: '@/components/Admin/ui/logout.tsx#Logout' }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      titleSuffix: ' - RPDAD',
      title: "Réseau Public Départemental d'aide à Domicile",
      description:
        "Le RPDAD est un réseau public départemental d'aide à domicile qui a pour mission de fournir des services de qualité à domicile aux personnes âgées et aux personnes en situation de handicap.",
      openGraph: {
        title: "Réseau Public Départemental d'aide à Domicile",
        description:
          "Le RPDAD est un réseau public départemental d'aide à domicile qui a pour mission de fournir des services de qualité à domicile aux personnes âgées et aux personnes en situation de handicap.",

        siteName: 'RPDAD',
        // images: []
      },
    },
  },
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { fr },
    translations: { fr },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: process.env.NODE_ENV === 'development',
  }),
  collections: [Pages, Posts, Emplois, Membres, Media, VideoEmbeds, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // email: nodemailerAdapter({
  //   defaultFromAddress: 'contact@rpdad.fr',
  //   defaultFromName: 'RPDAD',
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: parseInt(process.env.SMTP_PORT || '587'),
  //     secure: process.env.SMTP_SECURE === 'true',
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS || 'onboarding@resend.dev',
    defaultFromName: process.env.RESEND_FROM_NAME || 'RPDAD',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
