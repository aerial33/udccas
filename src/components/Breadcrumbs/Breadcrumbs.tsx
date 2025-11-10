import { ChevronRightIcon } from 'lucide-react'

import Link from 'next/link'

type BreadcrumbsProps = {
  breadcrumbs: {
    link?: string
    name: string
  }[]
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <span className="flex items-center gap-2">
      {breadcrumbs.map((breadcrump, index, arr) =>
        index + 1 < arr.length ? (
          <p className="flex items-center text-sm" key={index}>
            <Link href={breadcrump.link || '/'} className="hover:text-primary">
              {breadcrump.name.toLowerCase()}
            </Link>{' '}
            <ChevronRightIcon className="h-4 w-4" />
          </p>
        ) : (
          <p className="text-sm truncate max-w-[200px] sm:max-w-none" key={index}>
            {breadcrump.name.toLowerCase()}
          </p>
        ),
      )}
    </span>
  )
}
