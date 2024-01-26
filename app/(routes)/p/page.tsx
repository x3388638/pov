import type { Metadata } from 'next'

import ItemList from '@/pages/item-list'
import { genMetadata } from '@/utils/metadata'
import { genBreadcrumb } from '@/utils/jsonLd'

export const metadata: Metadata = genMetadata('PhotoList')

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: genBreadcrumb(2, 'photo') }}
      />
      <ItemList type="photo" />
    </>
  )
}

export default Page
