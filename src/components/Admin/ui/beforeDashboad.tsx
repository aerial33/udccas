import { User } from '@/payload-types'

export const Welcome = ({ user }: { user: User }) => {
  return (
    <div className="my-8">
      <h2 className="text-4xl font-bold">Bienvenue {user.name}</h2>
      <p className="text-lg">
        Vous pouvez désormais accéder à votre espace en tant que{' '}
        <span className="font-bold">{user.roles}</span>
      </p>
    </div>
  )
}
