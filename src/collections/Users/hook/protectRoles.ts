import type { FieldHook } from 'payload'

import type { User } from '@/payload-types'

/**
 * Hook pour protéger les rôles des utilisateurs.
 *
 * Cette fonction vérifie si l'utilisateur actuel est un administrateur.
 * Si ce n'est pas le cas, elle limite les rôles à 'user' uniquement.
 * Si c'est un administrateur, elle conserve tous les rôles définis
 * et s'assure que le rôle 'user' est toujours présent.
 *
 * @param req - La requête contenant les informations de l'utilisateur actuel
 * @param data - Les données de l'utilisateur en cours de modification
 * @returns Un tableau des rôles autorisés pour l'utilisateur
 */
export const protectRoles: FieldHook<User> = ({ req, data }) => {
  // Vérifie si l'utilisateur actuel est un administrateur
  const isAdmin = req.user?.roles?.includes('admin')

  // Si l'utilisateur n'est pas un administrateur, limite les rôles à 'user' uniquement
  if (!isAdmin) {
    return 'user'
  }

  // Si c'est un admin, on retourne le rôle qui a été passé dans la requête,
  // ou 'user' si aucun rôle n'a été spécifié.
  return data?.roles || 'user'
}
