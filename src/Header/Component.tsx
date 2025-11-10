import type { HautDePage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { HeaderClient } from './Component.client'

export async function Header() {
  const headerData: HautDePage = await getCachedGlobal('hautDePage', 2)()

  return <HeaderClient data={headerData} />
}
