import type { User } from '@/payload-types'

export const checkRole = (
  requiredRoles: Array<NonNullable<User['roles']>>,
  user: User,
): boolean => {
  const userRole = user?.roles
  if (userRole) {
    return requiredRoles.includes(userRole)
  }
  return false
}
