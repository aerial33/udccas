import { Link } from '@payloadcms/ui'
import { LogOut } from 'lucide-react'

export const Logout = () => {
  return (
    <Link aria-label={'Log out'} tabIndex={0} className={'nav_log-out'} href="/admin/logout">
      <LogOut className="h-8 w-8" />
    </Link>
  )
}
