import { getPayload } from 'payload'

import { headers as getHeaders } from 'next/headers'

import config from '@/payload.config'

export default async function Home() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { permissions, user } = await payload.auth({ headers })

  return (
    <h1 className="flex flex-col items-center justify-center text-2xl font-bold">
      {user
        ? `Bonjour ${user.name} ! Vous êtes authentifié en tant que ${user.roles}`
        : "Vous n'êtes pas connecté"}
    </h1>
  )
}
