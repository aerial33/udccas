import type { CollectionConfig } from 'payload'

import admin from '@/access/admin'
import { checkRole } from '@/access/checkRole'
import editor from '@/access/editor'
import user from '@/access/user'
import { User } from '@/payload-types'

import { protectRoles } from './hook/protectRoles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
    delete: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  auth: true,
  defaultPopulate: {
    slug: true,
    name: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Rôle',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editeur', value: 'editor' },
        { label: 'Utilisateur', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
      },
    },
  ],
  timestamps: true,
}
