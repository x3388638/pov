import type { Metadata } from 'next'

import ItemList from '@/pages/item-list'
import { genMetadata } from '@/utils/metadata'
import { genBreadcrumb } from '@/utils/jsonLd'

export const metadata: Metadata = genMetadata('VideoList')

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: genBreadcrumb(2, 'video') }}
      />
      <ItemList type="video" />
    </>
  )
}

export default Page
